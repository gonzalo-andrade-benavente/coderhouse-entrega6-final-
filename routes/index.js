const { Router, request, response } = require('express');
const router = Router();

router.get('/', (req = request, res = response, next) => {
    //res.sendFile("index.html", { root: "public" });
    res.render('home');
});


module.exports = router;