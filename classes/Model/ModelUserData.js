let fs                                  = require('fs');
/**
 *
 * @type {ModelAccountFields}
 */
let ModelAccountFields = new (require('./ModelAccountFields'));
/**
 * Модель для работы с данными пользователей сайтов. Синглтон.
 * @constructor
 */
let ModelUserData                       = new function ModelUserData () {
    let __instance      = this;
    this.pathToAccounts = './database/accounts.json';
    /** Массив со всеми аккаунтами
     * @type {Array}
     */
    this.__oAccounts = [];
    if (fs.existsSync(this.pathToAccounts)) { // Если есть файл с аккаунтами
        this.__oAccounts = JSON.parse(fs.readFileSync(this.pathToAccounts, 'utf8'));
        // присваиваем значения по умолчанию всем полям аккаунтов, если не заданы
        this.__oAccounts.map(function (oAccount) {
            /**
             * Объект со всеми полями аккаунта для сайта
             */
            let oSiteFields = ModelAccountFields.getList(oAccount.siteName);
            for (let sFieldName in oSiteFields) {
                if (oSiteFields.hasOwnProperty(sFieldName) && !oAccount[sFieldName]) {
                    switch(oSiteFields[sFieldName].jsType) {
                        case Array:
                            oAccount[sFieldName] = [];
                            break;
                        case Number:
                            oAccount[sFieldName] = 0;
                            break;
                        default:
                            oAccount[sFieldName] = '';
                            break
                    }
                }
            }
        });
    }

    /**
     * Поулчить все аккаунты
     * @return {Array}
     */
    this.getAccounts = function () {
        return this.__oAccounts;
    };
    /**
     * Получить аккаунты сайта по его названию
     * @param {String} siteName Имя сайта
     * @return {Array}
     */
    this.getAccountsBySiteName = function (siteName) {
        return this.__oAccounts.filter(function (oAccount) {
            return oAccount.siteName === siteName;
        });
    };
    /**
     * Обновить аккаунт
     * @param {Number | String} id ID в базе данных
     * @param {Object | String} oUpdateFields объект с полями, которые нужно обновить
     *
     * @return {boolean} Успешно ли обновлён аккаунт
     */
    this.updateAccount = function (id, oUpdateFields) {
        if (typeof oUpdateFields === 'string') {
            oUpdateFields = JSON.parse(oUpdateFields);
        }
        id = parseInt(id);
        /**
         * Успешно ли прошло обновление
         * @type {boolean}
         */
        let isSuccess = false;
        if (fs.existsSync(this.pathToAccounts)) { // Если есть файл с аккаунтами
            this.__oAccounts.map(function (oAccount) {
                if (oAccount.id === id) { // Если нашли аккаунт с нужным ID
                    isSuccess = true;
                    for (let fieldName in oUpdateFields) { // Обновляем все свойства
                        if (oUpdateFields.hasOwnProperty(fieldName)) {
                            oAccount[fieldName] = oUpdateFields[fieldName];
                        }
                    }
                }
            });
            fs.writeFileSync(this.pathToAccounts, JSON.stringify(this.__oAccounts), {encoding: 'utf-8'});
        }

        return isSuccess;
    };

    /**
     * Добавить аккаунт
     * @param {Object} newAccount Объект нового аккаунта.
     * @see /database/accounts.json
     *
     * @return {Object} Новый аккаунт
     */
    this.addAccount = function (newAccount) {
        if (typeof newAccount === 'string') {
            newAccount = JSON.parse(newAccount);
        }
        newAccount.id = 1; // По умолчанию ID равен 1. В процессе переопределим

        if (fs.existsSync(this.pathToAccounts)) { // Если есть файл с аккаунтами
            if (this.__oAccounts.length) {
                newAccount.id = this.__oAccounts[this.__oAccounts.length - 1].id + 1;
            }
            this.__oAccounts.push(newAccount);
            fs.writeFileSync(this.pathToAccounts, JSON.stringify(this.__oAccounts), {encoding: 'utf-8'});
        } else { // Если нет файла с аккаунтами - создаём и записываем
            this.__oAccounts.push(newAccount);
            fs.appendFileSync(this.pathToAccounts, JSON.stringify(this.__oAccounts));
        }

        return newAccount;
    };

    /** Получить аккаунт по его ID
     * @return {Object} Аккаунт
     */
    this.getAccountById = function (id) {
        return this.__oAccounts.filter(account => account.id === parseInt(id))[0];
    };

    /**
     * Удалить аккаунт
     * @param {Number} id ID аккаунта
     *
     * @return {Number} ID удалённого аккаунта или 0
     */
    this.deleteAccount = function (id) {
        let deletedAccountId = 0;
        if (fs.existsSync(this.pathToAccounts)) { // Если есть файл с аккаунтами
            let account = this.getAccountById(id);
            let deletedAccount = this.__oAccounts.splice(this.__oAccounts.indexOf(account), 1)[0];
            deletedAccountId = deletedAccount.id;
            fs.writeFileSync(this.pathToAccounts, JSON.stringify(this.__oAccounts), {encoding: 'utf-8'});
        }

        return deletedAccountId;
    };

    return function () { return __instance; };
};
ModelUserData.prototype.getAccountsBySiteName = function (siteName) { // Для подхвата IDE
    return this.getAccountsBySiteName(siteName);
};

ModelUserData.prototype.getAccountById = function (id) { // Для подхвата IDE
    return this.getAccountById(id);
};

ModelUserData.prototype.deleteAccount = function (id) { // Для подхвата IDE
    return this.deleteAccount(id);
};

ModelUserData.prototype.addAccount = function (newAccount) { // Для подхвата IDE
    return this.addAccount(newAccount);
};

ModelUserData.prototype.updateAccount = function (id, oUpdateFields) { // Для подхвата IDE
    return this.updateAccount(id, oUpdateFields);
};
ModelUserData.prototype.getAccounts = function () { // Для подхвата IDE
    return this.getAccounts();
};

module.exports = ModelUserData;