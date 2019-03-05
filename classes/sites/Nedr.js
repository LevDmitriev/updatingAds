let util = require('util');
let Site = require('./Site');

/**
 * Функция-конструктор для работы с Nedr
 *
 * @param {object} settings Объект с настройками.
 * @param {object} settings.browser Объект браузера puppeteer
 * @constructor
 */
let Nedr = function Nedr (settings) {
    Site.call(this, settings);
    this.mainPageURL = 'https://nedr.ru';
    this.authFormPageURL = this.mainPageURL + '/logon.do';
    this.adsPageURL =  this.mainPageURL + '/my/';
    this.logoutPageURL = this.mainPageURL + '/logout/';
};

util.inherits(Nedr, Site); // наследование

// Методы

/**
 *  Авторизоваться под пользователем с логином(e-mail) sLogin и паролем sPassword
 * @param {string} oAccountLoginData.login Логин
 * @param {string} oAccountLoginData.password Пароль
 */
Nedr.prototype.authorize = async function (oAccountLoginData) {
    let page = await this.getPage();
    await page.goto(this.mainPageURL);
    let url = `${this.authFormPageURL}?j_username=${oAccountLoginData.login}&j_password=${oAccountLoginData.password}`;
    await page.goto(url, {waitUntil: 'domcontentloaded'});
};


/**
 * Обновить объявления пользователя с логином sLogin и паролем sPassword
 * @param {string} oAccountLoginData.login Логин
 * @param {string} oAccountLoginData.password Пароль
 */
Nedr.prototype.updateAds = async function (oAccountLoginData) {
    let page = await this.getPage();
    await this.authorize(oAccountLoginData);
    /** Коллекция со всеми кнопками страниц типа JSHandle*/
    let arAllPageBtns  = await page.$$('a[href*="/my/msgList.do?p="]');
    if (arAllPageBtns.length) { // если есть страницы кроме 1 — переходим на последнюю
        await arAllPageBtns[arAllPageBtns.length-1].click();
        await page.waitForNavigation();
    }

    /** Коллекция со всеми кнопками поднятия типа JSHandle*/
    let arAllBtns  = await page.$$('a[href*="upMsgForm.do"].btn:not(.btn_upped)');
    if (arAllBtns.length) {
        await arAllBtns[arAllBtns.length-1].click();
        await page.waitForNavigation();
        await (await page.$('button[type="submit"]')).click();
    }
};

module.exports = Nedr;
