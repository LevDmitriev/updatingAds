var require = patchRequire(require);
var utils   = require('utils');
var ModelUserData  = require('/functions/ModelUserData').ModelUserData;


function Site(oSettings) {
    this.sSiteName = oSettings.sSiteName;
    /**
     *  URL главной страницы
     * @type {string}
     */
    this.sMainPageURL = oSettings.sMainPageURL;
    this.sUnauthPageURL = oSettings.sUnauthPageURL;
    /**
     * URL страницы с объявлениями пользователя
     * @type {string}
     */
    this.sAdsPageURL = oSettings.sAdsPageURL;

};

/** Войти в личный кабинет. Все наследники должны переопределить значение. */
Site.prototype.authorize = function (oAccountLoginData) {
    this.authorize(oAccountLoginData);
};

/** Выйти из личного кабинета. В случае необходимости, переопределить в наследниках. */
Site.prototype.unAuthorize = function () {
    var self = this;
    casper.thenOpen(self.sUnauthPageURL, function () {
        casper.echo( self.sSiteName + ' выход из кабинета прошёл успешно', 'INFO')
    })
};

/**
 * Перейти к странице с объявлениями пользователя. В случае необходимости - переопределить.
 * @param {Function} [callback] Функция, которая будет вызвана после перехода на страницу объявлений
 */
Site.prototype.toAdsPage = function (callback) {
    var self = this;
    casper.thenOpen(self.sAdsPageURL, function () {
        casper.waitForUrl(self.sAdsPageURL.replace(/.*www/, 'www'), function () {
            if (callback) {
                callback();
            }
        })

    });
};
/**
 * Перейти на главную старницу
 * @param {Function} callback Функция, которая будет вызвана после перехода на главную страницу
 */
Site.prototype.toMainPage = function (callback) {
    var self = this;
    casper.thenOpen(self.sMainPageURL, function () {
        if (callback) {
            callback();
        }
    });
};

/** Обновить все объявления на всех аккаунтах */
Site.prototype.updateAdsAllAccounts = function () {
    var self = this;
    var arAllAccountsLoginData = self.getAllAccountsLoginData();
    arAllAccountsLoginData.forEach(function (oAccountLoginData) {
        self.updateAds(oAccountLoginData)
    });
    casper.wait(1, function () {
        casper.echo(self.sSiteName + ' все объявления подняты ' + self.getCurDate(), 'GREEN_BAR');
    });
};

/** Войти во все аккаунты поочерёдно */
Site.prototype.authAllAccounts = function () {
    var self = this;
    var arAllAccountsLoginData = self.getAllAccountsLoginData();
    arAllAccountsLoginData.forEach(function (oAccountLoginData) {
        self.authorize(oAccountLoginData);
        self.unAuthorize();
    });
    casper.wait(1, function () {
        casper.echo(self.sSiteName + ' все личные кабинеты посещены ' + self.getCurDate(), 'GREEN_BAR');
    });
};
/** Получить строку с текущей датой */
Site.prototype.getCurDate = function () {
    var oDate = new Date();
    var iYear = oDate.getUTCFullYear();
    var iMonth = oDate.getUTCMonth() +1;
    var iDay = oDate.getDate();
    var iHour = oDate.getHours();
    var iMinutes = oDate.getMinutes();
    var iSeconds = oDate.getSeconds();
    return iDay + '.' + iMonth + '.' + iYear + ' ' + iHour + ':' + iMinutes + ':' + iSeconds;
};

/**
 * Получить все аккаунты для сайта
 * @return {*}
 */
Site.prototype.getAllAccountsLoginData = function () {
    return (new ModelUserData).getAccountsInfo(this.sSiteName);
};


exports.Site = Site;