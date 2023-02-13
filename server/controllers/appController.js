import UserModel from '../model/User.model.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

/** POST: http://localhost:8080/api/register 
 * @param : {
  "username" : "example123",
  "password" : "admin123",
  "email": "example@gmail.com",
  "firstName" : "bill",
  "lastName": "william",
  "mobile": 8009860560,
  "address" : "Apt. 556, Kulas Light, Gwenborough",
  "profile": ""
}
*/
export async function register(req, res) { // Método para poder registrar a un nuevo usuario
    try {
        // Obteniendo todo lo ingresado por el usuario
        const { username, password, profile, email } = req.body;

        // Chequear si el nombre de usuario ingresado ya existe
        const existUsername = new Promise((resolve, reject) => {
            UserModel.findOne({ username }, function (err, user) {
                if (err) reject(new Error(err));
                // En caso de que ya existe, arrojar el siguiente error
                if (user) reject({ error: "Please use unique username" });
                // En caso de que no existe, resolver la promesa
                resolve();
            });
        });

        // Chequear si el email ingresado ya existe
        const existEmail = new Promise((resolve, reject) => {
            UserModel.findOne({ email }, function (err, email) {
                if (err) reject(new Error(err));
                // En caso de que ya exista, arrojar el siguiente error
                if (email) reject({ error: "Please use unique Email" });
                // En caso de que no exista, resolver la promesa
                resolve();
            });
        });

        // Completar ambas promesas
        Promise.all([existUsername, existEmail])
            .then(() => {
                if (password) {
                    // Si hemos pasado la password, encriptarla
                    bcrypt.hash(password, 10)
                        .then(hashedPassword => {
                            // Prepara el objeto a insertar
                            const user = new UserModel({
                                username,
                                password: hashedPassword,
                                profile: profile || '',
                                email
                            });
                            // Guardar el usuario recien creado en la B.D
                            user.save()
                                .then(result => res.status(201).send({ msg: "User Register Successfully" }))
                                .catch(error => res.status(500).send({ error }));
                        }).catch(error => {
                            return res.status(500).send({
                                error: "Enable to hashed password"
                            });
                        })
                }
            }).catch(error => {
                return res.status(500).send({ error })
            })
    } catch (error) {
        return res.status(500).send(error);
    }
}

/** Especie de middleware para chequear si el usuario existe */
export async function verifyUser(req, res, next) {
    try {
        // En caso de que el 'req' sea de tipo 'GET' u otro método
        const { username } = req.method == "GET" ? req.query : req.body;

        // Chequeando
        let exist = await UserModel.findOne({ username });
        if (!exist) return res.status(404).send({ error: "Can't find User!" });
        next(); // En caso de que existe, seguir con la lógica
    } catch (error) {
        return res.status(404).send({ error: "Authentication Error" });
    }
}

/** POST: http://localhost:8080/api/login 
 * @param: {
  "username" : "example123",
  "password" : "admin123"
}
*/
export async function login(req, res) { // Método para poder logearse
    // Obteniendo lo ingresado por el usuario
    const { username, password } = req.body;

    try {
        // Chequeando el usuario se encuentra registrado
        UserModel.findOne({ username })
            .then(user => {
                // Si existe...
                // Comparar ambas passwords (la de texto plano y la encriptada)
                bcrypt.compare(password, user.password)
                    .then(passwordCheck => {
                        // Si no hemos pasado la password
                        if (!passwordCheck) return res.status(400).send({ error: "Don't have Password" });
                        // Crear el token
                        const token = jwt.sign({
                            // Propiedades
                            userId: user._id,
                            username: user.username
                        }, process.env.JWT_SECRET, { expiresIn: "24h" }); // Expirará en 24 horas
                        // Respuesta
                        return res.status(200).send({
                            msg: "Login Successful...!",
                            username: user.username,
                            token
                        });
                    })
                    .catch(error => {
                        // Si las passwords no coinciden
                        return res.status(400).send({ error: "Password does not Match" });
                    })
            }).catch(error => {
                // Si no existe
                return res.status(404).send({ error: "Username not Found" });
            });
    } catch (error) {
        return res.status(500).send({ error });
    }
}

/** GET: http://localhost:8080/api/user/example123 */
export async function getUser(req, res) { // Método para poder traer los datos del respectivo usuario
    res.json('getUser route');
}

/** PUT: http://localhost:8080/api/updateuser 
 * @param: {
  "id" : "<userid>"
}
body: {
    firstName: '',
    address : '',
    profile : ''
}
*/
export async function updateUser(req, res) { // Método para actualizar a el respectivo usuario
    res.json('updateUser route');
}

/** GET: http://localhost:8080/api/generateOTP */
export async function generateOTP(req, res) { // Método para generar el OTP
    res.json('generateOTP route');
}

/** GET: http://localhost:8080/api/verifyOTP */
export async function verifyOTP(req, res) { // Método para verificiar el OTP generado
    res.json('verifyOTP route');
}

/** GET: http://localhost:8080/api/createResetSession */
export async function createResetSession(req, res) { // Método para resetear la sesión 
    res.json('createResetSession route');
}

/** PUT: http://localhost:8080/api/resetPassword */
export async function resetPassword(req, res) { // Método para resetear la password
    res.json('resetPassword route');
}



