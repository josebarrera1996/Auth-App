import toast from 'react-hot-toast';

/* Definiendo las validaciones de los formularios */

// Método que será utilizado para buscar las invalidaciones en el formulario del componente 'Username'
export async function usernameValidate(values) {
    const errors = usernameVerify({}, values);
    return errors;
}

// Método que será utilizado para buscar las invalidaciones en el formulario del componente 'Password'
export async function passwordValidate(values) {
    const errors = passwordVerify({}, values);
    return errors;
}

// Método que será utilizado para buscar las invalidaciones en el formulario del componente 'Reset'
export async function resetPasswordValidation(values) {
    const errors = passwordVerify({}, values);
    // Si no hay coincidencias en lo ingresado en los campos 'password' y 'confirm_password'...
    if (values.password !== values.confirm_pwd) {
        errors.exist = toast.error("Password not match.");
    }
    return errors;
}

// Método que será utilizado para buscar las invalidaciones en el formulario del componente 'Register'
export async function registerValidation(values) {
    const errors = usernameVerify({}, values);
    passwordVerify(errors, values);
    emailVerify(errors, values);
    return errors;
}

// Método que será utilizado para buscar invalidaciones en el formulario del componente 'Profile'
export async function profileValidation(values){
    const errors = emailVerify({}, values);
    return errors;
}

/* ------------------------------------------------------ */

// Método para buscar las invalidaciones con el campo 'username'
function usernameVerify(error = {}, values) {
    if (!values.username) {
        // En caso de no ingresar nada...
        error.username = toast.error('Username Required');
    } else if (values.username.includes(" ")) {
        // En caso de ingresar una cadena vacía y otros datos acompañados...
        error.username = toast.error('Invalid Username')
    }
    return error;
}

// Método para buscar las invalidaciones en el campo 'password'
function passwordVerify(errors = {}, values) {

    // RegEX
    const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

    if (!values.password) {
        // Si no se ha ingresado nada...
        errors.password = toast.error("Password Required.");
    } else if (values.password.includes(" ")) {
        // Si la misma comienza con una cadena vacía...
        errors.password = toast.error("Wrong Password.");
    } else if (values.password.length < 4) {
        // Si lo ingresado es menor a 4 carácteres...
        errors.password = toast.error("Password must be more than 4 characters long.");
    } else if (!specialChars.test(values.password)) {
        // Si no se ha ingresado ningún carácter especial...
        errors.password = toast.error("Password must have special character.");
    }

    return errors;
}

// Método para buscar invalidaciones en el campo 'email'
function emailVerify(error = {}, values) {
    // Si no se ha ingresado nada...
    if (!values.email) {
        error.email = toast.error("Email Required.");
    } else if (values.email.includes(" ")) {
        // Si hay una cadena vacía (un espaciado)...
        error.email = toast.error("Wrong Email.");
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        // Si no cumple con el siguiente RegEX...
        error.email = toast.error("Invalid email address.");
    }
    return error;
}