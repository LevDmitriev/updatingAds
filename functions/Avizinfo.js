var require = patchRequire(require);
var utils   = require('utils');
var Site  = require('/functions/Site').Site;

/**
 * Объект для работы с сайтом Avizinfo
 *
 * @param {object} oSettings Объект с настройками.
 * @constructor
 */
var Avizinfo = function (oSettings) {
    var self = this;
    this.sMainPageURL = 'http://www.avizinfo.ru';
    this.sAuthPageURL = this.sMainPageURL + '/ru-i-loginform.html';
    this.sAdsPageURL = this.sMainPageURL + '/ru-i-myads.html';
    this.sUnauthPageURL = this.sMainPageURL + '/ru-i-logout.html';
    this.sSiteName = 'Avizinfo';
};

// Наследование
Avizinfo.prototype = Object.create(Site.prototype);
Avizinfo.prototype.constructor = Avizinfo;

// Методы

/**
 *  Авторизация
 * @param {string} oAccountLoginData.login Логин
 * @param {string} oAccountLoginData.password Пароль
 */
Avizinfo.prototype.authorize = function (oAccountLoginData) {
    var self = this;
    self.unAuthorize();
    casper.thenOpen(self.sAuthPageURL, {
        method: 'post',
        data: {
            SID: 'login',
            actionMode: 'login',
            Login: oAccountLoginData.login,
            Password: oAccountLoginData.password ,
        }
    }).then(function () {
        if (casper.getCurrentUrl() === self.sAdsPageURL) {
            casper.echo(self.sSiteName + ' авторизация прошла успешно', 'INFO');
        }
    })
};

/**
 * Обновить последнее объявление в ЛК
 */
Avizinfo.prototype.updateLastAd = function() {
    var self = this;
    if (casper.exists('tr#userareaOffer img[src*="ico_refresh.gif"]')) { // Если есть объявления для поднятия
        casper.thenEvaluate(function() {
            /** Все изображения обновления объявлений */
            var allRefreshImg = document.querySelectorAll('tr#userareaOffer img[src*="ico_refresh.gif"]');
            var lastRefreshBtn = allRefreshImg[allRefreshImg.length-1].parentNode;
            lastRefreshBtn.click();
        });
    } else {
        casper.then(function () {
            casper.echo(self.sSiteName + ' no ads to update', 'INFO')
        });
    }
};

/**
 * Обновить объявления пользователя с логином sLogin и паролем sPassword
 * @param {string} oAccountLoginData.login Логин
 * @param {string} oAccountLoginData.password Пароль
 */
Avizinfo.prototype.updateAds = function (oAccountLoginData) {
    var self = this;
    casper.thenOpen(self.sAuthPageURL, {}, function () {
        casper.echo(self.sSiteName + ' ' + oAccountLoginData.login + ' ' + oAccountLoginData.password);

        self.authorize(oAccountLoginData);

        casper.then(function () {
            self.updateLastAd()
        });
        casper.then(function () {
            casper.clearCache();
        });
    });
};

exports.Avizinfo = Avizinfo;

