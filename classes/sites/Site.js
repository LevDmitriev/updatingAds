/**
 * Абстрактный класс сайта.
 * @param {Object} settings Объект с настройками
 * @param {String} settings.mainPageURL URL главной страницы
 * @param {String} settings.logoutPageURL URL для POST запроса выхода из аккаунта
 * @param {String} settings.adsPageURL URL страницы с объявлениями пользователя
 * @param {Object} settings.browser Объект браузера puppeteer. Обязательно должен быть передан
 * @param {String} settings.authFormPageURL Страница, на которой находится форма авторизации
 * @param {Object} settings.page Объект страницы puppeteer
 * @param {Object} settings.debug Объект, с настройками отладки
 * @param {String} settings.profilePageURL Страница профиля
 *
 * @abstract
 */
function Site (settings) {
    /**
     *  URL главной страницы
     * @type {string}
     */
    this.mainPageURL = settings.mainPageURL;
    /**
     * URL для POST запроса выхода из аккаунта
     * @type {string}
     */
    this.logoutPageURL = settings.logoutPageURL;
    /**
     *  Страница профиля пользователя
     * @type {string|undefined}
     */
    this.profilePageURL = settings.profilePageURL || undefined;
    /**
     * URL страницы с объявлениями пользователя
     * @type {string}
     */
    this.adsPageURL = settings.adsPageURL;
    /** Страница, на которой располагается форма регистрации */
    this.authFormPageURL = settings.authFormPageURL;
    /** Объект, с настройками отладки */
    this.debug = settings.debug !== false ? {
        page:  {
            goto: {
                scripts: [ // Массив скриптов, которые загружаются на каждую посещённую страницу
                    './assets/js/mouse-helper.js'
                ]
            }
        },
        mouse: {
            options: {
                delay: 2000// Задержка при клике
            }
        }
    } : false;
    /** Объект браузера Puppeteer */
    this.__browser = settings.browser;
    /** Страница браузера puppeteer, в которой выполняется вся работа */
    this.__page = settings.page || null;
};

/** Войти в личный кабинет.
 * @abstract */
Site.prototype.authorize = function (oAccountLoginData) {
    this.authorize(oAccountLoginData);
};

/** Вернуть экземпляр браузера */
Site.prototype.getBrowser = function () {
    return this.__browser;
};

/** Вернуть текущую страницу. Иначе создать новую и вернуть ссылку на неё.
 * @this {Site}
 * */
Site.prototype.getPage = async function () {
    let self = this;
    if (!this.__page) { // Если страница не задана
        /** Страница, на которой будет происходить все действия
         * @type {Puppeteer.Page}
         *
         * */
        let firstPage = (await this.getBrowser().pages())[0];
        if (self.debug) { // Если заданы опции для дебага
            if (self.debug.mouse && self.debug.mouse.options) {
                /** Привязанная к кнотексту мыши, функция click
                 * @function clickCurry */
                let clickCurry = firstPage._mouse.click.bind(firstPage._mouse); // Привязываем контекст
                // Карируем функцию клика, чтобы она вызывалась с options для дебага
                firstPage._mouse.click = function (x, y, options = {}) {
                    return clickCurry(x, y, Object.assign(options, self.debug.mouse.options));
                };
            }
            if (self.debug.page && self.debug.page.goto && self.debug.page.goto.scripts && self.debug.page.goto.scripts.length) {
                // Когда страница маняется, то подгружать все скрипты для дебага
                firstPage.on('framenavigated', function (frame) {
                    (async function () {
                        for (let scriptPath of self.debug.page.goto.scripts) {
                                if (frame && frame.hasOwnProperty('addScriptTag')) {
                            await frame.addScriptTag({path: scriptPath}).catch(e => console.log(e));
                        }
                            }
                    })();
                });
            }
        }

        if (firstPage) { // Если у браузера есть страница
            this.__page = firstPage;
        } else { // Иначе создать новую страницу
            this.__page = await this.getBrowser().newPage();
        }
    }
    return this.__page;
};

/** Выйти из личного кабинета. В случае необходимости, переопределить в наследниках. */
Site.prototype.logout = async function () {
    let page = await this.getPage();
    await page.goto(this.logoutPageURL);
};

/**
 * Закрыть попап
 */
Site.prototype.closePopup = async function (selectorCloseBtn) {
    let page = await this.getPage();
    await page.waitForSelector(selectorCloseBtn, {visible: true}); // Ждём открытия попапа
    (await page.$(selectorCloseBtn)).click(); // Кликаем на крестик закрытия
    await page.waitForSelector(selectorCloseBtn, {hidden: true}); // Ждём закрытия попапа
    await page.waitFor(1000);
};

/** Обновить все объявления в аккаунте
 *
 * @abstract
 */
Site.prototype.updateAds = async function (oAccountData) {};

module.exports = Site;