/**
 * Фабрика по созданию объектов замещения на фронте.
 */
window.ProxyFabric = new function ProxyFabric() {

    /**
     * Создать объект-заместитель
     * @param {string} sClassName Имя класса с указаниме пространства имён от папки classes
     * @param {Boolean} [bUseCache = true] Нужно ли использовать кеш
     * @example createProxy('Model/ModelUserData')
     *
     * @return {Function}
     */
    this.createProxy = function(sClassName, bUseCache = true) {
        let cache = {};
        return new function () {
            /**
             * Путь, по которому нужно направлять ajax запросы
             * @type {string}
             * @private
             */
            let __ajaxPath = '/Proxy';
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
                data:     [
                    {name: 'class', value: sClassName},
                    {name: 'getFunctionNames', value: 'Y'}
                    ],
                type:     'POST',
                dataType: 'json',
                async:   false,
                success:  arFunctionsNames => {
                    // Устанавливаем все функции,  по именам объекта замещения
                    arFunctionsNames.forEach(sFunctionName => {
                        this[sFunctionName] = function () {
                            let result;
                            let jsonArguments = JSON.stringify(Array.from(arguments));
                            if (bUseCache) { // Если можно использовать кеш
                                let cachKey = `${sClassName}.${sFunctionName}(${jsonArguments})`;
                                if (cache[cachKey]) { // Если есть в кеше
                                    result = cache[cachKey];
                                } else {
                                    let oData = [
                                        {name: 'class', value: sClassName},
                                        {name: 'method', value: sFunctionName},
                                        {name: 'arguments', value: jsonArguments}
                                    ];
                                    result = __sendAjax(oData);
                                    cache[cachKey] = result;
                                }
                            } else {
                                let oData = [
                                    {name: 'class', value: sClassName},
                                    {name: 'method', value: sFunctionName},
                                    {name: 'arguments', value: jsonArguments}
                                ];
                                result = __sendAjax(oData);
                            }
                            return result;
                        }
                    })
                }
            });
        };
    };

};