/**
 *  Объект-посредник ModelUserData для обращения к таблице с аккаунтами пользователей с фронта.
 */
window.ModelUserData = new function () {
    this.ajaxPath = '/ModelUserData';
    /**
     * Отправить ajax запрос с данными
     * @param {Object} oData Объект с данными
     */
    this.sendAjax = function (oData) {
        let result = null;
        $.ajax({
            url:     this.ajaxPath,// URL, куда отправлять запрос
            data:    oData,
            type:     'POST',
            async: false,
            success: response => result = JSON.parse(response),
            error:   error => console.log(error)
        });

        return result;
    };

    this.addAccount = function (newAccount) {
        let oData = [
            {name: 'method', value: 'addAccount'},
            {name: 'arguments', value: JSON.stringify([newAccount])},
        ];
        return this.sendAjax(oData);
    };

    this.updateAccount = function(id, oNewValues) {
        let oData = [
            {name: 'method', value: 'updateAccount'},
            {name: 'arguments', value: JSON.stringify([id, oNewValues])},
        ];
        return this.sendAjax(oData);
    };

    this.deleteAccount = function (id) {
        let oData = [
            {name: 'method', value: 'deleteAccount'},
            {name: 'arguments', value: JSON.stringify([id])},
        ];
        return this.sendAjax(oData);
    };

    this.getAccountById = function (id) {
        let oData = [
            {name: 'method', value: 'getAccountById'},
            {name: 'arguments', value: JSON.stringify([id])},
        ];
        return this.sendAjax(oData);
    };

    /**
     * Получить массив аккаунтов
     * @return {Array}
     */
    this.getAccounts = function() {
        let oData = [
            {name: 'method', value: 'getAccounts'},
        ];
        return this.sendAjax(oData);

    }

};