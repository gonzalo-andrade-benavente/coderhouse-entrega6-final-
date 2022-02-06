const bcrypt = require('bcryptjs');
const faker = require('faker');
const { Router, request, response } = require('express');
const router = Router();

const { config } = require('../config');
const { isAuth } = require('../middlewares/usuarios');
const { postProducto } = require('../services/productos');
const { postUsuario, getUsuario } = require('../services/usuarios');
const passport = require('passport');


router.get('/', isAuth, (req = request, res = response, next) => {
    res.sendFile("index.html", { root: "public" });
    //res.render('home');
});

router.get('/login',(req = request, res = response, next) => {
    res.sendFile("login.html", { root: "public" });
});

/*
router.post('/login', (req, res) => {
    console.log(req.body);
    res.send('<h1>Logeado exitosamente</h1>');
});
*/

router.get('/login-error' ,(req = request, res = response, next) => {
    res.sendFile("login-error.html", { root: "public" });
});

router.post('/login', passport.authenticate('login', { failureRedirect: '/login-error', successRedirect: '/'}));

router.post('/api/login', (req, res) => {
    const { user } = req.body;

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

    req.session.cookie.expires = config.maxAge;
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

router.get('/register', (req = request, res = response, next) => {
    res.sendFile("register.html", { root: "public" });
});

router.get('/register-error', (req = request, res = response, next) => {
    res.sendFile("register-error.html", { root: "public" });
});

router.post('/register', async(req, res) => {
    const { username, password} = req.body;

    const tempUser = await getUsuario(username);

    if (tempUser) return res.redirect('register-error');

    const user = await postUsuario({
        username,
        password: bcrypt.hashSync(password, 10)
    });

    req.session.user = user;

    res.redirect('/login');

});

router.post('/api/register', async (req = request, res = response, next) => {
    const newUser = {
        username: req.body.username,
        password: bcrypt.hashSync(req.body.password, 10)
    }
    const user = await postUsuario(newUser);
    req.session.user = req.body;
    res.send({
        user
    });
});


module.exports = router;