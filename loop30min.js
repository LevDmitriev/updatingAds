var utils   = require('utils');

var casper = require('casper').create({
    // verbose: true,
    // logLevel: "debug",
    exitOnError: false,
    pageSettings: {
        loadImages: true,
        clearMemoryCaches: true
    },

    viewportSize: {
        width: 1280,
        height: 768
    },
    waitTimeout: 10000,
    onWaitTimeout: function() {
        casper.echo('Screenshot captured /screenshots/onWaitTimeout.png', 'WARNING');
        casper.capture('/screenshots/onWaitTimeout.png');
    },
});

casper.on('error', function() {
    casper.echo('Error on page ' + this.getCurrentUrl(), 'WARNING');
    casper.echo('Screenshot captured /screenshots/onError.png', 'WARNING');
    casper.capture('/screenshots/onError.png');
});
var SiteRegistry = require('/functions/SiteRegistry').SiteRegistry; // Подключаем реестр сайтов
var oSiteRegistry = new SiteRegistry;
var arSites = ['Askrent'];
/**
 * Раз в пол-часа обновляет объявления на сайтах
 */
function loop30min() {
    casper.start();

    arSites.forEach(function (sSite) {
        oSiteRegistry.getSite(sSite, {}).authAllAccounts();
    });

    casper.wait(1000 * 60 * 30, function() {});
    casper.run(function () {
        loop30min();
    })
}
loop30min();

