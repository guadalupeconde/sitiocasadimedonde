var express = require('express');
var router = express.Router();
var novedadesmodel = require('../../models/novedadesmodel')

router.get('/', async function (req, res, next) {
    var novedades = await novedadesmodel.getnovedades()

    res.render('admin/novedades', {
        layout: 'admin/layout',
        persona: req.session.usuario, novedades

    });
});

router.get('/eliminar/:id', async (res, req, next) => {
    var id = req.params.id;
    await novedadesmodel.deleteNovedadesById(id);
    res.redirect('/admin/novedades')
});

router.get('/agregar', async (res, req, next) => {
    res.render('admin/agregar', {
        layout: 'admin/layout'
    })
});

router.post('/agregar', async (req, res, next) => {
    try {
        if (req.body.titulo != "" && req.body.subtitulo != "" && req.body.cuerpo != "") {
            await novedadesmodel.insertNovedad(req.body);
            res.redirect('admin/novedades')
        } else {
            res.render('admin/agregar', {
                layout: 'admin/layout',
                error: true,
                message: 'todos los campos son requeridos'
            });
        }
    } catch (error) {
        res.render('admin/agregar', {
            layout: 'admin/layout',
            error: true,
            message: 'no se cargo al novedad'
        })
    }
})

router.get('/modificar/:id', async (res, req, next) => {
    var id = req.params.id;
    var novedad = await novedadesmodel.getNovedadeById(id);
    res.render('admin/modificar', {
        layout: 'admin/layout',
        novedad

    });
});

router.post('*/modificar', async (req, res, next) => {
    try {
        var obj = {
            titulo: req.body.titulo,
            subtitulo: req.body.subtitulo,
            cuerpo: req.body.cuerpo
        }
        console.log(obj)
        await novedadesmodel.monidicarNovedadeById(obj, req.body.id);
        res.redirect('/admin/novedades');
    } catch (error) {
        console.log(error)
        res.render('admin/modificar', {
            layout: 'admin/layout',
            error: true,
            message: 'no se modifico la novedad'
        })
    }
});

module.exports = router;