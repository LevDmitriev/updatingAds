var require = patchRequire(require);
var utils   = require('utils');
/**
 * Функция-конструктор для работы с Barahla.net
 *
 * @param {object} oSettings Объект с настройками.
 * @constructor
 */
exports.Move = function (oSettings) {
    var self = this;
    this.sMainPageURL = 'https://move.ru/';
    this.sAuthPageURL = 'https://move.ru/user/login/';
    this.sAdsPageURL = 'https://move.ru/user/items/';
    this.sUnauthPageURL = 'https://move.ru/user/logout/';
    this.sSiteName = 'Move';

    /**
     *  Авторизоваться под пользователем с логином(e-mail) sLogin и паролем sPassword
     * @param {string} sLogin Логин
     * @param {string} sPassword Пароль
     */
    this.authorize = function (sLogin, sPassword) {
        casper.open('https://move.ru/api/v3/login/', {
            method: 'post',
            data: {
                login: sLogin,
                password: sPassword,
            }
        }).then(function () {
            self.toAdsPage()
        })
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
            casper.thenEvaluate(function () {
                var allTabs = document.querySelectorAll('li.ng-binding');
                allTabs[2].click();
            });
            casper.then(function () {
                if (casper.exists('[ng-click="thisPublish(item, 7)"]')) { // Если есть объявления для поднятия
                    casper.thenEvaluate(function () {
                        document.querySelector('[ng-click="thisPublish(item, 7)"]').click();
                    });
                } else {
                    casper.then(function () {
                        casper.echo(self.sSiteName + ' no ads to update', 'INFO');
                    });
                }
            });
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
