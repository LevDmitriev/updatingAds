let util = require('util');
let Site = require('./Site');

/**
 * Класс для работы с сайтом UniBo
 *
 * @param {object} settings Объект с настройками.
 * @param {object} settings.browser Объект браузера puppeteer
 * @constructor
 */
let UniBo = function Egent (settings) {
    Site.call(this, settings);
    this.mainPageURL     = 'https://www.unibo.ru';
    this.logoutPageURL   = this.mainPageURL + '/runModule/Logout.ajax';
    this.adsPageURL      = 'https://admin.unibo.ru/messages/cabinet';
    this.authFormPageURL = this.mainPageURL + '/runModule/Forms/Auth/Add.ajax';
};

util.inherits(UniBo, Site); // наследование

/**
 *  Авторизация
 * @param {string} oAccountLoginData.login Логин
 * @param {string} oAccountLoginData.password Пароль
 *
 */
UniBo.prototype.authorize = async function (oAccountLoginData) {
    let page = await this.getPage();

    await page.goto(this.mainPageURL);
    await page.evaluate(async (oAccountLoginData, authFormPageURL) => {
        let formData = new FormData();
        formData.append('auth[login]', oAccountLoginData.login);
        formData.append('auth[password]', oAccountLoginData.password);
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
UniBo.prototype.updateAds = async function (oAccountLoginData) {
    let page = await this.getPage();
    await this.authorize(oAccountLoginData);
    /** Чекбокс для выделения всех объявлений*/
    let checkboxSelectAll = await page.$('.il-check input');
    await checkboxSelectAll.click();
    /** Кнопка обновления даты */
    let btnChangeData = await page.$('.action[data-action-name-en="ChangeDateEdit"]');
    await btnChangeData.click();
    await page.waitForSelector('.gap-block button');
    /** Кнопка обновления всех объявлений */
    let btnSubmit = await page.$('.gap-block button');
    await btnSubmit.click();
};

module.exports = UniBo;