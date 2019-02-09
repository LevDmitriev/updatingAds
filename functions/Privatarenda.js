var require = patchRequire(require);
var utils   = require('utils');
var Site    = require('/functions/Site').Site;

/**
 * Объект для работы с Privatarenda
 *
 * @param {object} oSettings Объект с настройками.
 * @constructor
 */
var Privatarenda = function Privatarenda (oSettings) {
    this.sMainPageURL   = 'http://www.privatarenda.ru';
    this.sSiteName      = 'Privatarenda';
    this.sUnauthPageURL = 'http://privatarenda.ru/kabinet.php?act=exit';
};

// Наследование
Privatarenda.prototype             = Object.create(Site.prototype);
Privatarenda.prototype.constructor = Privatarenda;

// Методы

/**
 *  Авторизоваться
 * @param {string} oAccountLoginData.login Логин
 * @param {string} oAccountLoginData.password Пароль
 *
 * @return {Casper}
 */
Privatarenda.prototype.authorize = function (oAccountLoginData) {
    var self = this;
    self.unAuthorize();
    casper.thenOpen(self.sMainPageURL, function () {
        if (!casper.exists('form[name="login"]')) { // Если формы авторизации нет, то пробуем по новой
            casper.echo(self.sSiteName + ' форма авторизации не обнаружена. Повторяю попытку...', 'WARNING');
            self.authorize(oAccountLoginData);
        } else {
            casper.fillSelectors('form[name="login"]', {
                'input[name="Email"]':    oAccountLoginData.login,
                'input[name="Password"]': oAccountLoginData.password
            }, true);
            casper.waitForUrl(/kabinet\.php/, function () {
                casper.echo(self.sSiteName + ' авторизация прошла успешно', 'INFO');
            });
        }

    });

    return casper;
};

/**
 * Обновить объявление
 * @param {int} number Порядковый номер объявления -1 (исчисление в массивах с 0)
 */
Privatarenda.prototype.updateAd = function (number) {
    var self = this;
    casper.thenEvaluate(function (number) {
        var allButtons = document.querySelectorAll('td.vip input[name="actualize"]');
        allButtons[number].click(); // Кликаем на кнопку поднятия объявленийй
    }, number);
    casper.waitForUrl(/act=updateobject/, function () {
        casper.click('input[name="actualize"]'); // на следующей странице кликаем подтверждающую кнопку
    });
    casper.waitForUrl(/act=actualize/, function () {
        //  Возвращаемся на Privatarenda
    });
};

/**
 * Обновить объявления пользователя с логином sLogin и паролем sPassword
 * @param {string} oAccountLoginData.login Логин
 * @param {string} oAccountLoginData.password Пароль
 */
Privatarenda.prototype.updateAds = function (oAccountLoginData) {
    var self = this;
    self.authorize(oAccountLoginData)
        .then(function () {
            casper.echo(self.sSiteName + ' ' + oAccountLoginData.login + ' ' + oAccountLoginData.password);
        })
        .then(function () {
            /** Количество объявлений
             * @type {Number}
             */
            var iAdsCount = casper.getElementsInfo('td.vip').length;
            for (var i = 0; i < iAdsCount; i++) {
                self.updateAd(i);
            }
        });
};

exports.Privatarenda = Privatarenda;

