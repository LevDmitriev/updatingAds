/** @type {createApplication} */
let express = require('express');
let ModelUserData = require('../classes/model/ModelUserData');
/** @type {Router} */
let router = express.Router();
router.post('/', function(req, res) {
    let post = req.body;
    let UserData = new ModelUserData;
    if (post['getFunctionNames']) { // Если нужно получить массив со всеми именами функций
        let result = [];
        let arEntries = Object.entries(UserData);
        arEntries.forEach(arEntry => {
            let [name, value] = arEntry;
            if (typeof value === "function") {
                result.push(name);
            }
        });
        res.send(JSON.stringify(result));
    } else {
        let data = UserData[post.method].apply(UserData, post.arguments ? JSON.parse(post.arguments) : null);
        res.send(JSON.stringify(data));
    }
});

module.exports = router;