import { Schema, model} from "mongoose";

const usuarioSchema = new Schema({
    nombreUsuario: {
        type:String
    },
    emailUsuario: {
        type:String
    },
    contraseñaUsuario: {
        type:String
    },
    imagen: {
        type:String
    }
}, {versionKey: false, timestamps: true});

export default model("Usuario", usuarioSchema);