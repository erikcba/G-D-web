<?php
// Verifica si los datos fueron enviados correctamente
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $nombre = htmlspecialchars($_POST['nombre']);
    $empresa = htmlspecialchars($_POST['empresa']);
    $email = htmlspecialchars($_POST['email']);
    $telefono = htmlspecialchars($_POST['telefono']);
    $texto = htmlspecialchars($_POST['texto']);
    
    // Asegurarse de que todos los campos requeridos están completos
    if (!empty($nombre) && !empty($empresa) && !empty($email) && !empty($telefono) && !empty($texto)) {
        
        // Configura los detalles del correo
        $to = "eriktomaselli97@gmail.com"; // Reemplaza con tu email
        $subject = "Nuevo mensaje desde el formulario de contacto";
        
        $message = "
        <html>
        <head>
        <title>Nuevo mensaje</title>
        </head>
        <body>
        <p><strong>Nombre:</strong> $nombre</p>
        <p><strong>Empresa:</strong> $empresa</p>
        <p><strong>Email:</strong> $email</p>
        <p><strong>Teléfono:</strong> $telefono</p>
        <p><strong>Mensaje:</strong> $texto</p>
        </body>
        </html>
        ";
        
        // Encabezados del correo
        $headers = "MIME-Version: 1.0" . "\r\n";
        $headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
        $headers .= 'From: ' . $email . "\r\n";
        
        // Envía el correo
        if (mail($to, $subject, $message, $headers)) {
            // Responder en formato JSON
            echo json_encode(["success" => true]);
        } else {
            echo json_encode(["success" => false, "message" => "No se pudo enviar el correo."]);
        }
    } else {
        echo json_encode(["success" => false, "message" => "Por favor, completa todos los campos."]);
    }
} else {
    echo json_encode(["success" => false, "message" => "Método de solicitud no permitido."]);
}
?>