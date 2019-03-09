/** @type {createApplication} */
let express = require('express');
/** @type {Router} */
let router = express.Router();
router.post('/', function(req, res) {
    let post = req.body;
    let Class = require('../classes/' + post.class);
    let ObjectForProxy = new Class;
    if (post['getFunctionNames']) { // Если нужно получить массив со всеми именами функций
        let result = [];
        let arEntries = Object.entries(ObjectForProxy);
        arEntries.forEach(arEntry => {
            let [name, value] = arEntry;
            if (typeof value === "function") {
                result.push(name);
            }
        });
        res.send(JSON.stringify(result));
    } else {
        let data = ObjectForProxy[post.method].apply(ObjectForProxy, post.arguments ? JSON.parse(post.arguments) : null);
        res.send(JSON.stringify(data));
    }
});

module.exports = router;