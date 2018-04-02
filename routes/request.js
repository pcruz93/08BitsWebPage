/**
 * Created by pcruz93 on 04/11/16.
 */
var express = require('express');
var nodemailer = require('nodemailer');
var xoauth2 = require('xoauth2');
var config = require("./../config");
var router = express.Router();

/* POST mail listing. */
router.post('/', handleSendRequest); // handle the route at 08bits.com/request

function handleSendRequest(req, res) {
    var name = req.body.name;
    var email = req.body.email;
    var phone = req.body.phone;
    var budget = req.body.budget;
    var message = req.body.message;

    //var transporter = nodemailer.createTransport(config.smtps);
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            xoauth2: xoauth2.createXOAuth2Generator({
                user: 'mail.08bits@gmail.com',
                clientId: config.clientId,
                clientSecret: config.clientSecret,
                refreshToken: '1/B_Y4GSMCD8sKJf_7_UrLMlD2NYG_J9TksPT4L-nZmPO5q4JekuzXm9-NdtpsJeod'
            })
        }
    });

    var mailOptions = {
        from: 'mail.08bits@gmail.com', // sender address
        to: '08bits.team@gmail.com', // list of receivers
        subject: 'Nueva solicitud de cotización', // Subject line
        html: '<b>Ha recibido una nueva solicitud de cotización con esta información:</b><br>'
        + '<b>Nombre: </b>'   + name +  '<br>'
        + '<b>Correo: </b>'   + email + '<br>'
        + '<b>Teléfono: </b>' + phone + '<br>'
        + '<b>Presupuesto: </b>' + budget + '<br>'
        + '<b>Mensaje: </b>'  + message + '<br>'// You can choose to send an HTML body instead
    };

    transporter.sendMail(mailOptions, function(error, info){
        if (!error) {
            res.end("done");
        }
        ;
    });
}

module.exports = router;