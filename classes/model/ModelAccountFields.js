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
                Sutki24Su: {
                    0: {id: 0, name: "Абакан", code: "abakan"},
                    1: {id: 1, name: "Адлер", code: "adler"},
                    2: {id: 2, name: "Актау", code: "aktau"},
                    3: {id: 3, name: "Актобе", code: "aktobe"},
                    4: {id: 4, name: "Алма-Ата", code: "almaata"},
                    5: {id: 5, name: "Алупка", code: "alupka"},
                    6: {id: 6, name: "Альметьевск", code: "almetevsk"},
                    7: {id: 7, name: "Анапа", code: "anapa"},
                    8: {id: 8, name: "Ангарск", code: "angarsk"},
                    9: {id: 9, name: "Арзамас", code: "arzamas"},
                    10: {id: 10, name: "Армавир", code: "armavir"},
                    11: {id: 11, name: "Артем", code: "artem"},
                    12: {id: 12, name: "Архангельск", code: "arhangelsk"},
                    13: {id: 13, name: "Астана", code: "astana"},
                    14: {id: 14, name: "Астрахань", code: "astrahan"},
                    15: {id: 15, name: "Атырау", code: "atyrau"},
                    16: {id: 16, name: "Ачинск", code: "achinsk"},
                    17: {id: 17, name: "Балаково", code: "balakovo"},
                    18: {id: 18, name: "Балашиха", code: "balashiha"},
                    19: {id: 19, name: "Банное", code: "bannoe"},
                    20: {id: 20, name: "Барнаул", code: "barnaul"},
                    21: {id: 21, name: "Батайск", code: "bataisk"},
                    22: {id: 22, name: "Белгород", code: "belgorod"},
                    23: {id: 23, name: "Белорецк", code: "beloretsk"},
                    24: {id: 24, name: "Березники", code: "berezniki"},
                    25: {id: 25, name: "Бийск", code: "biisk"},
                    26: {id: 26, name: "Благовещенск", code: "blagoveschensk"},
                    27: {id: 27, name: "Братск", code: "bratsk"},
                    28: {id: 28, name: "Брест", code: "brest"},
                    29: {id: 29, name: "Брянск", code: "bryansk"},
                    30: {id: 30, name: "Бузулук", code: "buzuluk"},
                    31: {id: 31, name: "Великие Луки", code: "luki"},
                    32: {id: 32, name: "Великий Новгород", code: "vnovgorod"},
                    33: {id: 33, name: "Верхняя Пышма", code: "verhnyaya"},
                    34: {id: 34, name: "Видное", code: "vidnoye"},
                    35: {id: 35, name: "Витебск", code: "vitebsk"},
                    36: {id: 36, name: "Владивосток", code: "vladivostok"},
                    37: {id: 37, name: "Владикавказ", code: "vladikavkaz"},
                    38: {id: 38, name: "Владимир", code: "vladimir"},
                    39: {id: 39, name: "Волгоград", code: "volgograd"},
                    40: {id: 40, name: "Волжский", code: "voljskii"},
                    41: {id: 41, name: "Волковыск", code: "volkovysk"},
                    42: {id: 42, name: "Вологда", code: "vologda"},
                    43: {id: 43, name: "Воронеж", code: "voronej"},
                    44: {id: 44, name: "Воткинск", code: "votkinsk"},
                    45: {id: 45, name: "Выборг", code: "vyborg"},
                    46: {id: 46, name: "Гатчина", code: "gatchina"},
                    47: {id: 47, name: "Геленджик", code: "gelendzhik"},
                    48: {id: 48, name: "Глазов", code: "glazov"},
                    49: {id: 49, name: "Голицыно", code: "golitsyno"},
                    50: {id: 50, name: "Гомель", code: "gomel"},
                    51: {id: 51, name: "Гродно", code: "grodno"},
                    52: {id: 52, name: "Грозный", code: "groznyi"},
                    53: {id: 53, name: "Дербент", code: "derbent"},
                    54: {id: 54, name: "Дзержинск", code: "dzerjinsk"},
                    55: {id: 55, name: "Дзержинский", code: "dzerzhinsky"},
                    56: {id: 56, name: "Димитровград", code: "dimitrovgrad"},
                    57: {id: 57, name: "Дмитров", code: "dmitrov"},
                    58: {id: 58, name: "Днепропетровск", code: "dnepropetrovsk"},
                    59: {id: 59, name: "Долгопрудный", code: "dolgoprudny"},
                    60: {id: 60, name: "Екатеринбург", code: "ekaterinburg"},
                    61: {id: 61, name: "Елец", code: "elec"},
                    62: {id: 62, name: "Ессентуки", code: "essentuki"},
                    63: {id: 63, name: "Железногорск", code: "jeleznogorsk"},
                    64: {id: 64, name: "Железнодорожный", code: "jeleznodorojnyi"},
                    65: {id: 65, name: "Житомир", code: "jitomir"},
                    66: {id: 66, name: "Жуковский", code: "jukovskii"},
                    67: {id: 67, name: "Зеленогорск", code: "zelenogorsk"},
                    68: {id: 68, name: "Зеленоград", code: "zelenograd"},
                    69: {id: 69, name: "Зеленодольск", code: "zelenodolsk"},
                    70: {id: 70, name: "Златоуст", code: "zlatoust"},
                    71: {id: 71, name: "Иваново", code: "ivanovo"},
                    72: {id: 72, name: "Ивантеевка", code: "ivanteyevka"},
                    73: {id: 73, name: "Ижевск", code: "ijevsk"},
                    74: {id: 74, name: "Иркутск", code: "irkutsk"},
                    75: {id: 75, name: "Истра", code: "istra"},
                    76: {id: 76, name: "Йошкар-Ола", code: "ioshkarola"},
                    77: {id: 77, name: "Казань", code: "kazan"},
                    78: {id: 78, name: "Калининград", code: "kaliningrad"},
                    79: {id: 79, name: "Калуга", code: "kaluga"},
                    80: {id: 80, name: "Каменск-Уральский", code: "kamenskuralskii"},
                    81: {id: 81, name: "Камышин", code: "kamyshin"},
                    82: {id: 82, name: "Канск", code: "kansk"},
                    83: {id: 83, name: "Караганда", code: "karaganda"},
                    84: {id: 84, name: "Каспийск", code: "kaspiisk"},
                    85: {id: 85, name: "Кемерово", code: "kemerovo"},
                    86: {id: 86, name: "Керчь", code: "kerch"},
                    87: {id: 87, name: "Киев", code: "kiev"},
                    88: {id: 88, name: "Кинель", code: "kinel"},
                    89: {id: 89, name: "Кинешма", code: "kineshma"},
                    90: {id: 90, name: "Киров", code: "kirov"},
                    91: {id: 91, name: "Киселёвск", code: "kiselevsk"},
                    92: {id: 92, name: "Кисловодск", code: "kislovodsk"},
                    93: {id: 93, name: "Клин", code: "klin"},
                    94: {id: 94, name: "Ковров", code: "kovrov"},
                    95: {id: 95, name: "Когалым", code: "kogalym"},
                    96: {id: 96, name: "Коломна", code: "kolomna"},
                    97: {id: 97, name: "Комсомольск-на-Амуре", code: "komsomolsknaamure"},
                    98: {id: 98, name: "Копейск", code: "kopeisk"},
                    99: {id: 99, name: "Королёв", code: "korolev"},
                    100: {id: 100, name: "Кострома", code: "kostroma"},
                    101: {id: 101, name: "Котлас", code: "kotlas"},
                    102: {id: 102, name: "Красная Поляна", code: "krasnaya_polyana"},
                    103: {id: 103, name: "Красногорск", code: "krasnogorsk"},
                    104: {id: 104, name: "Краснодар", code: "krasnodar"},
                    105: {id: 105, name: "Краснослободск", code: "krasnoslobodsk"},
                    106: {id: 106, name: "Красноярск", code: "krasnoyarsk"},
                    107: {id: 107, name: "Кстово", code: "kstovo"},
                    108: {id: 108, name: "Курган", code: "kurgan"},
                    109: {id: 109, name: "Курск", code: "kursk"},
                    110: {id: 110, name: "Кызыл", code: "kyzyl"},
                    111: {id: 111, name: "Лазаревское", code: "lazarevskoye"},
                    112: {id: 112, name: "Лениногорск", code: "leninogorsk"},
                    113: {id: 113, name: "Ленинск-Кузнецкий", code: "leninskkuzneckii"},
                    114: {id: 114, name: "Лесосибирск", code: "lesosibirsk"},
                    115: {id: 115, name: "Липецк", code: "lipeck"},
                    116: {id: 116, name: "Лобня", code: "lobnya"},
                    117: {id: 117, name: "Лоо", code: "loo"},
                    118: {id: 118, name: "Львов", code: "lvov"},
                    119: {id: 119, name: "Люберцы", code: "lyubercy"},
                    120: {id: 120, name: "Магадан", code: "magadan"},
                    121: {id: 121, name: "Магнитогорск", code: "magnitogorsk"},
                    122: {id: 122, name: "Майкоп", code: "maikop"},
                    123: {id: 123, name: "Махачкала", code: "mahachkala"},
                    124: {id: 124, name: "Междуреченск", code: "mejdurechensk"},
                    125: {id: 125, name: "Мелеуз", code: "meleuz"},
                    126: {id: 126, name: "Миасс", code: "miass"},
                    127: {id: 127, name: "Минск", code: "minsk"},
                    128: {id: 128, name: "Могилёв", code: "mogilev"},
                    129: {id: 129, name: "Молодечно", code: "molodechno"},
                    130: {id: 130, name: "Москва", code: "moskva"},
                    131: {id: 131, name: "Мурманск", code: "murmansk"},
                    132: {id: 132, name: "Муром", code: "murom"},
                    133: {id: 133, name: "Мытищи", code: "mytischi"},
                    134: {id: 134, name: "Набережные Челны", code: "chelny"},
                    135: {id: 135, name: "Назрань", code: "nazran"},
                    136: {id: 136, name: "Нальчик", code: "nalchik"},
                    137: {id: 137, name: "Наро-Фоминск", code: "narofominsk"},
                    138: {id: 138, name: "Находка", code: "nahodka"},
                    139: {id: 139, name: "Невинномысск", code: "nevinnomyssk"},
                    140: {id: 140, name: "Нефтекамск", code: "neftekamsk"},
                    141: {id: 141, name: "Нефтеюганск", code: "nefteyugansk"},
                    142: {id: 142, name: "Нижневартовск", code: "nijnevartovsk"},
                    143: {id: 143, name: "Нижнекамск", code: "nijnekamsk"},
                    144: {id: 144, name: "Нижний Новгород", code: "nnovgorod"},
                    145: {id: 145, name: "Нижний Тагил", code: "tagil"},
                    146: {id: 146, name: "Новокузнецк", code: "novokuzneck"},
                    147: {id: 147, name: "Новокуйбышевск", code: "novokuibyshevsk"},
                    148: {id: 148, name: "Новомосковск", code: "novomoskovsk"},
                    149: {id: 149, name: "Новороссийск", code: "novorossiisk"},
                    150: {id: 150, name: "Новосибирск", code: "novosibirsk"},
                    151: {id: 151, name: "Новотроицк", code: "novotroick"},
                    152: {id: 152, name: "Новочебоксарск", code: "novocheboksarsk"},
                    153: {id: 153, name: "Новочеркасск", code: "novocherkassk"},
                    154: {id: 154, name: "Новошахтинск", code: "novoshahtinsk"},
                    155: {id: 155, name: "Новый Уренгой", code: "urengoi"},
                    156: {id: 156, name: "Ногинск", code: "noginsk"},
                    157: {id: 157, name: "Норильск", code: "norilsk"},
                    158: {id: 158, name: "Ноябрьск", code: "noyabrsk"},
                    159: {id: 159, name: "Обнинск", code: "obninsk"},
                    160: {id: 160, name: "Одесса", code: "odessa"},
                    161: {id: 161, name: "Одинцово", code: "odincovo"},
                    162: {id: 162, name: "Октябрьский", code: "oktyabrskii"},
                    163: {id: 163, name: "Омск", code: "omsk"},
                    164: {id: 164, name: "Оренбург", code: "orenburg"},
                    165: {id: 165, name: "Орехово-Зуево", code: "orehovozuevo"},
                    166: {id: 166, name: "Орёл", code: "orel"},
                    167: {id: 167, name: "Орск", code: "orsk"},
                    168: {id: 168, name: "Павловск", code: "pavlovsk"},
                    169: {id: 169, name: "Павлодар", code: "pavlodar"},
                    170: {id: 170, name: "Пенза", code: "penza"},
                    171: {id: 171, name: "Первоуральск", code: "pervouralsk"},
                    172: {id: 172, name: "Переславль-Залесский", code: "pereslavl_zalesskiy"},
                    173: {id: 173, name: "Пермь", code: "perm"},
                    174: {id: 174, name: "Петрозаводск", code: "petrozavodsk"},
                    175: {id: 175, name: "Петропавловск-Камчатский", code: "petropavlovskkamchatskii"},
                    176: {id: 176, name: "Печоры", code: "pechory"},
                    177: {id: 177, name: "Подольск", code: "podolsk"},
                    178: {id: 178, name: "Полярный", code: "polarnyi"},
                    179: {id: 179, name: "Прокопьевск", code: "prokopevsk"},
                    180: {id: 180, name: "Псков", code: "pskov"},
                    181: {id: 181, name: "Пушкин", code: "pushkin"},
                    182: {id: 182, name: "Пушкино", code: "pushkino"},
                    183: {id: 183, name: "Пыть-Ях", code: "pytyah"},
                    184: {id: 184, name: "Пятигорск", code: "pyatigorsk"},
                    185: {id: 185, name: "Раменское", code: "ramenskoe"},
                    186: {id: 186, name: "Реутов", code: "reutov"},
                    187: {id: 187, name: "Ровно", code: "rovno"},
                    188: {id: 188, name: "Ростов-на Дону", code: "rostov"},
                    189: {id: 189, name: "Рубзовск", code: "rubzovsk"},
                    190: {id: 190, name: "Рыбинск", code: "rybinsk"},
                    191: {id: 191, name: "Рязань", code: "ryazan"},
                    192: {id: 192, name: "Саки", code: "saki"},
                    193: {id: 193, name: "Салават", code: "salavat"},
                    194: {id: 194, name: "Салехард", code: "salehard"},
                    195: {id: 195, name: "Самара", code: "samara"},
                    196: {id: 196, name: "Санкт-Петербург", code: "sanktpeterburg"},
                    197: {id: 197, name: "Саранск", code: "saransk"},
                    198: {id: 198, name: "Сарапул", code: "sarapul"},
                    199: {id: 199, name: "Саратов", code: "saratov"},
                    200: {id: 200, name: "Светлогорск", code: "svetlogorsk"},
                    201: {id: 201, name: "Севастополь", code: "sevastopol"},
                    202: {id: 202, name: "Северодвинск", code: "severodvinsk"},
                    203: {id: 203, name: "Северск", code: "seversk"},
                    204: {id: 204, name: "Сергиев Посад", code: "posad"},
                    205: {id: 205, name: "Серов", code: "serov"},
                    206: {id: 206, name: "Серпухов", code: "serpuhov"},
                    207: {id: 207, name: "Симферополь", code: "simferopol"},
                    208: {id: 208, name: "Смоленск", code: "smolensk"},
                    209: {id: 209, name: "Соликамск", code: "solikamsk"},
                    210: {id: 210, name: "Сочи", code: "sochi"},
                    211: {id: 211, name: "Ставрополь", code: "stavropol"},
                    212: {id: 212, name: "Старый Оскол", code: "oskol"},
                    213: {id: 213, name: "Стерлитамак", code: "sterlitamak"},
                    214: {id: 214, name: "Суздаль", code: "suzdal"},
                    215: {id: 215, name: "Сургут", code: "surgut"},
                    216: {id: 216, name: "Сызрань", code: "syzran"},
                    217: {id: 217, name: "Сыктывкар", code: "syktyvkar"},
                    218: {id: 218, name: "Таганрог", code: "taganrog"},
                    219: {id: 219, name: "Тамбов", code: "tambov"},
                    220: {id: 220, name: "Тверь", code: "tver"},
                    221: {id: 221, name: "Тихвин", code: "tikhvin"},
                    222: {id: 222, name: "Тобольск", code: "tobolsk"},
                    223: {id: 223, name: "Тольятти", code: "tolyatti"},
                    224: {id: 224, name: "Томск", code: "tomsk"},
                    225: {id: 225, name: "Тула", code: "tula"},
                    226: {id: 226, name: "Тюмень", code: "tyumen"},
                    227: {id: 227, name: "Углич", code: "uglich"},
                    228: {id: 228, name: "Улан-Удэ", code: "ulanude"},
                    229: {id: 229, name: "Ульяновск", code: "ulyanovsk"},
                    230: {id: 230, name: "Урай", code: "urai"},
                    231: {id: 231, name: "Уссурийск", code: "ussuriisk"},
                    232: {id: 232, name: "Усть-Илимск", code: "ustilimsk"},
                    233: {id: 233, name: "Усть-Каменогорск", code: "ustkamenogorsk"},
                    234: {id: 234, name: "Уфа", code: "ufa"},
                    235: {id: 235, name: "Ухта", code: "uhta"},
                    236: {id: 236, name: "Фокино", code: "fokino"},
                    237: {id: 237, name: "Хабаровск", code: "khabarovsk"},
                    238: {id: 238, name: "Ханты-Мансийск", code: "hmansiysk"},
                    239: {id: 239, name: "Харьков", code: "harkov"},
                    240: {id: 240, name: "Хасавюрт", code: "hasavurt"},
                    241: {id: 241, name: "Херсон", code: "herson"},
                    242: {id: 242, name: "Химки", code: "himki"},
                    243: {id: 243, name: "Хоста", code: "hosta"},
                    244: {id: 244, name: "Худжанд", code: "khujand"},
                    245: {id: 245, name: "Чебоксары", code: "cheboksary"},
                    246: {id: 246, name: "Челябинск", code: "chelyabinsk"},
                    247: {id: 247, name: "Череповец", code: "cherepovec"},
                    248: {id: 248, name: "Черкесск", code: "cherkessk"},
                    249: {id: 249, name: "Чита", code: "chita"},
                    250: {id: 250, name: "Шахты", code: "shahty"},
                    251: {id: 251, name: "Щёлково", code: "schelkovo"},
                    252: {id: 252, name: "Электросталь", code: "elektrostal"},
                    253: {id: 253, name: "Элиста", code: "elista"},
                    254: {id: 254, name: "Энгельс", code: "engels"},
                    255: {id: 255, name: "Южно-Сахалинск", code: "yujnosahalinsk"},
                    256: {id: 256, name: "Якутск", code: "yakutsk"},
                    257: {id: 257, name: "Ярославль", code: "yaroslavl"},
                }
            }
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
        if (this.fields[fieldName] && this.fields[fieldName].value && this.fields[fieldName].value[siteName]) {
            return Object.assign({},this.fields[fieldName].value[siteName]);
        } else {
            return undefined;
        }
    };
    /**
     * Получить значение поля по его ID
     * @param {String} siteName Имя сайта
     * @param {String} fieldName код поля
     * @param {Number} id ID поля
     * @return {*}
     */
    this.getValueById = function (siteName, fieldName, id) {
        return this.getValue(siteName, fieldName)[id];
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