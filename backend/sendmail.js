const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;  // Usa el puerto asignado en producción

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Configurar el transporte de nodemailer
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,  // Utiliza variables de entorno para mayor seguridad
        pass: process.env.EMAIL_PASS   // Utiliza una contraseña de aplicación o variable de entorno
    }
});

// Ruta para manejar el POST del formulario
app.post('/send-email', (req, res) => {
    const { nombre, empresa, email, telefono, texto } = req.body;

    const mailOptions = {
        from: email,
        to: process.env.EMAIL_RECEIVER, // Destinatario (tu correo, desde una variable de entorno)
        subject: 'Nuevo mensaje desde el formulario de contacto',
        text: `
            Nombre: ${nombre}
            Empresa: ${empresa}
            Email: ${email}
            Teléfono: ${telefono}
            Mensaje: ${texto}
        `
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error al enviar el correo:', error);
            res.status(500).send('Error al enviar el correo');
        } else {
            console.log('Correo enviado:', info.response);
            res.status(200).send('Correo enviado correctamente');
        }
    });
});

app.listen(port, () => {
    console.log(`Servidor corriendo en el puerto ${port}`);
});
