const faker = require('faker');
const { Router, request, response } = require('express');
const router = Router();

const { postProducto } = require('../services/productos');

router.get('/', (req = request, res = response, next) => {
    res.sendFile("index.html", { root: "public" });
    //res.render('home');
});

router.get('/login', (req = request, res = response, next) => {
    /*
    req.session.user = {
        uuid: '12234-2345-2323423'
    }
    req.session.save(err => {
        if(err){
            console.log(err);
        } else {
            res.send(req.session);
        }
    });
    */
    //res.render('login');
    //res.sendFile('login.html');
    //res.sendFile(path.join(__dirname, '/login.html'));

    if (req.session.user === undefined) {
        res.sendFile("login.html", { root: "public" });
    } else {
        res.sendFile("index.html", { root: "public" });
    }   

});

router.post('/api/login', (req, res) => {
    const { user } = req.body;
    
    //res.cookie('user', user, {maxAge: 60000 /*, signed:true*/ } ).json({
    //    msg: '/api/login',
    //    user,
    //    response:  true
    //});

    req.session.user = user;

    res.json({
        user: req.session.user
    });
});

router.get('/api/login', (req, res) => {
    //res.send(req.cookies);
    res.json({
        session: req.session
    });
});

router.delete('/api/login/:cookie', (req, res) => {
    const { cookie } = req.params;
    
    req.session.destroy();

    res.send({
        msg: 'ok'
    });
});

router.patch('/api/login', (req, res) => {

    req.session.cookie.expires = 60000;
    req.session.user = req.session.user;

    res.json({
        session: req.session
    });
});





router.get('/api/productos-test', async (req, res) => {

    let prd;
    let productos = [];

    for (let i = 0; i < 5; i++) {
        prd = {
            timestamp: new Date(),
            nombre: faker.commerce.productName(),
            descripcion: faker.commerce.productDescription(),
            codigo: faker.datatype.string(10),
            foto: faker.image.imageUrl(),
            precio: faker.datatype.number(),
            stock: faker.datatype.number(),
            borrado: faker.datatype.boolean()
        }
        productos.push(prd);
    }

    await postProducto(productos);

    res.send({
        msg: 'productos-test faker',
        productos
    });
});



module.exports = router;