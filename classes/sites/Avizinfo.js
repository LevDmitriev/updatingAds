let util = require('util');
let Site = require('./Site');

/**
 * Функция-конструктор для работы с Avizinfo
 *
 * @param {object} settings Объект с настройками.
 * @param {object} settings.browser Объект браузера puppeteer
 * @constructor
 */
let Avizinfo = function Avizinfo (settings) {
    Site.call(this, settings);
    this.mainPageURL = 'http://www.avizinfo.ru';
    this.authFormPageURL = this.mainPageURL + '/ru-i-loginform.html';
    this.adsPageURL =  this.mainPageURL + '/ru-i-myads.html';
    this.logoutPageURL = this.mainPageURL + '/ru-i-logout.html';
};

util.inherits(Avizinfo, Site); // наследование

// Методы

/**
 *  Авторизация
 * @param {string} oAccountLoginData.login Логин
 * @param {string} oAccountLoginData.password Пароль
 */
Avizinfo.prototype.authorize = async function (oAccountLoginData) {
    let page = await this.getPage();

    await page.goto(this.mainPageURL);
    await page.evaluate(async (oAccountLoginData, authFormPageURL) => {
        let formData = new FormData();
        formData.append('SID', 'login');
        formData.append('actionMode', 'login');
        formData.append('Login', oAccountLoginData.login);
        formData.append('Password', oAccountLoginData.password);
        await fetch(authFormPageURL,{
            method: 'POST',
            body: formData,
        });
    }, oAccountLoginData, this.authFormPageURL);
    await page.goto(this.adsPageURL, {waitUntil: 'domcontentloaded'});
    if (!page.url().includes(this.adsPageURL)) { // Если после всего мы не находимся на стрнице объявлений
        throw new Error('При авторизации произошла ошибка');
    }
};

/**
 * Обновить объявления пользователя с логином sLogin и паролем sPassword
 * @param {string} oAccountLoginData.login Логин
 * @param {string} oAccountLoginData.password Пароль
 */
Avizinfo.prototype.updateAds = async function (oAccountLoginData) {
    let page = await this.getPage();
    await this.authorize(oAccountLoginData);
    /** Коллекция со всеми кнопками поднятия типа JSHandle*/
    let arAllBtns  = await page.$$('a[onclick*="actionMode-i-refresh"]');
    if (arAllBtns.length) {
        await arAllBtns[arAllBtns.length-1].click();
    }
};

module.exports = Avizinfo;

