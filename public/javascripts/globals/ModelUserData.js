/**
 *  Объект-посредник ModelUserData для обращения к таблице с аккаунтами пользователей с фронта.
 *  Реализует шаблон Заместитель (Proxy) для доступа к объекту ModelUserData
 *
 *  @see classes/model/ModelUserData.js
 */
window.ModelUserData = new function () {
    /**
     * Путь, по которому нужно направлять ajax запросы
     * @type {string}
     * @private
     */
    let __ajaxPath = '/ModelUserData';
    /**
     * Приватное свойство для отправки ajax запросов, чтобы получить результат
     * @param {Object} oData
     * @private
     */
    let __sendAjax = function (oData) {
        let result = null;
        $.ajax({
            url:     __ajaxPath,// URL, куда отправлять запрос
            data:    oData,
            type:    'POST',
            async:   false,
            success: response => result = JSON.parse(response),
            error:   error => console.log(error)
        });

        return result;
    };
    // Отпраляем запрос на получение массива со всеми именами функций объекта замещения
    $.ajax({
        url:      __ajaxPath,
        data:     [{name: 'getFunctionNames', value: 'Y'}],
        type:     'POST',
        dataType: 'json',
        async:   false,
        success:  arFunctionsNames => {
            // Устанавливаем все функции,  по именам объекта замещения
            arFunctionsNames.forEach(sFunctionName => {
                this[sFunctionName] = function () {
                    let oData = [
                        {name: 'method', value: sFunctionName},
                        {name: 'arguments', value: JSON.stringify(Array.from(arguments))}
                    ];
                    return __sendAjax(oData);
                }
            })
        }
    });

};