let util = require('util');
let Site = require('./Site');

/**
 * Функция-конструктор для работы с sutochno.ru.com
 *
 * @param {object} settings Объект с настройками.
 * @param {object} settings.browser Объект браузера puppeteer
 * @constructor
 */
let SutochnoRuCom = function SutochnoRuCom (settings) {
    Site.call(this, settings);
    this.mainPageURL = 'https://sutochno.ru.com';
    this.logoutPageURL = this.mainPageURL + '/logout';
    this.adsPageURL =  this.mainPageURL + '/housing';
    this.authFormPageURL = this.mainPageURL + '/index.php/login';
};

util.inherits(SutochnoRuCom, Site); // наследование

// Методы
/**
 *  Авторизация
 * @param {string} oAccountLoginData.login Логин
 * @param {string} oAccountLoginData.password Пароль
 *
 * @return {boolean} Успешно ли авторизовался пользователь
 */
SutochnoRuCom.prototype.authorize = async function (oAccountLoginData) {
    let page = await this.getPage();

    await page.goto(this.mainPageURL);
    await page.evaluate(async (oAccountLoginData, authFormPageURL) => {
        let formData = new FormData();
        formData.append('email', oAccountLoginData.login);
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

    return true;
};

/**
 * Обновить объявления пользователя
 * @param {string} oAccountLoginData.login Логин
 * @param {string} oAccountLoginData.password Пароль
 */
SutochnoRuCom.prototype.updateAds = async function (oAccountLoginData) {
    let page = await this.getPage();
    await this.authorize(oAccountLoginData);
    /** Коллекция со всеми кнопками поднятия типа JSHandle*/
    let arAllBtns    = await page.$$('a[href*="freeUp"]');
    if (arAllBtns.length) {
        arAllBtns[arAllBtns.length-1].click();
        await page.waitForNavigation({waitUntil: 'domcontentloaded'});
    }
};

module.exports = SutochnoRuCom;