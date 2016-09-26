/**
 * Created by pcruz93 on 26/09/16.
 */
// Creación de variable
var config = {};

// Datos para conectarse al servidor de correos
config.smtps = process.env.SMTPS;

module.exports = config;
