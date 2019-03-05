let util = require('util');
let Site = require('./Site');

/**
 * Функция-конструктор для работы с move.ru
 *
 * @param {object} settings Объект с настройками.
 * @param {object} settings.browser Объект браузера puppeteer
 * @constructor
 */
let Move = function Move (settings) {
    Site.call(this, settings);
    this.mainPageURL = 'https://move.ru';
    this.authFormPageURL = this.mainPageURL + '/api/v3/login/';
    this.adsPageURL =  this.mainPageURL + '/user/items/';
    this.logoutPageURL = this.mainPageURL + '/user/logout/';
};

util.inherits(Move, Site); // наследование

/**
 *  Авторизоваться под пользователем с логином(e-mail) sLogin и паролем sPassword
 * @param {string} oAccountLoginData.login Логин
 * @param {string} oAccountLoginData.password Пароль
 */
Move.prototype.authorize = async function (oAccountLoginData) {
    let page = await this.getPage();

    await page.goto(this.mainPageURL);
    await page.evaluate(async (oAccountLoginData, authFormPageURL) => {
        let formData = new FormData();
        formData.append('login', oAccountLoginData.login);
        formData.append('password', oAccountLoginData.password);
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
Move.prototype.updateAds = async function (oAccountLoginData) {
    let page = await this.getPage();
    await this.authorize(oAccountLoginData);
    /** Все табы */
    let allTabs = await page.$$('li.ng-binding');
    await allTabs[2].click();
    /** Коллекция со всеми кнопками страниц типа JSHandle*/
    let updateBtns = await page.$$('[ng-click="thisPublish(item, 7)"]');
    if (updateBtns.length) {
        await updateBtns[updateBtns.length-1].click();
    }
};

module.exports = Move;
