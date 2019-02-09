var require = patchRequire(require);
var utils   = require('utils');
/**
 * Функция-конструктор для работы с Barahla.net
 *
 * @param {object} oSettings Объект с настройками.
 * @constructor
 */
exports.Rent = function (oSettings) {
    var self = this;
    this.sMainPageURL = 'http://www.rent.ru/';
    this.sAuthPageURL = 'http://www.rent.ru/login.aspx';
    this.sAdsPageURL = 'http://www.rent.ru/my-account/my-billboard/index.aspx';
    this.sPersonalCabinetURL = 'http://www.rent.ru/my-account/index.aspx';
    this.sSiteName = 'Rent';

    /**
     *  Авторизоваться под пользователем с логином(e-mail) sLogin и паролем sPassword
     * @param {string} sLogin Логин
     * @param {string} sPassword Пароль
     */
    this.authorize = function (sLogin, sPassword) {
        casper.open(self.sAuthPageURL).then( function openAuthPage() {
            if (casper.exists('input[name="ctl07_ctl00_10"]')) {// Если пользователь ещё не авторизован
                casper.thenEvaluate(function (sLogin, sPassword) {
                    document.querySelector('input[name="ctl07_ctl00_10"]').value = sLogin;
                    document.querySelector('input[name="ctl07_ctl00_11"]').value = sPassword;
                    document.querySelector('a.ilf').click();
                }, sLogin, sPassword);
                casper.then(function waitForMyAdsURL() {
                    casper.waitForUrl(/my-account/, function () {
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
     * Перейти на страницу личного кабинета
     */
    this.toPersonalCabinet = function () {
        casper.thenOpen(self.sPersonalCabinetURL, function() {});
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
            casper.thenClick('.b11px a[href*="doPostBack"]', function () {
                casper.echo(self.sSiteName + ' at ads page', 'INFO');
                if (callback) {
                    callback();
                }
            })
        });
    };

    /**
     * Обновить последнее объявление в ЛК
     */
    this.updateLastAd = function () {
        self.toAdsPage(function () {
            casper.thenEvaluate(function () {
                /** Все блоки объявлений */
                var allRefreshImg  = document.querySelectorAll('.inner_managed');
                // У последнего блока объявлений кликаем на кнопку поднятия
                allRefreshImg[allRefreshImg.length-1].querySelector('a.ilfa').click();
            });
            casper.thenEvaluate(function () {
                    document.querySelector('input[value="30"]').click(); // Выбираем продление на 30 дней
                    document.querySelector('a.ilf').click(); // Кликаем на копку продления
                });
            self.toAdsPage();
        });

    };
    /**
     * Выйти из личного кабинета
     */
    this.unAuthorize = function () {
        casper.thenClick('a[title="Выход"]', function () {
            casper.waitForUrl(/login/, function  () {
                casper.echo( self.sSiteName + ' logout success', 'INFO')
            });
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
