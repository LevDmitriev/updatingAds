let express = require('express');
let ModelUserData = require('../classes/Model/ModelUserData');
let ModelAccountFields = require('../classes/Model/ModelAccountFields');
let router = express.Router();

router.get('/', function(req, res) {
    let oModelUserData = new ModelUserData;
    let oModelAccountFields = new ModelAccountFields;
    let  arSites= [
        'Yourenta',
        'Askrent',
        'BarahlaNet',
        'Privatarenda',
        'SutochnoRuCom',
        'Kvartirapoisk',
        'Rosrealt',
        'Avizinfo',
        'Nedr',
        '_100Realt',
        'FreeAdsIn',
        'Move',
        'KakDomaCom',
        'Sutki24Su',
        'Egent',
        'Spiti',
        'UniBo',
    ];
    let arSitesTemplateData = [];
    arSites.forEach(function (siteName) {

        arSitesTemplateData.push({
            name: siteName,
            arAccounts: oModelUserData.getAccountsBySiteName(siteName),
            arAccountFields: oModelAccountFields.getList(siteName)
        });
    });
    res.render('index', {
        title: 'Обновление объявлений',
        arSites: arSitesTemplateData,
    });
});

module.exports = router;
