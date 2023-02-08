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
    res.json('register route');
}

/** POST: http://localhost:8080/api/login 
 * @param: {
  "username" : "example123",
  "password" : "admin123"
}
*/
export async function login(req, res) { // Método para poder logearse
    res.json('login route');
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



