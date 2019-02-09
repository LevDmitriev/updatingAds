var require = patchRequire(require);
var utils   = require('utils');
/**
 * Функция-конструктор для работы с Barahla.net
 *
 * @param {object} oSettings Объект с настройками.
 * @constructor
 */
exports.Sutki24Su = function (oSettings) {
    var self = this;
    this.iUserID = null; // ID пользователя получаем при авторизации
    this.city = oSettings.city;
    this.sMainPageURL = 'http://'+ this.city +'.sutki24.su';
    this.sAuthPageURL = this.sMainPageURL + '/personal/?login=yes';
    this.sProfilePageURL = 'http://kakdoma.com/users/news';
    this.sAdsPageURL = this.sMainPageURL + '/personal/flats/';
    this.sUnauthPageURL = this.sMainPageURL + '/?logout=yes';
    this.sSiteName = 'Sutki24.su';

    /**
     *  Авторизоваться под пользователем с логином(e-mail) sLogin и паролем sPassword
     * @param {string} sLogin Логин
     * @param {string} sPassword Пароль
     */
    this.authorize = function (sLogin, sPassword) {
        casper.open(self.sAuthPageURL, {
            method: 'post',
            data: {
                'AUTH_FORM': 'Y',
                'TYPE': 'AUTH',
                'backurl': '/personal/',
                'USER_LOGIN': sLogin,
                'USER_PASSWORD': sPassword,
            },
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
                var allAds = document.querySelectorAll('tr.active');
                var allUpdateBtnsInLastAdd = allAds[allAds.length-1].querySelectorAll('a[href="#"].active');
                if (allUpdateBtnsInLastAdd[2]) {
                    allUpdateBtnsInLastAdd[2].click();
                } else {
                    casper.echo(self.sSiteName + ' no ads to update')
                }
            });
            casper.thenEvaluate(function () {
                 document.querySelector('a[href*="up.php"]').click();
            })
        });
    };
    /**
     * Выйти из личного кабинета
     */
    this.unAuthorize = function () {
        casper.thenOpen(self.sUnauthPageURL, function () {
            casper.echo( self.sSiteName + ' logout success', 'INFO')
        });
        self.toMainPage();
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
