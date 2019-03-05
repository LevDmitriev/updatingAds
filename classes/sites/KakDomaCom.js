let util = require('util');
let Site = require('./Site');

/**
 * Функция-конструктор для работы с KakDomaCom
 *
 * @param {object} settings Объект с настройками.
 * @param {object} settings.browser Объект браузера puppeteer
 * @constructor
 */
let KakDomaCom = function KakDomaCom (settings) {
    Site.call(this, settings);
    this.mainPageURL = 'http://kakdoma.com';
    this.authFormPageURL = this.mainPageURL + '/site/login';
    /** По ID пользователя получить путь к его странице объявлений
     * @param {Number} iUserId ID пользователя
     *
     * @return {string} Путь к странице объявлений пользователя
     */
    this.adsPageURL = function (iUserId) {
        return this.mainPageURL + '/users/objects?id=' + iUserId;
    };
    this.logoutPageURL = this.mainPageURL + '/site/logout';
    this.profilePageURL = this.mainPageURL + '/users/profile';
};

util.inherits(KakDomaCom, Site); // наследование

/**
 *  Авторизоваться под пользователем с логином(e-mail) sLogin и паролем sPassword
 * @param {string} oAccountLoginData.login Логин
 * @param {string} oAccountLoginData.password Пароль
 *
 * @return {Number} ID пользователя
 */
KakDomaCom.prototype.authorize = async function (oAccountLoginData) {
    let page = await this.getPage();

    await page.goto(this.mainPageURL);
    await page.evaluate(async (oAccountLoginData, authFormPageURL) => {
        let formData = new FormData();
        formData.append('LoginForm[phone]', oAccountLoginData.login);
        formData.append('LoginForm[password]', oAccountLoginData.password);
        return await fetch(authFormPageURL,{
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        });
    }, oAccountLoginData, this.authFormPageURL);
    await page.evaluate(() => {window.loginprov()});// Запускаем функцию авторизации
    await page.goto(this.profilePageURL);
    if (!page.url().includes(this.profilePageURL)) { // Если после всего мы не находимся на стрнице объявлений
        throw new Error('При авторизации произошла ошибка');
    }

    return await page.$eval('.fullname.f_bliss_large span', el => el.textContent.replace(/\D/gm, ''));
};
/**
 * Обновить объявления пользователя с логином sLogin и паролем sPassword
 * @param {string} oAccountLoginData.login Логин
 * @param {string} oAccountLoginData.password Пароль
 */
KakDomaCom.prototype.updateAds = async function (oAccountLoginData) {
    let page = await this.getPage();
    let userId = await this.authorize(oAccountLoginData);
    let self = this;

    await page.goto(this.adsPageURL(userId));
    /** Рекурсивная функция для клика по всем кнопкам поднятия объявлений */
    async function update (page) {
        /** Коллекция со всеми кнопками поднятия типа JSHandle*/
        let updateBtn  = await page.$('a.buttonmin.red[href*=rat]');
        if (updateBtn) {
            await updateBtn.click();
            await page.goto(self.adsPageURL(userId));
            await update(page);
        }
    }
    await update(page);
};

module.exports = KakDomaCom;
