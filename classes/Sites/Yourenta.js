let util = require('util');
let Site = require('./Site');

/**
 * Класс для работы с сайтом Yourenta
 *
 * @param {object} settings Объект с настройками.
 * @param {object} settings.browser Объект браузера puppeteer
 * @constructor
 */
let Yourenta = function Yourenta (settings) {
    Site.call(this, settings);
    this.mainPageURL = 'https://yourenta.ru';
    this.logoutPageURL = this.mainPageURL + '/away.html';
    this.adsPageURL =  this.mainPageURL + '/user-index.html';
    this.authFormPageURL = this.mainPageURL + '/login.html';
};

util.inherits(Yourenta, Site); // наследование

/**
 *  Авторизация
 * @param {string} oAccountLoginData.login Логин
 * @param {string} oAccountLoginData.password Пароль
 *
 */
Yourenta.prototype.authorize = async function (oAccountLoginData) {
    await this.logout();
    let page = await this.getPage();
    await page.goto(this.authFormPageURL);
    await page.type('input[name="enter_email"]', oAccountLoginData.login);
    await page.type('input[name="enter_pass"]', oAccountLoginData.password);
    await Promise.all([
        page.click('#enter'),
        page.waitForNavigation(),
    ]);
    if (!page.url().includes(this.adsPageURL)) { // Если после всего мы не находимся на стрнице объявлений
        throw new Error('При авторизации произошла ошибка');
    }
};

/**
 * Получить массив кнопок "поднять" коллекции JSHandle
 * @return {Promise<Array>}
 */
Yourenta.prototype.getUpdateBtns = async function () {
    let page         = await this.getPage();
    /** Коллекция со всеми кнопками типа JSHandle*/
    let arAllBtns    = await page.$$('a[rel]');
    /** Коллекция только с кнопками "поднять" типа JSHandle*/
    let arUpdateBtns = [];
    for (let i = 0; i < arAllBtns.length; i++) {
        let isUpdateBtn = await page.evaluate((obj) => {
            return obj.textContent === 'поднять' && obj.id === 'flat-work';
        }, arAllBtns[i]);

        isUpdateBtn ? arUpdateBtns.push(arAllBtns[i]) : false;
    }

    return arUpdateBtns;
};
/**
 * Обновить объявления пользователя
 * @param {string} oAccountLoginData.login Логин
 * @param {string} oAccountLoginData.password Пароль
 * @param {Number} oAccountLoginData.id ID в базе данных
 *
 * @return {Number} ID в базе данных
 */
Yourenta.prototype.updateAds = async function (oAccountLoginData) {
    let page = await this.getPage();
    await this.authorize(oAccountLoginData);
    await page.goto(this.adsPageURL);
    /** Коллекция со всеми кнопками поднятия типа JSHandle*/
    let arAllBtns    = await this.getUpdateBtns();
    if (arAllBtns.length) {
        for (let i = arAllBtns.length - 1; i > arAllBtns.length - 4 && i >= 0; i--) {
            await arAllBtns[i].click();
            await this.closePopup('#fancybox-close');
        }
    }


    return oAccountLoginData.id;
};

module.exports = Yourenta;

