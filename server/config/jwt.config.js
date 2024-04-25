const jwt = require("jsonwebtoken");
const secret = "mysecret";  // Considera mover esto a variables de entorno para mayor seguridad

module.exports.secret = secret;

module.exports.authenticate = async (req, res, next) => {
  const token = req.cookies.usertoken;  // Extrae el token de las cookies

  if (!token) {
    return res.status(401).json({ message: "No token provided." });  // Si no hay token, retorna un error 401
  }

  try {
    const decoded = await jwt.verify(token, secret);  // Verifica el token de manera asincrónica
    req.userId = decoded._id;  // Añade el ID del usuario al objeto de solicitud
    next();  // Pasa el control al siguiente middleware o controlador
  } catch (err) {
    res.status(401).json({ message: "Invalid or expired token." });  // Maneja errores de verificación
  }
};

