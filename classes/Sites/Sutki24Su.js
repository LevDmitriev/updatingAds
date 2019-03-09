let util = require('util');
let Site = require('./Site');
let ModelAccountFields = require('../Model/ModelAccountFields');

/**
 * Функция-конструктор для работы с Nedr
 *
 * @param {object} settings Объект с настройками.
 * @param {object} settings.browser Объект браузера puppeteer
 * @constructor
 */
let Sutki24Su = function Sutki24Su (settings) {
    Site.call(this, settings);
    /** Получить URL основной страницы, по коду города, к которому прикреплён аккаунт
     * @param {String} sityCode Код города, к которому прикреплён аккаунт
     *
     * @return {string} URL главной страницы страницы
     */
    this.mainPageURL =  (sityCode) => `http://${sityCode}.sutki24.su`;
    /**
     * Получить URL страницы авторизации
     * @param {String} sityCode Код города, к которому прикреплён аккаунт
     *
     * @return {string} URL страницы авторизации
     */
    this.authFormPageURL = function(sityCode) { return this.mainPageURL(sityCode) + '/personal/?login=yes'};
    /**
     * Получить URL страницы со списком объявлений текущего авторизованного пользователя
     * @param {String} sityCode Код города, к которому прикреплён аккаунт
     *
     * @return {string} URL страницы со списком объявлений текущего авторизованного пользователя
     */
    this.adsPageURL =  function(sityCode) { return this.mainPageURL(sityCode) + '/personal/flats/'};
    /**
     * Получить URL страницы выхода из личного кабинета
     * @param {String} sityCode Код города, к которому прикреплён аккаунт
     *
     * @return {string} URL страницы выхода из личного кабинета
     */
    this.logoutPageURL = function(sityCode) { return this.mainPageURL(sityCode) + '/?logout=yes'};
};

util.inherits(Sutki24Su, Site); // наследование

/**
 *  Авторизоваться под пользователем с логином(e-mail) sLogin и паролем sPassword
 * @param {string} oAccountLoginData.login Логин
 * @param {string} oAccountLoginData.password Пароль
 * @param {string} oAccountLoginData.city ID города
 */
Sutki24Su.prototype.authorize = async function (oAccountLoginData) {
    let page = await this.getPage();
    /** @type {ModelAccountFields} */
    let accountFields = new ModelAccountFields();
    /** Объект, описывающий город пользователя */
    let city = accountFields.getValueById(this.constructor.name, 'city', oAccountLoginData.city);
    await page.goto(this.mainPageURL(city.code));
    await page.evaluate(async (oAccountLoginData, authFormPageURL) => {
        let formData = new FormData();
        formData.append('AUTH_FORM', 'Y');
        formData.append('TYPE', 'AUTH');
        formData.append('backurl', '/personal/');
        formData.append('USER_LOGIN', oAccountLoginData.login);
        formData.append('USER_PASSWORD', oAccountLoginData.password);
        await fetch(authFormPageURL,{
            method: 'POST',
            body: formData,
        });
    }, oAccountLoginData, this.authFormPageURL(city.code));
    await page.goto(this.adsPageURL(city.code), {waitUntil: 'domcontentloaded'});
    if (!page.url().includes(this.adsPageURL(city.code))) { // Если после всего мы не находимся на стрнице объявлений
        throw new Error('При авторизации произошла ошибка');
    }
};

/**
 * Обновить объявления пользователя с логином sLogin и паролем sPassword
 * @param {string} oAccountLoginData.login Логин
 * @param {string} oAccountLoginData.password Пароль
 * @param {string} oAccountLoginData.city ID города
 */
Sutki24Su.prototype.updateAds = async function (oAccountLoginData) {
    let page = await this.getPage();
    await this.authorize(oAccountLoginData);
    /** Коллекция со всеми кнопками Поднять типа JSHandle*/
    let arAllPageBtns  = await page.$$('.place-in a');
    if (arAllPageBtns.length) {
        await arAllPageBtns[arAllPageBtns.length-1].click();
    }
};

module.exports = Sutki24Su;
