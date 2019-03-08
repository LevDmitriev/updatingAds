/**
 * Модель, содержащая описательную информацию о полях аккаунтов пользователей. Синглтон
 * Используется для конструирования форм.
 * @constructor
 */
let ModelAccountFields = new function ModelAccountFields () {
    let __instance = this;

    /** объект, описывающий поля */
    this.fields = {
        id: {
            name: 'ID в базе данных',
            type: 'hidden',
            siteBind: ['*'], // Привязка к сайтам
        },
        siteName: {
            name: 'Имя сайта, к которому привязан аккаунт',
            type: 'hidden',
            siteBind: ['*'], // Привязка к сайтам
        },
        login: {
            name: 'Логин',
            type: 'text',
            siteBind: ['*'], // Привязка к сайтам
        },
        password: {
            name: 'Пароль',
            type: 'text',
            siteBind: ['*'], // Привязка к сайтам
        },
        userId: {
            name: 'ID пользователя',
            type: 'number',
            siteBind: ['BarahlaNet'], // Привязка к сайтам
        },
        updateType: {
            name: 'Тип обновления',
            type: 'list',
            siteBind: ['*'], // Привязка к сайтам
            multiple: false,
            size: 1,
            value: {
                default: [
                    {id: 0, name: "Конкретное время каждого дня", code: "exactTime"},
                    {id: 1, name: "Интервал", code: "interval"},
                ]
            },

        },
        updateInterval: {
            name: 'Период обновления (сек)',
            type: 'number',
            siteBind: ['*'], // Привязка к сайтам
        },
        city: {
            name: 'Город',
            type: 'list',
            siteBind: ['Sutki24Su'], // Привязка к сайтам
            value: {
                Sutki24Su: [
                    {id: 0, name: "Абакан", code: "abakan"},
                    {id: 1, name: "Адлер", code: "adler"},
                    {id: 2, name: "Актау", code: "aktau"},
                    {id: 3, name: "Актобе", code: "aktobe"},
                    {id: 4, name: "Алма-Ата", code: "almaata"},
                    {id: 5, name: "Алупка", code: "alupka"},
                    {id: 6, name: "Альметьевск", code: "almetevsk"},
                    {id: 7, name: "Анапа", code: "anapa"},
                    {id: 8, name: "Ангарск", code: "angarsk"},
                    {id: 9, name: "Арзамас", code: "arzamas"},
                    {id: 10, name: "Армавир", code: "armavir"},
                    {id: 11, name: "Артем", code: "artem"},
                    {id: 12, name: "Архангельск", code: "arhangelsk"},
                    {id: 13, name: "Астана", code: "astana"},
                    {id: 14, name: "Астрахань", code: "astrahan"},
                    {id: 15, name: "Атырау", code: "atyrau"},
                    {id: 16, name: "Ачинск", code: "achinsk"},
                    {id: 17, name: "Балаково", code: "balakovo"},
                    {id: 18, name: "Балашиха", code: "balashiha"},
                    {id: 19, name: "Банное", code: "bannoe"},
                    {id: 20, name: "Барнаул", code: "barnaul"},
                    {id: 21, name: "Батайск", code: "bataisk"},
                    {id: 22, name: "Белгород", code: "belgorod"},
                    {id: 23, name: "Белорецк", code: "beloretsk"},
                    {id: 24, name: "Березники", code: "berezniki"},
                    {id: 25, name: "Бийск", code: "biisk"},
                    {id: 26, name: "Благовещенск", code: "blagoveschensk"},
                    {id: 27, name: "Братск", code: "bratsk"},
                    {id: 28, name: "Брест", code: "brest"},
                    {id: 29, name: "Брянск", code: "bryansk"},
                    {id: 30, name: "Бузулук", code: "buzuluk"},
                    {id: 31, name: "Великие Луки", code: "luki"},
                    {id: 32, name: "Великий Новгород", code: "vnovgorod"},
                    {id: 33, name: "Верхняя Пышма", code: "verhnyaya"},
                    {id: 34, name: "Видное", code: "vidnoye"},
                    {id: 35, name: "Витебск", code: "vitebsk"},
                    {id: 36, name: "Владивосток", code: "vladivostok"},
                    {id: 37, name: "Владикавказ", code: "vladikavkaz"},
                    {id: 38, name: "Владимир", code: "vladimir"},
                    {id: 39, name: "Волгоград", code: "volgograd"},
                    {id: 40, name: "Волжский", code: "voljskii"},
                    {id: 41, name: "Волковыск", code: "volkovysk"},
                    {id: 42, name: "Вологда", code: "vologda"},
                    {id: 43, name: "Воронеж", code: "voronej"},
                    {id: 44, name: "Воткинск", code: "votkinsk"},
                    {id: 45, name: "Выборг", code: "vyborg"},
                    {id: 46, name: "Гатчина", code: "gatchina"},
                    {id: 47, name: "Геленджик", code: "gelendzhik"},
                    {id: 48, name: "Глазов", code: "glazov"},
                    {id: 49, name: "Голицыно", code: "golitsyno"},
                    {id: 50, name: "Гомель", code: "gomel"},
                    {id: 51, name: "Гродно", code: "grodno"},
                    {id: 52, name: "Грозный", code: "groznyi"},
                    {id: 53, name: "Дербент", code: "derbent"},
                    {id: 54, name: "Дзержинск", code: "dzerjinsk"},
                    {id: 55, name: "Дзержинский", code: "dzerzhinsky"},
                    {id: 56, name: "Димитровград", code: "dimitrovgrad"},
                    {id: 57, name: "Дмитров", code: "dmitrov"},
                    {id: 58, name: "Днепропетровск", code: "dnepropetrovsk"},
                    {id: 59, name: "Долгопрудный", code: "dolgoprudny"},
                    {id: 60, name: "Екатеринбург", code: "ekaterinburg"},
                    {id: 61, name: "Елец", code: "elec"},
                    {id: 62, name: "Ессентуки", code: "essentuki"},
                    {id: 63, name: "Железногорск", code: "jeleznogorsk"},
                    {id: 64, name: "Железнодорожный", code: "jeleznodorojnyi"},
                    {id: 65, name: "Житомир", code: "jitomir"},
                    {id: 66, name: "Жуковский", code: "jukovskii"},
                    {id: 67, name: "Зеленогорск", code: "zelenogorsk"},
                    {id: 68, name: "Зеленоград", code: "zelenograd"},
                    {id: 69, name: "Зеленодольск", code: "zelenodolsk"},
                    {id: 70, name: "Златоуст", code: "zlatoust"},
                    {id: 71, name: "Иваново", code: "ivanovo"},
                    {id: 72, name: "Ивантеевка", code: "ivanteyevka"},
                    {id: 73, name: "Ижевск", code: "ijevsk"},
                    {id: 74, name: "Иркутск", code: "irkutsk"},
                    {id: 75, name: "Истра", code: "istra"},
                    {id: 76, name: "Йошкар-Ола", code: "ioshkarola"},
                    {id: 77, name: "Казань", code: "kazan"},
                    {id: 78, name: "Калининград", code: "kaliningrad"},
                    {id: 79, name: "Калуга", code: "kaluga"},
                    {id: 80, name: "Каменск-Уральский", code: "kamenskuralskii"},
                    {id: 81, name: "Камышин", code: "kamyshin"},
                    {id: 82, name: "Канск", code: "kansk"},
                    {id: 83, name: "Караганда", code: "karaganda"},
                    {id: 84, name: "Каспийск", code: "kaspiisk"},
                    {id: 85, name: "Кемерово", code: "kemerovo"},
                    {id: 86, name: "Керчь", code: "kerch"},
                    {id: 87, name: "Киев", code: "kiev"},
                    {id: 88, name: "Кинель", code: "kinel"},
                    {id: 89, name: "Кинешма", code: "kineshma"},
                    {id: 90, name: "Киров", code: "kirov"},
                    {id: 91, name: "Киселёвск", code: "kiselevsk"},
                    {id: 92, name: "Кисловодск", code: "kislovodsk"},
                    {id: 93, name: "Клин", code: "klin"},
                    {id: 94, name: "Ковров", code: "kovrov"},
                    {id: 95, name: "Когалым", code: "kogalym"},
                    {id: 96, name: "Коломна", code: "kolomna"},
                    {id: 97, name: "Комсомольск-на-Амуре", code: "komsomolsknaamure"},
                    {id: 98, name: "Копейск", code: "kopeisk"},
                    {id: 99, name: "Королёв", code: "korolev"},
                    {id: 100, name: "Кострома", code: "kostroma"},
                    {id: 101, name: "Котлас", code: "kotlas"},
                    {id: 102, name: "Красная Поляна", code: "krasnaya_polyana"},
                    {id: 103, name: "Красногорск", code: "krasnogorsk"},
                    {id: 104, name: "Краснодар", code: "krasnodar"},
                    {id: 105, name: "Краснослободск", code: "krasnoslobodsk"},
                    {id: 106, name: "Красноярск", code: "krasnoyarsk"},
                    {id: 107, name: "Кстово", code: "kstovo"},
                    {id: 108, name: "Курган", code: "kurgan"},
                    {id: 109, name: "Курск", code: "kursk"},
                    {id: 110, name: "Кызыл", code: "kyzyl"},
                    {id: 111, name: "Лазаревское", code: "lazarevskoye"},
                    {id: 112, name: "Лениногорск", code: "leninogorsk"},
                    {id: 113, name: "Ленинск-Кузнецкий", code: "leninskkuzneckii"},
                    {id: 114, name: "Лесосибирск", code: "lesosibirsk"},
                    {id: 115, name: "Липецк", code: "lipeck"},
                    {id: 116, name: "Лобня", code: "lobnya"},
                    {id: 117, name: "Лоо", code: "loo"},
                    {id: 118, name: "Львов", code: "lvov"},
                    {id: 119, name: "Люберцы", code: "lyubercy"},
                    {id: 120, name: "Магадан", code: "magadan"},
                    {id: 121, name: "Магнитогорск", code: "magnitogorsk"},
                    {id: 122, name: "Майкоп", code: "maikop"},
                    {id: 123, name: "Махачкала", code: "mahachkala"},
                    {id: 124, name: "Междуреченск", code: "mejdurechensk"},
                    {id: 125, name: "Мелеуз", code: "meleuz"},
                    {id: 126, name: "Миасс", code: "miass"},
                    {id: 127, name: "Минск", code: "minsk"},
                    {id: 128, name: "Могилёв", code: "mogilev"},
                    {id: 129, name: "Молодечно", code: "molodechno"},
                    {id: 130, name: "Москва", code: "moskva"},
                    {id: 131, name: "Мурманск", code: "murmansk"},
                    {id: 132, name: "Муром", code: "murom"},
                    {id: 133, name: "Мытищи", code: "mytischi"},
                    {id: 134, name: "Набережные Челны", code: "chelny"},
                    {id: 135, name: "Назрань", code: "nazran"},
                    {id: 136, name: "Нальчик", code: "nalchik"},
                    {id: 137, name: "Наро-Фоминск", code: "narofominsk"},
                    {id: 138, name: "Находка", code: "nahodka"},
                    {id: 139, name: "Невинномысск", code: "nevinnomyssk"},
                    {id: 140, name: "Нефтекамск", code: "neftekamsk"},
                    {id: 141, name: "Нефтеюганск", code: "nefteyugansk"},
                    {id: 142, name: "Нижневартовск", code: "nijnevartovsk"},
                    {id: 143, name: "Нижнекамск", code: "nijnekamsk"},
                    {id: 144, name: "Нижний Новгород", code: "nnovgorod"},
                    {id: 145, name: "Нижний Тагил", code: "tagil"},
                    {id: 146, name: "Новокузнецк", code: "novokuzneck"},
                    {id: 147, name: "Новокуйбышевск", code: "novokuibyshevsk"},
                    {id: 148, name: "Новомосковск", code: "novomoskovsk"},
                    {id: 149, name: "Новороссийск", code: "novorossiisk"},
                    {id: 150, name: "Новосибирск", code: "novosibirsk"},
                    {id: 151, name: "Новотроицк", code: "novotroick"},
                    {id: 152, name: "Новочебоксарск", code: "novocheboksarsk"},
                    {id: 153, name: "Новочеркасск", code: "novocherkassk"},
                    {id: 154, name: "Новошахтинск", code: "novoshahtinsk"},
                    {id: 155, name: "Новый Уренгой", code: "urengoi"},
                    {id: 156, name: "Ногинск", code: "noginsk"},
                    {id: 157, name: "Норильск", code: "norilsk"},
                    {id: 158, name: "Ноябрьск", code: "noyabrsk"},
                    {id: 159, name: "Обнинск", code: "obninsk"},
                    {id: 160, name: "Одесса", code: "odessa"},
                    {id: 161, name: "Одинцово", code: "odincovo"},
                    {id: 162, name: "Октябрьский", code: "oktyabrskii"},
                    {id: 163, name: "Омск", code: "omsk"},
                    {id: 164, name: "Оренбург", code: "orenburg"},
                    {id: 165, name: "Орехово-Зуево", code: "orehovozuevo"},
                    {id: 166, name: "Орёл", code: "orel"},
                    {id: 167, name: "Орск", code: "orsk"},
                    {id: 168, name: "Павловск", code: "pavlovsk"},
                    {id: 169, name: "Павлодар", code: "pavlodar"},
                    {id: 170, name: "Пенза", code: "penza"},
                    {id: 171, name: "Первоуральск", code: "pervouralsk"},
                    {id: 172, name: "Переславль-Залесский", code: "pereslavl_zalesskiy"},
                    {id: 173, name: "Пермь", code: "perm"},
                    {id: 174, name: "Петрозаводск", code: "petrozavodsk"},
                    {id: 175, name: "Петропавловск-Камчатский", code: "petropavlovskkamchatskii"},
                    {id: 176, name: "Печоры", code: "pechory"},
                    {id: 177, name: "Подольск", code: "podolsk"},
                    {id: 178, name: "Полярный", code: "polarnyi"},
                    {id: 179, name: "Прокопьевск", code: "prokopevsk"},
                    {id: 180, name: "Псков", code: "pskov"},
                    {id: 181, name: "Пушкин", code: "pushkin"},
                    {id: 182, name: "Пушкино", code: "pushkino"},
                    {id: 183, name: "Пыть-Ях", code: "pytyah"},
                    {id: 184, name: "Пятигорск", code: "pyatigorsk"},
                    {id: 185, name: "Раменское", code: "ramenskoe"},
                    {id: 186, name: "Реутов", code: "reutov"},
                    {id: 187, name: "Ровно", code: "rovno"},
                    {id: 188, name: "Ростов-на Дону", code: "rostov"},
                    {id: 189, name: "Рубзовск", code: "rubzovsk"},
                    {id: 190, name: "Рыбинск", code: "rybinsk"},
                    {id: 191, name: "Рязань", code: "ryazan"},
                    {id: 192, name: "Саки", code: "saki"},
                    {id: 193, name: "Салават", code: "salavat"},
                    {id: 194, name: "Салехард", code: "salehard"},
                    {id: 195, name: "Самара", code: "samara"},
                    {id: 196, name: "Санкт-Петербург", code: "sanktpeterburg"},
                    {id: 197, name: "Саранск", code: "saransk"},
                    {id: 198, name: "Сарапул", code: "sarapul"},
                    {id: 199, name: "Саратов", code: "saratov"},
                    {id: 200, name: "Светлогорск", code: "svetlogorsk"},
                    {id: 201, name: "Севастополь", code: "sevastopol"},
                    {id: 202, name: "Северодвинск", code: "severodvinsk"},
                    {id: 203, name: "Северск", code: "seversk"},
                    {id: 204, name: "Сергиев Посад", code: "posad"},
                    {id: 205, name: "Серов", code: "serov"},
                    {id: 206, name: "Серпухов", code: "serpuhov"},
                    {id: 207, name: "Симферополь", code: "simferopol"},
                    {id: 208, name: "Смоленск", code: "smolensk"},
                    {id: 209, name: "Соликамск", code: "solikamsk"},
                    {id: 210, name: "Сочи", code: "sochi"},
                    {id: 211, name: "Ставрополь", code: "stavropol"},
                    {id: 212, name: "Старый Оскол", code: "oskol"},
                    {id: 213, name: "Стерлитамак", code: "sterlitamak"},
                    {id: 214, name: "Суздаль", code: "suzdal"},
                    {id: 215, name: "Сургут", code: "surgut"},
                    {id: 216, name: "Сызрань", code: "syzran"},
                    {id: 217, name: "Сыктывкар", code: "syktyvkar"},
                    {id: 218, name: "Таганрог", code: "taganrog"},
                    {id: 219, name: "Тамбов", code: "tambov"},
                    {id: 220, name: "Тверь", code: "tver"},
                    {id: 221, name: "Тихвин", code: "tikhvin"},
                    {id: 222, name: "Тобольск", code: "tobolsk"},
                    {id: 223, name: "Тольятти", code: "tolyatti"},
                    {id: 224, name: "Томск", code: "tomsk"},
                    {id: 225, name: "Тула", code: "tula"},
                    {id: 226, name: "Тюмень", code: "tyumen"},
                    {id: 227, name: "Углич", code: "uglich"},
                    {id: 228, name: "Улан-Удэ", code: "ulanude"},
                    {id: 229, name: "Ульяновск", code: "ulyanovsk"},
                    {id: 230, name: "Урай", code: "urai"},
                    {id: 231, name: "Уссурийск", code: "ussuriisk"},
                    {id: 232, name: "Усть-Илимск", code: "ustilimsk"},
                    {id: 233, name: "Усть-Каменогорск", code: "ustkamenogorsk"},
                    {id: 234, name: "Уфа", code: "ufa"},
                    {id: 235, name: "Ухта", code: "uhta"},
                    {id: 236, name: "Фокино", code: "fokino"},
                    {id: 237, name: "Хабаровск", code: "khabarovsk"},
                    {id: 238, name: "Ханты-Мансийск", code: "hmansiysk"},
                    {id: 239, name: "Харьков", code: "harkov"},
                    {id: 240, name: "Хасавюрт", code: "hasavurt"},
                    {id: 241, name: "Херсон", code: "herson"},
                    {id: 242, name: "Химки", code: "himki"},
                    {id: 243, name: "Хоста", code: "hosta"},
                    {id: 244, name: "Худжанд", code: "khujand"},
                    {id: 245, name: "Чебоксары", code: "cheboksary"},
                    {id: 246, name: "Челябинск", code: "chelyabinsk"},
                    {id: 247, name: "Череповец", code: "cherepovec"},
                    {id: 248, name: "Черкесск", code: "cherkessk"},
                    {id: 249, name: "Чита", code: "chita"},
                    {id: 250, name: "Шахты", code: "shahty"},
                    {id: 251, name: "Щёлково", code: "schelkovo"},
                    {id: 252, name: "Электросталь", code: "elektrostal"},
                    {id: 253, name: "Элиста", code: "elista"},
                    {id: 254, name: "Энгельс", code: "engels"},
                    {id: 255, name: "Южно-Сахалинск", code: "yujnosahalinsk"},
                    {id: 256, name: "Якутск", code: "yakutsk"},
                    {id: 257, name: "Ярославль", code: "yaroslavl"},
                ]
            }
        },
        actions: {
            name: 'Действия в аккаунте',
            type: 'list',
            siteBind: ['*'], // Привязка к сайтам
            multiple: true,
            size: 1,
            value: {
                default: [
                    {id: 0, name: "Обновить объявления", code: "updateAds"},
                    {id: 1, name: "Авторизоваться", code: "authorize"},
                ]
            },

        },
    };

    /**
     * Получить значение поля для конкретного сайта
     * @param {String} siteName Имя сайта
     * @param {String} fieldName код поля
     *
     * @return {*} Значение поля
     */
    this.getValue = function (siteName, fieldName) {
        let oResult;
        if (this.fields[fieldName] && this.fields[fieldName].value) {
            if (this.fields[fieldName].value[siteName]) { // Еслти для сайта своё уникальное значение
                oResult =this.fields[fieldName].value[siteName];
            } else {
                oResult =this.fields[fieldName].value.default;
            }
        } else {
            oResult = undefined;
        }

        return oResult;
    };
    /**
     * Получить значение поля по его ID
     * @param {String} siteName Имя сайта
     * @param {String} fieldName код поля
     * @param {Number} id ID поля
     * @return {Object}
     */
    this.getValueById = function (siteName, fieldName, id) {
        return this.getValue(siteName, fieldName).filter(oValue => oValue.id == id)[0] || {};
    };

    /**
     * Проверить, принадлежит ли поле сайту
     * @param {string} siteName Имя сайта
     * @param {string} fieldName Имя поля
     * @return {boolean}
     */
    this.isFieldBindToSite = function(siteName, fieldName) {
        let field = this.fields[fieldName];

        return field.siteBind[0] === '*' || field.siteBind.indexOf(siteName) >= 0
    };

    /** Получть объект, описывающий поля авторизации на сайте по имени сайта
     * @param {String} siteName Имя сайта
     *
     * @return {Object}
     */
    this.getList = function (siteName) {
        let oResult = {};
        for (let fieldName in this.fields) {
            if (this.fields.hasOwnProperty(fieldName)) {
                /** Объект, описывающий поле */
                let field = this.fields[fieldName];
                if (this.isFieldBindToSite(siteName, fieldName)) {// Если поле принадлежит сайту
                    oResult[fieldName] = Object.assign({}, field);
                    oResult[fieldName].value = this.getValue(siteName, fieldName);
                }
            }
        }
        return oResult;
    };

    return function () { return __instance; };
};

ModelAccountFields.prototype.getValueById = function (siteName, fieldName, id) { // Для подхвата IDE
    return this.getValueById(siteName, fieldName, id);
};

ModelAccountFields.prototype.getValue = function (siteName, fieldName) { // Для подхвата IDE
    return this.getValue(siteName, fieldName);
};

ModelAccountFields.prototype.getList = function (siteName) { // Для подхвата IDE
    return this.getList(siteName);
};


module.exports = ModelAccountFields;