var require = patchRequire(require);
var utils   = require('utils');
var Site    = require('/functions/Site').Site;

/**
 * Объект для работы с сайтом Yourenta
 *
 * @param {object} oSettings Объект с настройками.
 * @constructor
 */
var Yourenta = function Yourenta (oSettings) {
    this.sMainPageURL   = 'https://www.yourenta.ru';
    this.sAuthPageURL   = 'https://www.yourenta.ru/login.html';
    this.sUnauthPageURL = 'https://yourenta.ru/away.html';
    this.sAdsPageURL    = 'https://yourenta.ru/user-index.html';
    this.sSiteName      = 'Yourenta';
};

// Наследование
Yourenta.prototype             = Object.create(Site.prototype);
Yourenta.prototype.constructor = Yourenta;

// Методы

/**
 *  Авторизация
 * @param {string} oAccountLoginData.login Логин
 * @param {string} oAccountLoginData.password Пароль
 *
 * @return {Casper}
 */
Yourenta.prototype.authorize = function (oAccountLoginData) {
    var self = this;
    self.unAuthorize();
    casper.thenOpen(self.sAuthPageURL, {}, function () {
        if (!casper.exists('#login-form')) { // Если формы авторизации нет, то пробуем по новой
            casper.echo(self.sSiteName + ' форма авторизации не найдена.', 'WARNING');
        } else {
            casper.fillSelectors('#login-form', {
                'input[name="enter_email"]': oAccountLoginData.login,
                'input[name="enter_pass"]':  oAccountLoginData.password
            }, true);

            casper.waitForUrl(/user-index\.html/, function () {
                casper.echo(self.sSiteName + ' авторизация прошла успешно', 'INFO');
            });
        }
    });

    return casper;
};

/**
 * Задать последней кнопке "Поднять" значение атрибута для удобства дальнейшей работы.
 * @param {string} sAttrName Название атрибута
 * @param {string} sAttrVal Значение атрибута
 */
Yourenta.prototype.setLastRefreshBtnAttr = function (sAttrName, sAttrVal) {
    var self = this;
    casper.thenEvaluate(function (sAttrName, sAttrVal) {
        var allFlatsBlocks = document.querySelectorAll('.flat');
        var refreshBtn     = allFlatsBlocks[allFlatsBlocks.length - 1].querySelector('a#flat-work');
        refreshBtn.setAttribute(sAttrName, sAttrVal); // Задаём кнопке уникальный атрибут для дальнейшего её поиска
    }, sAttrName, sAttrVal);
};

/**
 * Удалить последний блок квартиры
 */
Yourenta.prototype.deleteLastFlatBlock = function () {
    var self = this;
    casper.thenEvaluate(function () {
        var allFlatsBlocks = document.querySelectorAll('.flat');
        var lastFlatBlock  = allFlatsBlocks[allFlatsBlocks.length - 1];
        lastFlatBlock.parentNode.removeChild(lastFlatBlock);
    });
};

/**
 * Закрыть попап
 */
Yourenta.prototype.closePopup = function () {
    var self = this;
    casper.waitUntilVisible('#fancybox-close', function () {
        casper.thenClick('#fancybox-close');
        casper.waitWhileVisible('#fancybox-overlay');
    });
};

/**
 * Кликнуть по последней кнопке "Поднять" и закрыть попап
 * @param {string} sSelector Селектор последней кнопки "Поднять"
 */
Yourenta.prototype.clickLastRefreshBtn = function (sSelector) {
    var self = this;
    casper.then(function () {
        if (!casper.exists(sSelector)) {
            casper.echo(self.sSiteName + ' нет объявлений для обновления', 'INFO');
        } else {
            casper.click(sSelector, function () {
                casper.waitUntilVisible('#fancybox-content', function () {
                    self.closePopup();
                });
            });
        }
    });
};

/**
 * Обновить iNumberAds количество объявлений снизу
 * @param {int} iNumberAds Кол-во объявлений, которые нужно обновить
 */
Yourenta.prototype.updateLastAds = function (iNumberAds) {
    var self = this;
    casper.thenOpen(self.sAdsPageURL, {}, function () {
        for (var i = 0; i < iNumberAds; i++) {
            self.setLastRefreshBtnAttr('data-name', 'refreshBtn');
            self.clickLastRefreshBtn('[data-name="refreshBtn"]');
            self.deleteLastFlatBlock();
        }
    });
};

/**
 * Обновить объявления пользователя с логином sLogin и паролем sPassword
 * @param {string} oAccountLoginData.login Логин
 * @param {string} oAccountLoginData.password Пароль
 */
Yourenta.prototype.updateAds = function (oAccountLoginData) {
    var self = this;
    self.authorize(oAccountLoginData).then(function () {
        casper.echo(self.sSiteName + ' ' + oAccountLoginData.login + ' ' + oAccountLoginData.password);
    });
    self.updateLastAds(3);
    casper.then(function () {
        casper.clearCache();
    });

};

exports.Yourenta = Yourenta;

