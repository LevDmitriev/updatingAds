let util = require('util');
let Site = require('./Site');

/**
 * Функция-конструктор для работы с 100Realt
 *
 * @param {object} settings Объект с настройками.
 * @param {object} settings.browser Объект браузера puppeteer
 * @constructor
 */
let _100Realt = function _100Realt (settings) {
    Site.call(this, settings);
    this.mainPageURL = 'https://www.100realt.ru';
    this.logoutPageURL = this.mainPageURL + '/logout';
    this.adsPageURL =  this.mainPageURL + '/housing';
    this.authFormPageURL = this.mainPageURL + '/sign?return=%2F';
};

util.inherits(_100Realt, Site); // наследование

// Методы

/**
 *  Авторизация
 * @param {string} oAccountLoginData.login Логин
 * @param {string} oAccountLoginData.password Пароль
 */
_100Realt.prototype.authorize = async function (oAccountLoginData) {
    let page = await this.getPage();

    await page.goto(this.authFormPageURL);
    await page.type('input[name="email"]', oAccountLoginData.login);
    await page.type('input[name="password"]', oAccountLoginData.password);
    await page.click('button[type="submit"]');
    await page.waitForSelector('a[href="/housing"]', {visible: true});
};

/**
 * Обновить объявления пользователя с логином sLogin и паролем sPassword
 * @param {string} oAccountLoginData.login Логин
 * @param {string} oAccountLoginData.password Пароль
 */
_100Realt.prototype.updateAds = async function (oAccountLoginData) {
    let page = await this.getPage();
    await this.authorize(oAccountLoginData);
    await page.goto(this.adsPageURL);
    /** Коллекция со всеми кнопками поднятия типа JSHandle*/
    let arAllBtns  = await page.$$('a[href*="freeUp"]');
    if (arAllBtns.length) {
        await arAllBtns[arAllBtns.length-1].click();
    }
};

module.exports = _100Realt;
