/*
Script para generar una clave secreta segura para creación de tokens JWT:
2 bytes = 256 bits

Ejemplo:
141adb5ed1bfba15da8298f2cd7bc88e84289a533c4057b1fa9340ce02a03943


Almacenar la clave en una variable de entorno.

Las variables de entorno se acceden en NestJS:

 JwtModule.register({
      secret: process.env.SECRETO,
      signOptions: {expiresIn: '7d'}
    }),
*/
const crypto = require('crypto');
const secret = crypto.randomBytes(32).toString('hex'); 
console.log(secret);
