var require = patchRequire(require);
var utils   = require('utils');
/**
 * Функция-конструктор для работы с Barahla.net
 *
 * @param {object} oSettings Объект с настройками.
 * @constructor
 */
exports.FreeAdsIn = function (oSettings) {
    var self = this;
    this.sMainPageURL = 'http://www.freeadsin.ru/';
    this.sAuthPageURL = 'http://www.freeadsin.ru/ru-i-loginform';
    this.sAdsPageURL = 'http://www.freeadsin.ru/ru-i-myads';
    this.sUnauthPageURL = 'http://www.freeadsin.ru/ru-i-logout';
    this.sSiteName = 'FreeAdsIn';

    /**
     *  Авторизоваться под пользователем с логином(e-mail) sLogin и паролем sPassword
     * @param {string} sLogin Логин
     * @param {string} sPassword Пароль
     */
    this.authorize = function (sLogin, sPassword) {
        self.toAdsPage(function() {
            if (!casper.exists('form[name="manageLangFields"]')) { // Если формы авторизации нет, то пробуем по новой
                casper.echo(self.sSiteName + ' selector form[name="manageLangFields"] is not exists. Trying again.', 'WARNING');
                self.authorize(sLogin, sPassword);
            } else {
                casper.fillSelectors('form[name="manageLangFields"]', {
                    'input[name="Login"]':    sLogin,
                    'input[name="Password"]': sPassword,
                }, true);
                casper.waitForUrl(/myads/, function () {
                    casper.echo(self.sSiteName + ' auth success', 'INFO');
                });
            }
        });
    };

    /**
     * Перейти на главную старницу
     * @param {Function} [callback] Функция, которая будет вызвана после перехода на главную страницу
     */
    this.toMainPage = function (callback) {
        casper.thenOpen(self.sMainPageURL, function () {
            if (callback) {
                callback();
            }
        });
    };
    /**
     * Перейти к странице с объявлениями пользователя
     * @param {Function} [callback] Функция, которая будет вызвана после перехода на страницу объявлений
     */
    this.toAdsPage = function (callback) {
        casper.thenOpen(self.sAdsPageURL, function () {
            if (callback) {
                callback();
            }

        });
    };

    /**
     * Обновить последнее объявление в ЛК
     */
    this.updateLastAd = function () {
        self.toAdsPage(function () {
            if (casper.exists('a[href*="updateAction"]')) { // Если есть объявления для поднятия
                casper.thenEvaluate(function () {
                    /** Все изображения обновления объявлений */
                    var allRefreshBtn = document.querySelectorAll('a[href*="updateAction"]');
                    allRefreshBtn[allRefreshBtn.length - 1].click();
                });
                casper.waitForUrl(/updateAction-i-refresh/,function () {
                    casper.echo(self.sSiteName + ' ad is updated');
                })
            } else {
                casper.then(function () {
                    casper.echo(self.sSiteName + ' no ads to update', 'INFO');
                });
            }
        });

    };
    /**
     * Выйти из личного кабинета
     */
    this.unAuthorize = function () {
        casper.thenOpen(self.sUnauthPageURL, function () {
            casper.echo( self.sSiteName + ' logout success', 'INFO')
        })
    };
    /**
     * Обновить объявления пользователя с логином sLogin и паролем sPassword
     * @param {string} sLogin Логин
     * @param {string} sPassword Пароль
     */
    this.updateAds = function (sLogin, sPassword) {
        casper.thenOpen(self.sAuthPageURL, {}, function () {
            casper.echo(self.sSiteName + ' ' + sLogin + ' ' + sPassword);

            self.authorize(sLogin, sPassword);

            self.updateLastAd();
            self.unAuthorize();
        });
    };

    return this;
};
