var casper = require('casper').create({
    // verbose: true,
    // logLevel: "debug",
    exitOnError:  false,
    pageSettings: {
        loadImages: true,
        clearMemoryCaches: true
    },

    viewportSize:  {
        width:  1280,
        height: 768
    },
    waitTimeout:   10000,
    onWaitTimeout: function () {
        casper.echo('Screenshot captured /screenshots/onWaitTimeout.png', 'WARNING');
        this.capture('/screenshots/onWaitTimeout.png');
    }
});

casper.on('error', function () {
    casper.echo('Error on page ' + this.getCurrentUrl(), 'WARNING');
    casper.echo('Screenshot captured /screenshots/onError.png', 'WARNING');
    casper.capture('/screenshots/onError.png');
});
//-----Подключение классов-----
var SiteRegistry  = require('/functions/SiteRegistry').SiteRegistry; // Подключаем реестр сайтов
var oSiteRegistry = new SiteRegistry;
var arSites       = ['Yourenta',
                     'Askrent',
                     'BarahlaNet',
                     'Privatarenda',
                     'SutochnoRuCom',
                     'Kvartirapoisk',
                     'Rosrealt',
                     'Avizinfo',
                     'Nedr'
                     //'_100Realt'
                     ];
/**
 * Раз в час обновляет объявления на сайтах
 */
function loop1PerHour () {
    casper.start();

    arSites.forEach(function (sSite) {
        oSiteRegistry.getSite(sSite, {}).updateAdsAllAccounts();
    });

    casper.wait(1, function () {
        var oDate    = new Date();
        var iYear    = oDate.getUTCFullYear();
        var iMonth   = oDate.getUTCMonth() + 1;
        var iDay     = oDate.getDate();
        var iHour    = oDate.getHours();
        var iMinutes = oDate.getMinutes();
        var iSeconds = oDate.getSeconds();
        casper.echo('Объявления всех сайтов подняты успешно ' + iDay + '.' + iMonth + '.' + iYear + ' ' + iHour + ':' + iMinutes + ':' + iSeconds, 'GREEN_BAR');
    });
    // casper.wait(1000 * 60 * 60, function () {});
    casper.run(function () {
        // loop1PerHour();
    });
}
loop1PerHour();
setInterval(loop1PerHour, 1000 * 60 * 60)

// loop1PerHour();

