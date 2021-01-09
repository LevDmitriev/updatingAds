let util = require('util');
let Site = require('./Site');

/**
 * Функция-конструктор для работы с Privatarenda
 *
 * @param {object} settings Объект с настройками.
 * @param {object} settings.browser Объект браузера puppeteer
 * @constructor
 */
let Privatarenda = function Privatarenda (settings) {
    Site.call(this, settings);
    this.mainPageURL = 'http://www.privatarenda.ru';
    this.logoutPageURL = this.mainPageURL + '/kabinet.php?act=exit';
    this.adsPageURL =  this.mainPageURL + '/kabinet.php?act=check';
    this.authFormPageURL = this.mainPageURL + '/kabinet.php?act=check';
};

util.inherits(Privatarenda, Site); // наследование

// Методы

/**
 *  Авторизация
 * @param {string} oAccountLoginData.login Логин
 * @param {string} oAccountLoginData.password Пароль
 *
 * @return {boolean} Успешно ли авторизовался пользователь
 */
Privatarenda.prototype.authorize = async function (oAccountLoginData) {
    let page = await this.getPage();
    let url = `${this.adsPageURL}&Email=${oAccountLoginData.login}&Password=${oAccountLoginData.password}`;
    await page.goto(url, {waitUntil: 'domcontentloaded'});
};


/**
 * Обновить объявления пользователя с логином sLogin и паролем sPassword
 * @param {string} oAccountLoginData.login Логин
 * @param {string} oAccountLoginData.password Пароль
 * @param {int} oAccountLoginData.userId ID пользователя
 */
Privatarenda.prototype.updateAds = async function (oAccountLoginData) {
    let page = await this.getPage();
    await this.authorize(oAccountLoginData);

    /** Коллекция со всеми кнопками поднятия типа JSHandle*/
    let arAllBtns    = await page.$$('input[name="actualize"]');
    for (let i = 0; i < arAllBtns.length; i++) {
        // Т.к. контекст меняется, то повторно получаем все кнопки поднятия
        let arAllBtns    = await page.$$('input[name="actualize"]');
        await arAllBtns[i].click();
        // При клике открывается новое окно. Переключаемся на него
        let newTarget = await this.getBrowser().waitForTarget(target => target.opener() === page.target());
        let newPage = await newTarget.page();
        await (await newPage.$('input[name="actualize"]')).click();
        await newPage.waitForNavigation({waitUntil: 'domcontentloaded'});
        newPage.close();
    }
};

module.exports = Privatarenda;


