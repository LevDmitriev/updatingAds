var require = patchRequire(require);
var utils   = require('utils');
var Site  = require('/functions/Site').Site;

/**
 * Объект для работы с сайтом Nedr
 *
 * @param {object} oSettings Объект с настройками.
 * @constructor
 */
var Nedr = function (oSettings) {
    this.sMainPageURL = 'https://nedr.ru';
    this.sAuthPageURL = this.sMainPageURL + '/logon.do';
    this.sAdsPageURL = this.sMainPageURL + '/my/';
    this.sUnauthPageURL = this.sMainPageURL + '/logout/';
    this.sSiteName = 'Nedr';
};

// Наследование
Nedr.prototype = Object.create(Site.prototype);
Nedr.prototype.constructor = Nedr;

// Методы

/**
 *  Авторизоваться под пользователем с логином(e-mail) sLogin и паролем sPassword
 * @param {string} oAccountLoginData.login Логин
 * @param {string} oAccountLoginData.password Пароль
 */
Nedr.prototype.authorize = function (oAccountLoginData) {
    var self = this;
    self.unAuthorize();
    casper.thenOpen(self.sAuthPageURL, {
        method: 'post',
        data: {
            j_username: oAccountLoginData.login,
            j_password: oAccountLoginData.password ,
        }
    }).then(function () {
        casper.waitForUrl(self.sAdsPageURL, function() {
            casper.echo(self.sSiteName + ' авторизация прошла успешно', 'INFO');
        });
    })
};

/**
 * Обновить последнее объявление в ЛК
 */
Nedr.prototype.updateLastAd = function () {
    var self = this;
    self.toAdsPage(function () {
        if (casper.exists('a.btn:not(.btn_upped)[href*="up"]')) { // Если есть объявления для поднятия
            casper.thenEvaluate(function () {
                /** Все изображения обновления объявлений */
                var allRefreshBtn = document.querySelectorAll('a.btn:not(.btn_upped)[href*="up"]');
                allRefreshBtn[allRefreshBtn.length - 1].click();
            });
            casper.thenEvaluate(function () {
                document.querySelector('button[onclick*="up"]').click();
            })
        } else {
            casper.then(function () {
                casper.echo(self.sSiteName + ' нет объявлений для поднятия', 'INFO');
            });
        }
    });
};

/**
 * Обновить объявления пользователя с логином sLogin и паролем sPassword
 * @param {string} oAccountLoginData.login Логин
 * @param {string} oAccountLoginData.password Пароль
 */
Nedr.prototype.updateAds = function (oAccountLoginData) {
    var self = this;
    casper.thenOpen(self.sAuthPageURL, {}, function () {
        casper.echo(self.sSiteName + ' ' + oAccountLoginData.login + ' ' + oAccountLoginData.password);

        self.authorize(oAccountLoginData);

        casper.then(function () {
            self.updateLastAd()
        });
        self.unAuthorize();
        casper.then(function () {
            casper.clearCache();
        });
    });
};

exports.Nedr = Nedr;
