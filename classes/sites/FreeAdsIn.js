let util = require('util');
let Site = require('./Site');

/**
 * Функция-конструктор для работы с freeadsin.ru
 *
 * @param {object} settings Объект с настройками.
 * @param {object} settings.browser Объект браузера puppeteer
 * @constructor
 */
let FreeAdsIn = function FreeAdsIn (settings) {
    Site.call(this, settings);
    this.mainPageURL = 'http://www.freeadsin.ru';
    this.authFormPageURL = this.mainPageURL + '/ru-i-loginform';
    this.adsPageURL =  this.mainPageURL + '/ru-i-myads';
    this.logoutPageURL = this.mainPageURL + '/ru-i-logout';
};

util.inherits(FreeAdsIn, Site); // наследование

/**
 *  Авторизоваться под пользователем с логином(e-mail) login и паролем password
 * @param {string} oAccountLoginData.login Логин
 * @param {string} oAccountLoginData.password Пароль
 */
FreeAdsIn.prototype.authorize = async function (oAccountLoginData) {
    let page = await this.getPage();
    // fetch не работает для авторизации, поэтомму заполняем форму
    await page.goto(this.authFormPageURL);
    await page.reload();// Почему-то только после перезагрузки всё начинает нормально работать
    await page.type('input[name="Login"]', oAccountLoginData.login);
    await page.type('input[name="Password"]', oAccountLoginData.password);
    await page.click('form[name="manageLangFields"] input[type="submit"]');
    await page.waitForNavigation();
    await page.goto(this.adsPageURL);
    if (!page.url().includes(this.adsPageURL)) { // Если после всего мы не находимся на стрнице объявлений
        throw new Error('При авторизации произошла ошибка');
    }
};

/**
 * Обновить объявления пользователя с логином login и паролем password
 * @param {string} oAccountLoginData.login Логин
 * @param {string} oAccountLoginData.password Пароль
 */
FreeAdsIn.prototype.updateAds = async function (oAccountLoginData) {
    let page = await this.getPage();
    await this.authorize(oAccountLoginData);
    /** Все кнопки переключения страниц */
    let arAllPageBtns  = await page.$$('a.subtitle');
    if (arAllPageBtns.length) {
        await arAllPageBtns[arAllPageBtns.length-1].click();
        await page.waitForNavigation();
    }
    /** Коллекция со всеми кнопками поднятия типа JSHandle*/
    let arAllBtns  = await page.$$('a[href*="updateAction"]');
    if (arAllBtns.length) {
        await arAllBtns[arAllBtns.length-1].click();
    }
};

module.exports = FreeAdsIn;
