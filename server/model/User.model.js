import mongoose from "mongoose";

// Definiendo el Schema
export const UserSchema = new mongoose.Schema({

    // Campos
    username: {
        type: String,
        required: [true, "Please provide unique Username"],
        unique: [true, "Username Exist"]
    },
    password: {
        type: String,
        required: [true, "Please provide a password"],
        unique: false,
    },
    email: {
        type: String,
        required: [true, "Please provide a unique email"],
        unique: true,
    },
    firstName: { type: String },
    lastName: { type: String },
    mobile: { type: Number },
    address: { type: String },
    profile: { type: String }
});

// Exportando el modelo y creando la colección 'Users'
export default mongoose.model.Users || mongoose.model('User', UserSchema);