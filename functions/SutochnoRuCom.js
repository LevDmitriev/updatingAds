var require = patchRequire(require);
var utils   = require('utils');
var Site  = require('/functions/Site').Site;

/**
 * Класс для работы с сайтом sutochno.ru.com
 *
 * @param {object} oSettings Объект с настройками.
 * @constructor
 */
var SutochnoRuCom = function (oSettings) {
    this.sMainPageURL = 'https://sutochno.ru.com';
    this.sAdsPageURL = 'https://sutochno.ru.com/housing';
    this.sSiteName = 'SutochnoRuCom';
    this.sUnauthPageURL = 'https://sutochno.ru.com/logout';
};

// Наследование
SutochnoRuCom.prototype = Object.create(Site.prototype);
SutochnoRuCom.prototype.constructor = SutochnoRuCom;

// Методы

/**
 *  Авторизоваться под пользователем с логином(e-mail) sLogin и паролем sPassword
 * @param {string} oAccountLoginData.login Логин
 * @param {string} oAccountLoginData.password Пароль
 */
SutochnoRuCom.prototype.authorize = function (oAccountLoginData) {
    var self = this;
    self.unAuthorize();
    casper.thenOpen('https://sutochno.ru.com/index.php/login', {
        method: 'post',
        data: {
            email: oAccountLoginData.login,
            password: oAccountLoginData.password ,
        }
    }).then(function () {
        casper.waitForUrl('/user/index', function() {
            casper.echo(self.sSiteName + ' авторизация прошла успешно', 'INFO');
        });
    })
};

/**
 * Обновить объявление
 * @param {int} number Порядковый номер объявления -1 (исчисление в массивах с 0)
 */
SutochnoRuCom.prototype.updateAd = function(number) {
    var self = this;
    casper.thenEvaluate(function(number) {
        var allAds = document.querySelectorAll('.row.uhl');
        var refreshBtton = allAds[number].querySelector('.btn.btn-sm.btn-info');
        refreshBtton.click(); // Кликаем на кнопку поднятия объявленийй
    }, number);
};

/**
 * Обновить объявления пользователя
 * @param {string} oAccountLoginData.login Логин
 * @param {string} oAccountLoginData.password Пароль
 */
SutochnoRuCom.prototype.updateAds = function (oAccountLoginData) {
    var self = this;
    casper.thenOpen(self.sMainPageURL, {}, function() {
        casper.echo(self.sSiteName + ' ' + oAccountLoginData.login + ' ' + oAccountLoginData.password);
        self.authorize(oAccountLoginData);
        self.toAdsPage(function () {
            /** Количество объявлений
             * @type {Number}
             */
            var iAdsCount = casper.getElementsInfo('.row.uhl').length;
            self.updateAd(iAdsCount-1);
            self.unAuthorize();
        });

        casper.then(function () {
            casper.clearCache();
        });
    });
};

exports.SutochnoRuCom = SutochnoRuCom;

