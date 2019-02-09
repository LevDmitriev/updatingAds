var require = patchRequire(require);
var utils   = require('utils');
var Site    = require('/functions/Site').Site;

/**
 * Объект для работы с сайтом 100Realt
 *
 * @param {object} oSettings Объект с настройками.
 * @constructor
 */
var _100Realt = function (oSettings) {
    this.sMainPageURL   = 'https://www.100realt.ru';
    this.sAuthPageURL   = this.sMainPageURL + '/sign?return=%2F';
    this.sAdsPageURL    = this.sMainPageURL + '/housing';
    this.sUnauthPageURL = this.sMainPageURL + '/logout';
    this.sSiteName      = '_100Realt';
};

// Наследование
_100Realt.prototype             = Object.create(Site.prototype);
_100Realt.prototype.constructor = _100Realt;

// Методы

/**
 *  Авторизация
 * @param {string} oAccountLoginData.login Логин
 * @param {string} oAccountLoginData.password Пароль
 */
_100Realt.prototype.authorize = function (oAccountLoginData) {
    var self = this;
    self.unAuthorize();
    // casper.then(function () {
    //     casper.open(self.sAuthPageURL, {
    //         method: 'post',
    //         data: {
    //             email: oAccountLoginData.login,
    //             password: oAccountLoginData.password ,
    //         }
    //     }).then(function () {
    //         casper.waitForUrl(self.sMainPageURL, function() {
    //             casper.echo(self.sSiteName + ' авторизация прошла успешно', 'INFO');
    //         });
    //     })
    // })
    casper.thenOpen(self.sAuthPageURL).then(function authorise () {
        casper.fillSelectors('form[action="/sign?return=%2F"]', {
            'input[name="email"]':    oAccountLoginData.login,
            'input[name="password"]': oAccountLoginData.password
        });
        casper.then(function waitForURL () {
            casper.click('form[action="/sign?return=%2F"] button[type="submit"]')
        });
        casper.then(function () {
            casper.waitForUrl(/100realt\.ru\/$/, function () {
                casper.echo(self.sSiteName + ' авторизация прошла успешно', 'INFO');
            });
        });
    });
};

/**
 * Обновить последнее объявление в ЛК
 */
_100Realt.prototype.updateLastAd = function () {
    var self = this;
    self.toAdsPage();
    casper.thenEvaluate(function () {
        var allButtons = document.querySelectorAll('a[href*="freeUp"]');
        if (allButtons.length) {
            allButtons[allButtons.length - 1].click(); // Кликаем на кнопку поднятия объявлений
        } else {
            casper.echo(self.sSiteName + ' кнопки обновления не найдено', 'ERROR');
        }
    });
};

/**
 * Обновить объявления пользователя с логином sLogin и паролем sPassword
 * @param {string} oAccountLoginData.login Логин
 * @param {string} oAccountLoginData.password Пароль
 */
_100Realt.prototype.updateAds = function (oAccountLoginData) {
    var self = this;
    casper.thenOpen(self.sAuthPageURL, {}, function () {
        casper.echo(self.sSiteName + ' ' + oAccountLoginData.login + ' ' + oAccountLoginData.password);
        self.authorize(oAccountLoginData);
        self.updateLastAd();
        self.unAuthorize();
        casper.then(function () {
            casper.clearCache();
        });
    });
};

exports._100Realt = _100Realt;
