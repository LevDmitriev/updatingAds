let util = require('util');
let Site = require('./Site');

/**
 * Функция-конструктор для работы с Kvartirapoisk
 *
 * @param {object} settings Объект с настройками.
 * @param {object} settings.browser Объект браузера puppeteer
 * @constructor
 */
let Kvartirapoisk = function Kvartirapoisk (settings) {
    Site.call(this, settings);
    this.mainPageURL = 'http://kvartirapoisk.ru';
    this.logoutPageURL = this.mainPageURL + '/exit';
    this.adsPageURL =  this.mainPageURL + '/myflats.php';
    this.authFormPageURL = this.mainPageURL + '/login.php';
};

util.inherits(Kvartirapoisk, Site); // наследование


// Методы
/**
 *  Авторизоваться под пользователем с логином(e-mail) sLogin и паролем sPassword
 * @param {string} oAccountLoginData.login Логин
 * @param {string} oAccountLoginData.password Пароль
 */
Kvartirapoisk.prototype.authorize = async function (oAccountLoginData) {
    let page = await this.getPage();
    let url = `${this.authFormPageURL}?username=${oAccountLoginData.login}&password=${oAccountLoginData.password}`;
    await page.goto(url, {waitUntil: 'domcontentloaded'});
};

/**
 * Обновить объявления пользователя с логином sLogin и паролем sPassword
 * @param {string} oAccountLoginData.login Логин
 * @param {string} oAccountLoginData.password Пароль
 */
Kvartirapoisk.prototype.updateAds = async function (oAccountLoginData) {
    let page = await this.getPage();
    await this.authorize(oAccountLoginData);
    /** Коллекция со всеми кнопками поднятия типа JSHandle*/
    let arAllBtns    = await page.$$('a[href*="makeup"]');
    for (let i = 0; i < arAllBtns.length; i ++) {
        let arAllBtns    = await page.$$('a[href*="makeup"]');
        await arAllBtns[arAllBtns.length-1].click();
        await page.waitForNavigation({waitUntil: 'domcontentloaded'});
    }
};

module.exports = Kvartirapoisk;