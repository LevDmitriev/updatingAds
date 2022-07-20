let util = require('util');
let Site = require('./Site');

/**
 * Функция-конструктор для работы с Rosrealt
 *
 * @param {object} settings Объект с настройками.
 * @param {object} settings.browser Объект браузера puppeteer
 * @constructor
 */
let Rosrealt = function Rosrealt (settings) {
    Site.call(this, settings);
    this.mainPageURL     = 'https://rosrealt.ru';
    this.logoutPageURL   = this.mainPageURL + '/logout';
    this.adsPageURL      = this.mainPageURL + '/kabinet';
    this.authFormPageURL = this.mainPageURL + '/authorization';
};

util.inherits(Rosrealt, Site); // наследование

// Методы

/**
 *  Авторизация
 * @param {string} oAccountLoginData.login Логин
 * @param {string} oAccountLoginData.password Пароль
 */
Rosrealt.prototype.authorize = async function (oAccountLoginData) {
    let page = await this.getPage();
    await page.goto(this.mainPageURL);
    await page.evaluate(async (oAccountLoginData, authFormPageURL) => {
        let formData = new FormData();
        formData.append('Email', oAccountLoginData.login);
        formData.append('Password', oAccountLoginData.password);
        await fetch(authFormPageURL, {
            method: 'POST',
            body:   formData
        });
    }, oAccountLoginData, this.authFormPageURL);
    await page.goto(this.mainPageURL, {waitUntil: 'domcontentloaded'});
    /** Коллекция со всеми кнопками Перехода в ЛК JSHandle*/
    let toProfileLinks = await page.$$('a.user-menu__link_sign-in');
    if (toProfileLinks.length) {
        await toProfileLinks[toProfileLinks.length - 1].click();
    }
};

/**
 * Обновить объявления пользователя с логином sLogin и паролем sPassword
 * @param {string} oAccountLoginData.login Логин
 * @param {string} oAccountLoginData.password Пароль
 */
Rosrealt.prototype.updateAds = async function (oAccountLoginData) {
    let page = await this.getPage();
    await this.authorize(oAccountLoginData);
    await page.waitForSelector('a.catalog-card__button_promote', {visible: true});
    await page.evaluate(async () => {
        /** Коллекция со всеми кнопками поднятия типа JSHandle*/
        var allButtons = document.querySelectorAll('a.catalog-card__button_promote');
        for (var i = 0; i < allButtons.length; i++) {
            await fetch(allButtons[i].href);
        }
    });
};

module.exports = Rosrealt;
