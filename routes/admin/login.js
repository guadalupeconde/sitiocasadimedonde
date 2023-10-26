var express = require('express');
var router = express.Router();
var usuariosmodel = require('./../../models/usuariosmodel');
//const { routes } = require('../../app');//


router.get('/', function (req, res, next) {
    res.render('admin/login', {
        layout: 'admin/layout'
    });
});

router.post('/', async (req, res, next) => {
    try {
        var usuario = req.body.usuario;
        var password = req.body.password;
        var data = await usuariosmodel.getUserAndPassword(usuario, password);
        if (data != undefined) {
            req.session.id_usuario = data.id;
            req.session.usuario = data.usuario;
            res.redirect('/admin/novedades');
        } else {
            res.render('admin/login', {
                layout: 'admin/layout',
                Error: true
            });
        }//cierra else
    } catch (error) {
        console.log(error)
    }//cierra catch
});

router.get('/logout', function (req, res, next) {
    req.session.destroy();
    res.render('admin/login', {
        layout: 'admin/layout'
    });
});

module.exports = router;