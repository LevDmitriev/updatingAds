var require = patchRequire(require);
var utils   = require('utils');
/**
 * Функция-конструктор для работы с Barahla.net
 *
 * @param {object} oSettings Объект с настройками.
 * @constructor
 */
exports.Egent = function (oSettings) {
    var self = this;
    this.sMainPageURL = 'https://www.egent.ru/';
    this.sAuthPageURL = 'https://www.egent.ru/auth.html';
    this.sAdsPageURL = 'https://www.egent.ru/my_notices.html';
    this.sUnauthPageURL = 'https://www.egent.ru/auth/logout.html';
    this.sSiteName = 'Egent';

    /**
     *  Авторизоваться под пользователем с логином(e-mail) sLogin и паролем sPassword
     * @param {string} sLogin Логин
     * @param {string} sPassword Пароль
     */
    this.authorize = function (sLogin, sPassword) {
        casper.open(self.sAuthPageURL).then( function openAuthPage() {
            if (casper.exists('form[action="/auth/login/"]')) {// Если пользователь ещё не авторизован

                casper.fillSelectors('form[action="/auth/login/"]',{
                    'input[name="username"]': sLogin,
                    'input[name="password"]': sPassword,
                }, true);
                casper.then(function waitForMyAdsURL() {
                    casper.waitForUrl(/egent/, function () {
                        casper.echo(self.sSiteName +' auth success', 'INFO')
                    });
                })
            } else { // Если пользователь авторизован — переходим на главную страницу
                self.toMainPage(function () {
                    casper.echo(self.sSiteName + ' user is already authorized. To main page.')
                });
            }
        })
    };

    /**
     * Перейти на главную старницу
     * @param {Function} callback Функция, которая будет вызвана после перехода на главную страницу
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
            if (!casper.getCurrentUrl() === self.sAdsPageURL) {
                casper.echo(self.sSiteName + ' can not get ads page ' + self.sAdsPageURL, 'ERROR');
            }
            if (callback) {
                callback();
            }
        });
    };

    /**
     * Обновить последнее объявление в ЛК
     */
    this.updateLastAd = function() {
        self.toAdsPage();

        casper.thenEvaluate(function() {
            var allButtons = document.querySelectorAll('a[href*="updatenotice"]');
            if (allButtons.length) {
                allButtons[allButtons.length-1].click(); // Кликаем на кнопку поднятия объявлений
            } else {
                casper.echo( self.sSiteName + ' update button not found', 'ERROR')
            }
        });

        self.toAdsPage();
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
