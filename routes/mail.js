/**
 * Created by pcruz93 on 26/09/16.
 */
var express = require('express');
var nodemailer = require('nodemailer');
var config = require("./../config");
var router = express.Router();

/* POST mail listing. */
router.post('/', handleSendMail); // handle the route at 08bits.com/mail

function handleSendMail(req, res) {
    var name = req.body.name;
    var email = req.body.email;
    var phone = req.body.phone;
    var message = req.body.message;

    //Prueba de los datos que recibe del formulario
    //res.json({yo: name + ' ' + email + ' ' + phone + ' ' + message});

    var transporter = nodemailer.createTransport(config.smtps);

    //var text = 'Ha recibido nueva información de este contacto: ' + name + ' ' + email + ' ' + phone + ' ' + message;

    var mailOptions = {
        from: 'mail.08bits@gmail.com', // sender address
        to: 'mail.08bits@yopmail.com', // list of receivers
        subject: 'Nuevo contacto', // Subject line
        //text: text //, // plaintext body
         html: '<b>Ha recibido información de este contacto:</b><br>'
         + '<b>Nombre: </b>'   + name +  '<br>'
         + '<b>Correo: </b>'   + email + '<br>'
         + '<b>Teléfono: </b>' + phone + '<br>'
         + '<b>Mensaje: </b>'  + message + '<br>'// You can choose to send an HTML body instead
    };

    transporter.sendMail(mailOptions, function(error, info){
        if(error){
            //console.log(error);
            //res.json({yo: 'error'});
        }else{
            //console.log('Message sent: ' + info.response);
            //res.json({yo: info.response});
            res.end("done");
        };
    });
}

module.exports = router;