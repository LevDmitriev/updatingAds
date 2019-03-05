let util = require('util');
let Site = require('./Site');
let md5 = require('md5');

/**
 * Функция-конструктор для работы с Askrent
 *
 * @param {object} settings Объект с настройками.
 * @param {object} settings.browser Объект браузера puppeteer
 * @constructor
 */
let Askrent = function Askrent (settings) {
    Site.call(this, settings);
    this.mainPageURL = 'https://askrent.ru';
    this.logoutPageURL = this.mainPageURL + '/cabinet-logout.html';
    this.adsPageURL =  this.mainPageURL + '/cabinet-up-apartment.html';
    this.authFormPageURL = this.mainPageURL + '/login.html';
};

util.inherits(Askrent, Site); // наследование


// Методы

/**
 *  Авторизация
 * @param {string} oAccountLoginData.login Логин
 * @param {string} oAccountLoginData.password Пароль
 *
 * @return {boolean} Успешно ли авторизовался пользователь
 */
Askrent.prototype.authorize = async function (oAccountLoginData) {
    let page = await this.getPage();

    await page.goto(this.mainPageURL);
    await page.evaluate(async (oAccountLoginData, authFormPageURL) => {
        let formData = new FormData();
        formData.append('phone', oAccountLoginData.login);
        formData.append('pass', md5(oAccountLoginData.password));
        formData.append('save', '0');
        await fetch(authFormPageURL,{
            method: 'POST',
            body: formData,
        });
    }, oAccountLoginData, this.authFormPageURL);
    await page.goto(this.adsPageURL, {waitUntil: 'domcontentloaded'});
    if (!page.url().includes(this.adsPageURL)) { // Если после всего мы не находимся на стрнице объявлений
        throw new Error('При авторизации произошла ошибка');
    }

    return true;
};

/**
 * Обновить объявления пользователя
 * @param {string} oAccountLoginData.login Логин
 * @param {string} oAccountLoginData.password Пароль
 * @param {Number} oAccountLoginData.id ID в базе данных
 *
 * @return {Number} ID в базе данных
 */
Askrent.prototype.updateAds = async function (oAccountLoginData) {
    let page = await this.getPage();
    await this.authorize(oAccountLoginData);
    /** Коллекция со всеми кнопками поднятия типа JSHandle*/
    let arAllBtns    = await page.$$('.cabinet-flat .actions-up a');
    if (arAllBtns.length) {
        for (let i = arAllBtns.length - 1; i > arAllBtns.length - 4 && i >= 0; i--) {
            await arAllBtns[i].click();
            await this.closePopup('#close');
        }
    }

    return oAccountLoginData.id;
};

module.exports = Askrent;

