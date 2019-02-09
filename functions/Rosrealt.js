var require = patchRequire(require);
var utils   = require('utils');
var Site    = require('/functions/Site').Site;

/**
 * Объект для работы с сайтом Rosrealt
 *
 * @param {object} oSettings Объект с настройками.
 * @param {string} oSettings.mainPageURL URL главной страницы сайта
 * @param {string} oSettings.authPageURL URL страницы с формой авторизации
 * @constructor
 */
var Rosrealt = function Rosrealt (oSettings) {
    this.sMainPageURL   = 'https://rosrealt.ru';
    this.sAuthPageURL   = this.sMainPageURL + '/rosrealt/myrosrealt.php?act=check';
    this.sUnauthPageURL = this.sMainPageURL + '/rosrealt/myrosrealt.php?act=exit';
    this.sAdsPage       = this.sMainPageURL + '/rosrealt/myrosrealt.php';
    this.sSiteName      = 'Rosrealt';
};

// Наследование
Rosrealt.prototype             = Object.create(Site.prototype);
Rosrealt.prototype.constructor = Rosrealt;

// Методы

/**
 *  Авторизация
 * @param {string} oAccountLoginData.login Логин
 * @param {string} oAccountLoginData.password Пароль
 *
 * @return {Casper}
 */
Rosrealt.prototype.authorize = function (oAccountLoginData) {
    var self = this;
    self.unAuthorize();
    casper.thenOpen(self.sAuthPageURL, {
        method: 'post',
        data:   {
            Email:    oAccountLoginData.login,
            Password: oAccountLoginData.password
        }
    }).then(function () {
        casper.waitForUrl(self.sAdsPage, function () {
            casper.echo(self.sSiteName + ' авторизация прошла успешно', 'INFO');
        });
    });

    return casper;
};

/**
 * Обновить последнее объявление в ЛК
 *
 * @return {Casper}
 */

Rosrealt.prototype.updateLastAd = function () {
    var self    = this;
    var success = false;
    casper.open(self.sAdsPage + '?act=obyavleniya&type=1')
        .then(function () {
            success = casper.evaluate(function () {
                var allButtons = document.querySelectorAll('input[name="actualize"]');
                if (allButtons.length) {
                    allButtons[allButtons.length - 1].click(); // Кликаем на кнопку поднятия объявлений

                    return true;
                } else {
                    return false;
                }
            });
        })
        .then(function () {
        if (!success) {
            casper.echo(self.sSiteName + ' объявлений для поднятия нет', 'ERROR');
        }
    });

    return casper;
};

/**
 * Обновить объявления пользователя с логином sLogin и паролем sPassword
 * @param {string} oAccountLoginData.login Логин
 * @param {string} oAccountLoginData.password Пароль
 */
Rosrealt.prototype.updateAds = function (oAccountLoginData) {
    var self = this;

    self.authorize(oAccountLoginData)
        .then(function () {
            casper.echo(self.sSiteName + ' ' + oAccountLoginData.login + ' ' + oAccountLoginData.password);
        })
        .then(function () {
            self.updateLastAd();
        })
        .then(function () {
            casper.clearCache();
        });
};

exports.Rosrealt = Rosrealt;
