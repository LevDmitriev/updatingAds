var require = patchRequire(require);
var utils   = require('utils');
var Site    = require('/functions/Site').Site;

/**
 * Функция-конструктор для работы с Barahla.net
 *
 * @param {object} oSettings Объект с настройками.
 * @constructor
 */
var BarahlaNet = function BarahlaNet (oSettings) {
    this.sSiteName          = 'BarahlaNet';
    this.sMainPageURL       = 'https://www.barahla.net';
    this.sSelectorRefreshAd = '.ads:last-of-type .placing.lgray a';
    this.sUnauthPageURL     = 'https://www.barahla.net/logout.php';
};

// Наследование
BarahlaNet.prototype             = Object.create(Site.prototype);
BarahlaNet.prototype.constructor = BarahlaNet;

// Методы

/**
 * Получить путь для обновления объявления
 * @param {int} iAdId ID объявления
 * @return {string}
 */
BarahlaNet.prototype.getUrlForUpdateAd = function (iAdId) {
    var self = this;
    return self.sMainPageURL + '/refresh/' + iAdId;
};

/**
 *  Авторизоваться под пользователем с логином(e-mail) sLogin и паролем sPassword
 * @param {string} oAccountLoginData.login Логин
 * @param {string} oAccountLoginData.password Пароль
 */
BarahlaNet.prototype.authorize = function (oAccountLoginData) {
    var self = this;
    self.unAuthorize();
    casper.thenOpen(self.sMainPageURL, function authorize () {
        if (!casper.exists('form.login-form')) { // Если формы авторизации нет, то пробуем по новой
            casper.echo(self.sSiteName + ' форма авторизации не обнаружена. Повторяю попытку...', 'WARNING');
            self.authorize(oAccountLoginData);
        } else {
            casper.fillSelectors('form.login-form', {
                'input[name="username"]': oAccountLoginData.login,
                'input[name="password"]': oAccountLoginData.password
            }, true);
            casper.waitForSelector('a.user-account', function () {
                // Ждём появления аккаунта
            });
        }
    });

    return casper;
};

/**
 * Обновить последнее объявление в списке объявлений пользователя
 */
BarahlaNet.prototype.updateLastAd = function (iUserId) {
    var self = this;
    self.toAdsPage(iUserId, function () {
        if (casper.exists(self.sSelectorRefreshAd)) {
            /** ID объявления */
            var iAdId = parseInt(casper.getElementAttribute(self.sSelectorRefreshAd, 'onclick').match(/\d+/gm));
            casper.open(self.getUrlForUpdateAd(iAdId));
        } else {
            casper.echo(self.sSiteName + ' нет объявлений для обновления', 'INFO');
        }
    });
};

/**
 * Перейти к странице с объявлениями пользователя
 *
 * @param {int} iUserId ID пользователя
 * @param {function} callback Функция, которая будет вызвана после перехода на страницу с объявлениями пользователя
 */
BarahlaNet.prototype.toAdsPage = function (iUserId, callback) {
    var self = this;
    callback = callback || function () {};
    casper.thenOpen(self.sMainPageURL + '/user/' + iUserId + '/', callback);
};

/**
 * Обновить объявления пользователя с логином sLogin и паролем sPassword
 * @param {string} oAccountLoginData.login Логин
 * @param {string} oAccountLoginData.password Пароль
 * @param {int} oAccountLoginData.userId ID пользователя
 */
BarahlaNet.prototype.updateAds = function (oAccountLoginData) {
    var self = this;
    self.authorize(oAccountLoginData)
        .then(function () {
            casper.echo(self.sSiteName + ' ' + oAccountLoginData.login + ' ' + oAccountLoginData.password);
        })
        .then(function () {
            self.updateLastAd(oAccountLoginData.userId);
        })
        .then(function () {
            casper.clearCache();
        });
};

exports.BarahlaNet = BarahlaNet;
