import { Router } from "express";
import * as controller from '../controllers/appController.js';

// Manejador de Rutas
const router = Router();

/* Definiendo las Rutas */

// Rutas con método 'POST'
router.route('/register').post(controller.register); // Ruta para registrar a un nuevo usuario
router.route('/authenticate').post((req, res) => res.end()); // Ruta para la autenticación
router.route('/login').post(controller.login); // Ruta para logearse

// Rutas con método 'GET'
router.route('/user/:username').get(controller.getUser) // Ruta para acceder a el perfil del usuario
router.route('/generateOTP').get(controller.generateOTP) // Ruta para generar un OTP
router.route('/verifyOTP').get(controller.verifyOTP) // Ruta para verificar el OTP generado
router.route('/createResetSession').get(controller.createResetSession) // Ruta para resetear las variables de sesión

// Rutas con método 'PUT'
router.route('/updateuser').put(controller.updateUser); // Ruta para actualizar el perfil del usuario
router.route('/resetPassword').put(controller.resetPassword); // Ruta para resetear la password

export default router;