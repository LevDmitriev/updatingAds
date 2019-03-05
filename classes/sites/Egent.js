let util = require('util');
let Site = require('./Site');

/**
 * Класс для работы с сайтом Egent
 *
 * @param {object} settings Объект с настройками.
 * @param {object} settings.browser Объект браузера puppeteer
 * @constructor
 */
let Egent = function Egent (settings) {
    Site.call(this, settings);
    this.mainPageURL     = 'https://www.egent.ru';
    this.logoutPageURL   = this.mainPageURL + '/auth/logout.html';
    this.adsPageURL      = this.mainPageURL + '/my_notices.html';
    this.authFormPageURL = this.mainPageURL + '/auth/login/';
};

util.inherits(Egent, Site); // наследование

/**
 *  Авторизация
 * @param {string} oAccountLoginData.login Логин
 * @param {string} oAccountLoginData.password Пароль
 *
 */
Egent.prototype.authorize = async function (oAccountLoginData) {
    let page = await this.getPage();

    await page.goto(this.mainPageURL);
    await page.evaluate(async (oAccountLoginData, authFormPageURL) => {
        let formData = new FormData();
        formData.append('username', oAccountLoginData.login);
        formData.append('password', oAccountLoginData.password);
        formData.append('remember', '1');
        formData.append('login', 'OK');
        await fetch(authFormPageURL, {
            method: 'POST',
            body:   formData
        });
    }, oAccountLoginData, this.authFormPageURL);
    await page.goto(this.adsPageURL, {waitUntil: 'domcontentloaded'});
    if (!page.url().includes(this.adsPageURL)) { // Если после всего мы не находимся на стрнице объявлений
        throw new Error('При авторизации произошла ошибка');
    }
};

/**
 * Обновить объявления пользователя
 * @param {string} oAccountLoginData.login Логин
 * @param {string} oAccountLoginData.password Пароль
 */
Egent.prototype.updateAds = async function (oAccountLoginData) {
    let page = await this.getPage();
    await this.authorize(oAccountLoginData);
    /** Коллекция со всеми кнопками поднятия типа JSHandle*/
    let arAllBtns = await page.$$('a[href*="updatenotice"]');
    await arAllBtns[arAllBtns.length - 1].click();
};

module.exports = Egent;