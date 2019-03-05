/** @type {createApplication} */
let express = require('express');
let ModelUserData = require('../classes/model/ModelUserData');
/** @type {Router} */
let router = express.Router();
router.post('/', function(req, res) {
    let post = req.body;
    let UserData = new ModelUserData;
    let data = UserData[post.method].apply(UserData, post.arguments ? JSON.parse(post.arguments) : null);
    res.send(JSON.stringify(data));
});

module.exports = router;