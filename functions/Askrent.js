var require = patchRequire(require);
var utils   = require('utils');
var Site  = require('/functions/Site').Site;
var md5 = require('md5');
/**
 * Функция-конструктор для работы с askrent.ru
 *
 * @param {object} oSettings Объект с настройками.
 * @constructor
 */
var Askrent = function Askrent (oSettings) {
    this.sMainPageURL = 'https://askrent.ru';
    this.sAuthPageURL = this.sMainPageURL + '/login.html';
    this.sAdsPageURL = this.sMainPageURL + '/cabinet-up-apartment.html';
    this.sUnauthPageURL = this.sMainPageURL + '/cabinet-logout.html';
    this.sSiteName = 'Askrent';
};

// Наследование
Askrent.prototype = Object.create(Site.prototype);
Askrent.prototype.constructor = Askrent;

// Методы

/**
 *  Авторизоваться под пользователем с логином(e-mail) sLogin и паролем sPassword
 * @param {string} oAccountLoginData.login Логин
 * @param {string} oAccountLoginData.password Пароль
 */
Askrent.prototype.authorize = function (oAccountLoginData) {
    var self = this;
    casper.thenOpen(self.sAuthPageURL, {
        method: 'post',
        data: {
            phone: oAccountLoginData.login,
            pass: md5(oAccountLoginData.password),
            save: 0
        }
    }).then(function () {
        self.toAdsPage();
    })
};

/**
 * Обновить последнее объявление в ЛК
 */
Askrent.prototype.updateLastAd = function () {
    var self = this;
    self.toAdsPage(function () {
        if (casper.exists('.cabinet-flat .actions-up a')) { // Если есть объявления для поднятия
            casper.thenEvaluate(function () {
                /** Все изображения обновления объявлений */
                var allRefreshBtn = document.querySelectorAll('.cabinet-flat .actions-up a');
                allRefreshBtn[allRefreshBtn.length - 1].click();
            });
            casper.then(function () {
                self.toAdsPage();
            })
        } else {
            casper.then(function () {
                casper.echo(self.sSiteName + ' нет объявлений для обновления', 'INFO');
            });
        }
    });
};

/**
 * Обновить объявления пользователя с логином sLogin и паролем sPassword
 * @param {string} oAccountLoginData.login Логин
 * @param {string} oAccountLoginData.password Пароль
 */
Askrent.prototype.updateAds = function (oAccountLoginData) {
    var self = this;
    casper.thenOpen(self.sAuthPageURL, {}, function () {
        casper.echo(self.sSiteName + ' ' + oAccountLoginData.login + ' ' + oAccountLoginData.password);
        self.authorize(oAccountLoginData);
        casper.then(function () {
            self.updateLastAd();
            self.updateLastAd();
            self.updateLastAd();
        });
        self.unAuthorize();
        casper.then(function () {
            casper.clearCache();
        });
    });
};

exports.Askrent = Askrent;
