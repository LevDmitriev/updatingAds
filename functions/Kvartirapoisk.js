var require = patchRequire(require);
var utils   = require('utils');
var Site  = require('/functions/Site').Site;

/**
 * Объект для работы с сайтом Kvartirapoisk
 *
 * @param {object} oSettings Объект с настройками.
 * @param {string} oSettings.mainPageURL URL главной страницы сайта
 * @param {string} oSettings.authPageURL URL страницы с формой авторизации
 * @constructor
 */
var Kvartirapoisk = function (oSettings) {
    this.sMainPageURL = 'http://kvartirapoisk.ru';
    this.sAuthPageURL = this.sMainPageURL + '/login.php';
    this.sUnauthPageURL = this.sMainPageURL + '/exit';
    this.sAdsPageURL = this.sMainPageURL + '/myflats.php';
    this.sSiteName = 'Kvartirapoisk';
};

// Наследование
Kvartirapoisk.prototype = Object.create(Site.prototype);
Kvartirapoisk.prototype.constructor = Kvartirapoisk;

// Методы
/**
 *  Авторизоваться под пользователем с логином(e-mail) sLogin и паролем sPassword
 * @param {string} oAccountLoginData.login Логин
 * @param {string} oAccountLoginData.password Пароль
 */
Kvartirapoisk.prototype.authorize = function (oAccountLoginData) {
    var self = this;
    self.unAuthorize();
        casper.thenOpen(self.sAuthPageURL + '?username=' + oAccountLoginData.login +'&password=' +  oAccountLoginData.password)
            .then(function () {
            casper.waitForUrl(self.sAdsPageURL, function() {
                casper.echo(self.sSiteName + ' авторизация прошла успешно', 'INFO');
            });
        })
};

/**
 * Обновить объявления пользователя с логином sLogin и паролем sPassword
 * @param {string} oAccountLoginData.login Логин
 * @param {string} oAccountLoginData.password Пароль
 */
Kvartirapoisk.prototype.updateAds = function (oAccountLoginData) {
    var self = this;
    casper.thenOpen(self.sAuthPageURL, {}, function () {
        casper.echo(self.sSiteName + ' ' + oAccountLoginData.login + ' ' + oAccountLoginData.password);
        self.authorize(oAccountLoginData);
        casper.then(function () {
            var iAdsCount = casper.getElementsInfo('img[src*="upcan"]').length;
            for(var i = 0; i < iAdsCount; i++) {
                self.updateAd(iAdsCount-1);
            }
        });
        self.unAuthorize();
        casper.then(function () {
            casper.clearCache();
        });
    });
};

/**
 * Обновить объявление
 * @param {int} number Порядковый номер объявления -1 (исчисление в массивах с 0)
 */
Kvartirapoisk.prototype.updateAd = function(number) {
    casper.thenEvaluate(function(number) {
        var allButtons = document.querySelectorAll('img[src*="upcan"]');
        if (allButtons) {
            allButtons[number].parentNode.click(); // Кликаем на кнопку поднятия объявлений
        } else {
            casper.echo(self.sSiteName + ' update button not found', 'WARNING')
        }
    }, number);
    casper.waitForUrl(/myflats\.php/, function () {
    });
};

exports.Kvartirapoisk = Kvartirapoisk;
