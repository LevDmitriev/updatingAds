let util = require('util');
let Site = require('./Site');


/**
 * Функция-конструктор для работы с Rosrealt
 *
 * @param {object} settings Объект с настройками.
 * @param {object} settings.browser Объект браузера puppeteer
 * @constructor
 */
let Spiti = function Spiti (settings) {
    Site.call(this, settings);
    this.mainPageURL = 'https://www.spiti.ru/';
    this.logoutPageURL = this.mainPageURL + '/logout?back=1';
    this.adsPageURL =  this.mainPageURL + '/ad-list';
    this.authFormPageURL = this.mainPageURL + '/login';
};

util.inherits(Spiti, Site); // наследование

// Методы

/**
 *  Авторизация
 * @param {string} oAccountLoginData.login Логин
 * @param {string} oAccountLoginData.password Пароль
 */
Spiti.prototype.authorize = async function (oAccountLoginData) {
    let page = await this.getPage();

    await page.goto(this.mainPageURL);
    await page.evaluate(async (oAccountLoginData, authFormPageURL) => {
        let formData = new FormData();
        formData.append('email', oAccountLoginData.login);
        formData.append('password', oAccountLoginData.password);
        formData.append('login', 'Войти');
        formData.append('_form_', 'login');
        formData.append('sourcePage', authFormPageURL);
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
Spiti.prototype.updateAds = async function (oAccountLoginData) {
    return false;
};

module.exports = Spiti;