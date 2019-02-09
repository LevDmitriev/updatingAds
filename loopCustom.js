var casper = require('casper').create({
    // verbose: true,
    // logLevel: "debug",
    exitOnError: false,
    pageSettings: {
        loadImages: true,
    },
    viewportSize: {
        width: 1280,
        height: 768
    },
    waitTimeout: 60000,
    onWaitTimeout: function() {
        casper.echo('Screenshot captured /screenshots/onWaitTimeout.png', 'WARNING');
        this.capture('/screenshots/onWaitTimeout.png');
    },
});

casper.on('error', function() {
    casper.echo('Error on page ' + this.getCurrentUrl(), 'WARNING');
    casper.echo('Screenshot captured /screenshots/onError.png', 'WARNING');
    casper.capture('/screenshots/onError.png');
});
//-----Подключение классов-----
    var Rent = require('/functions/Rent'); // Подключаем класс Rent
    var FreeAdsIn = require('/functions/FreeAdsIn'); // Подключаем класс Rent
    var Move = require('/functions/Move'); // Подключаем класс Rent
    var KakDomaCom = require('/functions/KakDomaCom'); // Подключаем класс KakDomaCom
    var Sutki24Su = require('/functions/Sutki24Su'); // Подключаем класс Sutki24Su
    var Egent = require('/functions/Egent'); // Подключаем класс Egent

//-----Rent.ru-----
var oRent = Rent.Rent({}); // Создаём объект класса Rent

/**
 * Массив с информацией по данным пользователей, у которых нужно поднимать объявления
 * @type {[*]}
 */
var arRentfoLoginData = [
    {login: 'm.m.mmm@mail.ru', password: '444444'},
    {login: 'bartgy@mail.ru', password: '444444'},
    {login: 'mmmmmm-mmmmmm-12@inbox.ru', password: '444444'},
];
//----- Конец Rent.ru-----



//-----FreeAdsIn.ru-----
var oFreeAdsIn = FreeAdsIn.FreeAdsIn({}); // Создаём объект класса Rent

/**
 * Массив с информацией по данным пользователей, у которых нужно поднимать объявления
 * @type {[*]}
 */
var arFreeAdsInLoginData = [
    {login: 'm.m.mmm@mail.ru', password: '444444'},
    {login: 'bartgy@mail.ru', password: '444444'},
];
//----- Конец FreeAdsIn.ru-----

//-----Move.ru-----
var oMove = Move.Move({}); // Создаём объект класса Rent

/**
 * Массив с информацией по данным пользователей, у которых нужно поднимать объявления
 * @type {[*]}
 */
var arMoveLoginData = [
    {login: 'gfdsfdhv@mail.ru', password: 'Zxcvb1234'},
];
//----- Конец Move.ru-----

//-----Kakdoma.com-----
var oKakDomaCom = KakDomaCom.KakDomaCom({}); // Создаём объект класса Rent

/**
 * Массив с информацией по данным пользователей, у которых нужно поднимать объявления
 * @type {[*]}
 */
var arKakDomaComLoginData = [
    {login: '89023739153', password: '444444'},
    {login: '89639187456', password: '444444'},
    {login: '89639187459', password: '444444'},
];
//----- Конец Kakdoma.com-----

//-----Sutki24.su-----
var oSutki24Su = Sutki24Su.Sutki24Su({city: 'tolyatti'}); // Создаём объект класса Rent

/**
 * Массив с информацией по данным пользователей, у которых нужно поднимать объявления
 * @type {[*]}
 */
var arSutki24SuLoginData = [
    {login: 'bartgy@mail.ru ', password: '444444'},
];
//----- Конец Sutki24.su-----

//-----Egent.ru-----
var oEgent = Egent.Egent({}); // Создаём объект класса Egent

/**
 * Массив с информацией по данным пользователей, у которых нужно поднимать объявления
 * @type {[*]}
 */
var arEgentLoginData = [
    {login: 'mmmmmm-mmmmmm-12@inbox.ru', password: '444444'},
];
//----- Конец Egent.ru-----

/**
 * Возвращает разницу между датами в днях
 * @param {*} mDate1Param Параметр из которого будет создан объект первой даты. Или объект Date
 * @param {*} mDate2Param Параметр из которого будет создан объект второй даты. Или объект Date
 * @return {number}
 */
function diffDays (mDate1Param, mDate2Param) {
    var oDate1 = mDate1Param instanceof Date ? new Date(mDate1Param.getTime()) : new Date(mDate1Param);
    var oDate2 = mDate2Param instanceof Date ? new Date(mDate2Param.getTime()) : new Date(mDate2Param);

    oDate1.setHours(0, 0, 0, 0);
    oDate2.setHours(0, 0, 0, 0);
    var timeDiff = Math.abs(oDate2.getTime() - oDate1.getTime());

    return Math.floor(timeDiff / (1000 * 60 * 60 * 24))
}

/**
 * Объект, отвечающий за проверки когда нужно обновлять объявления на каких сайтах
 * @type {object}
 */
var oPeriods = {
    getCurrentDate: function () {
        return new Date();
    },
    RentLastUpdated: new Date(1),
    FreeAdsLastUpdated: new Date(1),
    MoveLastUpdated: new Date(1),
    KakDomaComLastUpdated: new Date(1),
    Sutki24SuLastUpdated: new Date(1),
    EgentLastUpdated: new Date(1),

    isRentReadyToUpdate: function () { // Раз в день в 15.00
        return  diffDays(this.getCurrentDate(),this.RentLastUpdated) >= 1 && this.getCurrentDate().getHours() >= 15
    },
    isFreeAdsReadyToUpdate: function () { // Раз в день в 10.00
        return  diffDays(this.getCurrentDate(),this.FreeAdsLastUpdated) >= 1 && this.getCurrentDate().getHours() >= 10
    },
    isMoveReadyToUpdate: function () { // Раз в день в 12.00
        return  diffDays(this.getCurrentDate(),this.MoveLastUpdated) >= 1 && this.getCurrentDate().getHours() >= 12
    },
    isKakDomaComReadyToUpdate: function () { // Раз в день в 15.00
        return  diffDays(this.getCurrentDate(),this.KakDomaComLastUpdated) >= 1 && this.getCurrentDate().getHours() >= 15
    },
    isSutki24SuReadyToUpdate: function () { // Раз в неделю
        return  diffDays(this.getCurrentDate(),this.Sutki24SuLastUpdated) >= 1 && this.getCurrentDate().getHours() >= 10
    },
    isEgentReadyToUpdate: function () { // Раз в день в 15.00
        return  diffDays(this.getCurrentDate(),this.EgentLastUpdated) >= 1 && this.getCurrentDate().getHours() >= 15
    },
    test: function () {
        return diffDays(this.getCurrentDate(),this.KakDomaComLastUpdated)
    }
};
/**
 * Выводит время обовления сайта
 * @param {string}  sSiteName Навзание сайта
 */
function echoUpdateDate (sSiteName) {
    var oDate = new Date();
    var iYear = oDate.getUTCFullYear();
    var iMonth = oDate.getUTCMonth() +1;
    var iDay = oDate.getDate();
    var iHour = oDate.getHours();
    var iMinutes = oDate.getMinutes();
    var iSeconds = oDate.getSeconds();
    casper.echo(sSiteName +' is updated ' + iDay + '.' + iMonth + '.' + iYear + ' ' + iHour + ':' + iMinutes + ':' + iSeconds, 'GREEN_BAR');
}
/**
 * Проевряет, нужно ли обновить сайты и, если нужно, обновляет их. Запускается с интервалом в час
 */
function loop1PerHour() {
    casper.start();
    if (oPeriods.isRentReadyToUpdate()) {
        arRentfoLoginData.forEach(function(oAccountData) {
            oRent.updateAds(oAccountData.login, oAccountData.password);
        });
        casper.wait(1, function() {
            oPeriods.RentLastUpdated = new Date();
            echoUpdateDate(oRent.sSiteName);
        })
    }

    if (oPeriods.isFreeAdsReadyToUpdate()) {
        arFreeAdsInLoginData.forEach(function (oAccountData) {
            oFreeAdsIn.updateAds(oAccountData.login, oAccountData.password);
        });
        casper.wait(1, function() {
            oPeriods.FreeAdsLastUpdated = new Date();
            echoUpdateDate(oFreeAdsIn.sSiteName);
        })
    }

    if (oPeriods.isMoveReadyToUpdate()) {
        arMoveLoginData.forEach(function (oAccountData) {
            oMove.updateAds(oAccountData.login, oAccountData.password);
        });
        casper.wait(1, function() {
            oPeriods.MoveLastUpdated = new Date();
            echoUpdateDate(oMove.sSiteName);
        })
    }

    if (oPeriods.isKakDomaComReadyToUpdate()) {
        arKakDomaComLoginData.forEach(function (oAccountData) {
            oKakDomaCom.updateAds(oAccountData.login, oAccountData.password);
        });
        casper.wait(1, function() {
            oPeriods.KakDomaComLastUpdated = new Date();
            echoUpdateDate(oKakDomaCom.sSiteName);
        });
    }

    if (oPeriods.isSutki24SuReadyToUpdate()) {
        arSutki24SuLoginData.forEach(function(oAccountData) {
            oSutki24Su.updateAds(oAccountData.login, oAccountData.password);
        });
        casper.wait(1, function() {
            oPeriods.Sutki24SuLastUpdated = new Date();
            echoUpdateDate(oSutki24Su.sSiteName);
        })
    }

    if (oPeriods.isEgentReadyToUpdate()) {
        arEgentLoginData.forEach(function(oAccountData) {
            oEgent.updateAds(oAccountData.login, oAccountData.password);
        });
        casper.wait(1, function() {
            oPeriods.EgentLastUpdated = new Date();
            echoUpdateDate(oEgent.sSiteName);
        })
    }

    casper.wait(1000 * 60 * 60, function() {});
    casper.run(function () {
        loop1PerHour();
    });
}
loop1PerHour();

