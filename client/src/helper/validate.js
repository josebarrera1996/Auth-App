import toast from 'react-hot-toast';

/* Definiendo las validaciones de los formularios */

// Método que será utilizado para buscar las invalidaciones en el formulario que lo aplique
export async function usernameValidate(values) {
    const errors = usernameVerify({}, values);
    return errors;
}

// Método para buscar las invalidaciones
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