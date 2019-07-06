let util = require('util');
let Site = require('./Site');

/**
 * Функция-конструктор для работы с Barahla.net
 *
 * @param {object} settings Объект с настройками.
 * @param {object} settings.browser Объект браузера puppeteer
 * @constructor
 */
let BarahlaNet = function BarahlaNet (settings) {
    Site.call(this, settings);
    this.mainPageURL = 'https://www.barahla.net';
    this.logoutPageURL = this.mainPageURL + '/logout.php';
    this.adsPageURL =  function(userId) { return this.mainPageURL + `/user/${userId}/`};
    this.authFormPageURL = this.mainPageURL + '/login_check';
};

util.inherits(BarahlaNet, Site); // наследование

// Методы

/**
 *  Авторизация
 * @param {string} oAccountLoginData.login Логин
 * @param {string} oAccountLoginData.password Пароль
 * @param {int} oAccountLoginData.userId ID пользователя
 *
 * @return {boolean} Успешно ли авторизовался пользователь
 */
BarahlaNet.prototype.authorize = async function (oAccountLoginData) {
    let page = await this.getPage();
    await this.logout();
    await page.goto(this.mainPageURL);
    await page.evaluate(async (oAccountLoginData, authFormPageURL) => {
        let formData = new FormData();
        formData.append('username', oAccountLoginData.login);
        formData.append('password', oAccountLoginData.password);
        formData.append('remember', '');
        await fetch(authFormPageURL,{
            method: 'POST',
            body: formData,
        });
    }, oAccountLoginData, this.authFormPageURL);
    await page.goto(this.adsPageURL(oAccountLoginData.userId), {waitUntil: 'load'});
    if (!page.url().includes(this.adsPageURL(oAccountLoginData.userId))) { // Если после всего мы не находимся на стрнице объявлений
        throw new Error('При авторизации произошла ошибка');
    }

    return true;
};



/**
 * Обновить объявления пользователя с логином sLogin и паролем sPassword
 * @param {string} oAccountLoginData.login Логин
 * @param {string} oAccountLoginData.password Пароль
 * @param {int} oAccountLoginData.userId ID пользователя
 */
BarahlaNet.prototype.updateAds = async function (oAccountLoginData) {
    let page = await this.getPage();
    await this.authorize(oAccountLoginData);
    /** Коллекция со всеми кнопками поднятия типа JSHandle*/
    let arAllBtns    = await page.$$('.js-hook-refresh-adwerz');
    if (arAllBtns.length) {
        await arAllBtns[arAllBtns.length-1].click();
    }
};

module.exports = BarahlaNet;
