var require = patchRequire(require);
var utils   = require('utils');

/**
 * Модель для работы с данными пользователей сайтов. Существует в единственном экземпляре.
 * @constructor
 */
var ModelUserData = new function () {
    var __instance = this;

    /** объект-реестр аккаунтов сайтов */
    this.__oAccounts = {
        Yourenta: [
            {login: 'bfd6@mail.ru', password: '444444'},
            {login: 'gfdh6@mail.ru', password: '444444'},
            {login: 'vcsdg6@mail.ru', password: '444444'},
        ],
        Askrent: [
            {login: 'm.m.mmm@mail.ru', password: '444444'},
            {login: 'mmmmmm-mmmmmm-12@inbox.ru', password: '444444'},
            {login: 'bartgy@mail.ru', password: '444444'},
        ],
        BarahlaNet: [
            {login: 'm.m.mmm@mail.ru', password: '444444', userId: 1240338},
            {login: 'bartgy@mail.ru', password: '444444', userId: 3711999},
            {login: 'mmmmmm-mmmmmm-12@inbox.ru', password: '444444', userId: 2256709},
        ],
        Privatarenda: [
            {login: 'mmmmmm_mmmmmm_00@mail.ru', password: '444444'},
        ],
        SutochnoRuCom: [
            {login: 'm.m.mmm@mail.ru', password: '444444'},
            {login: 'bartgy@mail.ru', password: '444444'},
            {login: 'mmmmmm-mmmmmm-12@inbox.ru', password: '444444'},
        ],
        Kvartirapoisk: [
            {login: 'm.m.mmm@mail.ru', password: '444444'}
        ],
        Rosrealt: [
            {login: 'm.m.mmm@mail.ru', password: '444444'},
            {login: 'bartgy@mail.ru', password: '444444'},
            {login: 'mmmmmm-mmmmmm-2012@inbox.ru', password: '444444'},
        ],
        Avizinfo: [
            {login: 'm.m.mmm@mail.ru', password: '444444'},
            {login: 'bartgy@mail.ru', password: '444444'},
            {login: 'mmmmmm-mmmmmm-12@inbox.ru', password: '444444'},
        ],
        Nedr: [
            {login: 'm.m.mmm@mail.ru', password: '444444'},
            {login: 'bartgy@mail.ru', password: '444444'},
        ],
        _100Realt: [
            {login: 'm.m.mmm@mail.ru', password: '444444'},
            {login: 'bartgy@mail.ru', password: '444444'},
            {login: 'mmmmmm-mmmmmm-12@inbox.ru', password: '444444'}
        ]
        // SutochnoRuCom: [
        //     {login: 'gfd512@mail.ru', password: '444444'},
        //     {login: 'g43g12@mail.ru', password: '444444'},
        //     {login: 'fgdfd6@mail.ru', password: '444444'},
        // ]
    };

    /**
     * Получить аккаунты сайта по его названию
     * @param sSiteName
     * @return {*|Array}
     */
    this.getAccountsInfo = function (sSiteName) {
        return this.__oAccounts[sSiteName] || [];
    };

    return function () { return __instance; };
};


exports.ModelUserData = ModelUserData;