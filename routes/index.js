var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');
var novedadesmodel = require('../models/novedadesmodel');


router.get('/', async function (req, res, next) {
  var novedades = await novedadesmodel.getnovedades();
  res.render('index',{
    novedades
  });
}); 

router.post('/', async (req, res, next) => {

  console.log(req.body)

  var nombre = req.body.nombre
  var apellido = req.body.apellido
  var email = req.body.email
  var celular = req.body.celular
  var mensaje = req.body.mensaje

  var obj = {
    to: 'guadalupeanaconde@gmail.com',
    subject: 'contacto desde la pagina web',
    html: nombre + " " + apellido + " se contacto a traves de la pagina y quiere recibir informacion " + mensaje + " al correo " + email + " su celular de contacto es " + celular

  }; //cierra var

  var transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,

    } /*cierra auth*/
  }); /*cierra trnsport*/

  var info = await transporter.sendMail(obj);

  res.render('index', {
    message: 'Gracias por su consulta'
  }); /*cierra render*/

});

module.exports = router;
