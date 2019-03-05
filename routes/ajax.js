/** @type {createApplication} */
let express = require('express');
/** @type {Puppeteer} */
let puppeteer = require('puppeteer');
let util   = require('util');
/** @type {ModelUserData} */
let ModelUserData = require('../classes/model/ModelUserData');
/** @type {Router} */
let router = express.Router();
router.get('/', function(req, res) {
  /**
   * Наследник класса Site
   * @type {Site}
   * @see /classes/sites/Site.js
   */
  const Site = require(`../classes/sites/${req.query.site}`);
  /**
   * Объект для инициализации puppeteer
   */
  let puppeteerInitialObject = {
    headless: true,
  };
  // Если нужно запустить в тестовом режиме, то выставляем соответствующие настройки
  if (req.query.debug) {
    puppeteerInitialObject = {
      headless: false,
      args: [
        '--start-maximized',
      ],
      defaultViewport: {
        width: 1920,
        height: 1080
      },
      slowMo: 1250,
      // devtools: true,
    };
  }
  async function updateAd() {
    const browser = await puppeteer.launch(puppeteerInitialObject);
    let result;
    try {
      const siteSettings = {browser: browser};
      if (req.query.debug) {
        siteSettings.debug = true
      }
      /**
       * Объект наследника абстрактного класса Site
       * @type {Site}
       */
      const oSite = new Site(siteSettings);
      /** @type {ModelUserData} Объект синглтон для работы с таблицей пользователей */
      const UserData = new ModelUserData;
      /** @type {Object} объект аккаунта пользователя */
      const account= UserData.getAccountById(req.query.accountId);
      result = await oSite.updateAds(account);
    } finally {
      await browser.close();
      res.send(util.inspect(result));
    }
  };

  updateAd();
});

module.exports = router;
