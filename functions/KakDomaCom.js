var require = patchRequire(require);
var utils   = require('utils');
/**
 * Функция-конструктор для работы с Barahla.net
 *
 * @param {object} oSettings Объект с настройками.
 * @constructor
 */
exports.KakDomaCom = function (oSettings) {
    var self = this;
    this.iUserID = null; // ID пользователя получаем при авторизации
    this.sMainPageURL = 'http://kakdoma.com/';
    this.sAuthPageURL = 'http://kakdoma.com/site/login';
    this.sProfilePageURL = 'http://kakdoma.com/users/news';
    this.sAdsPageURL = 'http://kakdoma.com/users/objects?id=' + this.iUserID;
    this.sUnauthPageURL = 'http://kakdoma.com/site/logout';
    this.sSiteName = 'Kakdoma.com';

    /**
     *  Авторизоваться под пользователем с логином(e-mail) sLogin и паролем sPassword
     * @param {string} sLogin Логин
     * @param {string} sPassword Пароль
     */
    this.authorize = function (sLogin, sPassword) {
        casper.open(self.sAuthPageURL, {
            method: 'post',
            data: {
                'LoginForm[phone]': sLogin,
                'LoginForm[password]': sPassword,
            },
            headers: {
                'Accept': 'application/json'
            }
        }).then(function () {
            self.iUserID = JSON.parse(casper.getHTML('body'))['ID_User'];
            if (self.iUserID) {
                casper.echo(self.sSiteName + ' login success', 'INFO')
            } else {
                casper.echo(self.sSiteName + ' login failed', 'WARNING')
            }
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
            casper.then(function () {
                var iLastBtnNumber = casper.evaluate(function () {
                    /** Все активные кнопки "Поднять" */
                    var allUpdateBtns = document.querySelectorAll('[id*="object"] .rating .buttonmin.red[href*=rat]');
                    /** Последняя активная кнопка "Поднять" */
                    return allUpdateBtns.length-1;
                });
                self.updateAdByNumber(iLastBtnNumber)
            })

        });
    };

    /**
     * Обновить объявление по его порядковому номеру
     * @param {int} iAdNumber Порядковый номер объявления
     */
    this.updateAdByNumber = function(iAdNumber) {
        self.toAdsPage(function () {
            casper.thenEvaluate(function (iAdNumber) {
                /** Все активные кнопки "Поднять" */
                var allUpdateBtns = document.querySelectorAll('[id*="object"] .rating .buttonmin.red[href*=rat]');
                if (allUpdateBtns[iAdNumber-1]) {
                    allUpdateBtns[iAdNumber-1].click();
                } else {
                    casper.echo(self.sSiteName + ' no ads to update')
                }
            }, iAdNumber);
        })
    };

    /**
     * Обновить все объявления
     */
    this.updateAllAds = function() {
        self.toAdsPage(function () {
            casper.then(function () {
                /** Количество кнопок Поднять **/
                var countUpdateBtns = casper.evaluate(function () {
                    return document.querySelectorAll('[id*="object"] .rating .buttonmin.red[href*=rat]').length;
                });
                while(countUpdateBtns) {
                    self.updateAdByNumber(countUpdateBtns);
                    countUpdateBtns--;
                }

            })
        })
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

            self.updateAllAds();
            self.unAuthorize();
        });
    };

    return this;
};
