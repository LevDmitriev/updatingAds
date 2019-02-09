var require = patchRequire(require);
var utils   = require('utils');

/**
 * Объект-реестр сайтов. Существует в единственном экземпляре
 * @constructor
 */
var SiteRegistry = new function SiteRegistry () {
    var self = this;
    var __instance = this;
    this.pathToSites = '/functions/'
    /** объект-реестр сайтов */
    this.__oRegistry = {};

    /**
     * Функция для получения объекта сайта из реестра
     * @param {string} sSiteName Название сайта
     * @param {Object} oSettings Объект настроек сайта
     * @return {Site}
     */
    this.getSite = function (sSiteName, oSettings) {
        if (!self.__oRegistry[sSiteName]) {
            var Site =  new require(self.pathToSites + sSiteName)[sSiteName];
            var oSite = new Site(oSettings);
            if (Site) {
                self.__oRegistry[sSiteName] = oSite;
            }
        }

        return self.__oRegistry[sSiteName];
    };

    return function () { return __instance; };
};

exports.SiteRegistry = SiteRegistry;