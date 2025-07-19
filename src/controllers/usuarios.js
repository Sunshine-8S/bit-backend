import bcrypt from "bcryptjs";
import UsuarioModel from "../models/usuario.js"
import { getToken } from "../utils/token.js";

const UsuariosController = {
    crearRegistro: async (req, res) =>{
        try {
            const {nombreUsuario, emailUsuario, contraseñaUsuario, imagen} = req.body;

            const contraseñaEncriptada = await bcrypt.hash(contraseñaUsuario, 10);

            const nuevoUsuario = new UsuarioModel({
                nombreUsuario, 
                emailUsuario, 
                contraseñaUsuario: contraseñaEncriptada, 
                imagen
            });

            const usuarioCreado = await nuevoUsuario.save(); 
            res.status(201).json({
                allOK: true, 
                mensaje: "Nuevo usuario agregado correctamente", 
                data: usuarioCreado,
            });
        } catch (error) {
            res.status(500).json({
                allOK: false, 
                mensaje: "Ocurrio un error al crear un nuevo usuario", 
                data: error.message,
            });
        }
    },
    login: async (req, res) =>{
        try {
            const {nombreUsuario, contraseñaUsuario} = req.body;
            const usuarioEncontrado = await UsuarioModel.findOne({emailUsuario: nombreUsuario});
            if (!usuarioEncontrado) {
                res.status(401).json({
                        allOK: false, 
                        mensaje: "No esta autorizado", 
                        data: null,
                    });
            } else {
                const contraseñaValida = await bcrypt.compare(contraseñaUsuario, usuarioEncontrado.contraseñaUsuario)
                if (contraseñaValida) {
                    const token = await getToken({
                        id: usuarioEncontrado._id,
                        name: usuarioEncontrado.nombreUsuario
                    });
                    if (token) {
                        res.status(200).json({
                            allOK: true, 
                            mensaje: "Usuario encontrado correctamente | ¡Bienvenido!", 
                            data: token
                        });
                    }else {
                        res.status(200).json({
                            allOK: false, 
                            mensaje: "El token no existe", 
                            data: null
                        });
                    }
                } else {
                    res.status(401).json({
                        allOK: false, 
                        mensaje: "No esta autorizado", 
                        data: null,
                    });
                }
            }
        } catch (error) {
            res.status(500).json({
                allOK: false, 
                mensaje: "Ocurrio un error al ingrear al usuario", 
                data: error.message,
            });
        }
    },
    leerTodos: async (req, res) =>{
        try {
            const registros = await UsuarioModel.find();
            res.status(200).json({
                allOK: true, 
                mensaje: "Todos los usuarios registrados leidos correctamente", 
                data: registros,
            });
        } catch (error) {
            res.status(500).json({
                allOK: false, 
                mensaje: "Ocurrio un error al leer los usuarios registrados", 
                data: error.message,
            });
        }
    },
    leerUno: async (req, res) =>{
        try {
            const {id} = req.params;
            const usuarioRegistrado = await UsuarioModel.findById(id);
            if (!usuarioRegistrado) {
                res.status(404).json({
                    allOK: false, 
                    mensaje: `El usuario con ID ${id} no se encontró`, 
                    data: null,
                });
            }
            res.status(200).json({
                allOK: true, 
                mensaje: `El usuario con ID ${id} se leyo correctamente`, 
                data: usuarioRegistrado
            });
        } catch (error) {
            res.status(500).json({
                allOK: false, 
                mensaje: "Ocurrio un error al leer el el usuario registrado", 
                data: error.message
            });
        }
    },
    editar: async (req, res) =>{
        try {
            const {id} = req.params;
            const {nombreUsuario, emailUsuario, contraseñaUsuario} = req.body;
            const contraseñaEncriptada = await bcrypt.hash(contraseñaUsuario, 10);
            const usuarioActualizado = await UsuarioModel.findByIdAndUpdate(id, {
                nombreUsuario, 
                emailUsuario, 
                contraseñaUsuario: contraseñaEncriptada
            });
            if (!usuarioActualizado) {
                res.status(404).json({
                    allOK: false, 
                    mensaje: `El usuario con ID ${id} no se encontró`, 
                    data: null,
                });
            }
            res.status(200).json({
                allOK: true, 
                mensaje: `El usuario con ID ${id} se actualizó correctamente`, 
                data: usuarioActualizado,
            });
        } catch (error) {
            res.status(500).json({
                allOK: false, 
                mensaje: "Ocurrio un error al actualizar el usuario", 
                data: error.message
            });
        }
    },
    recuperarContraseña: async (req, res) => {
        try {
            const { emailUsuario, nuevaContrasena } = req.body;

            const usuario = await UsuarioModel.findOne({ emailUsuario });
            if (!usuario) {
                return res.status(404).json({
                    allOK: false,
                    mensaje: "No se encontró ningún usuario con ese correo",
                    data: null,
                });
            }

            const contraseñaEncriptada = await bcrypt.hash(nuevaContrasena, 10);
            usuario.contraseñaUsuario = contraseñaEncriptada;
            await usuario.save();

            res.status(200).json({
                allOK: true,
                mensaje: "Contraseña actualizada correctamente",
                data: null,
            });
        } catch (error) {
            res.status(500).json({
                allOK: false,
                mensaje: "Error al actualizar la contraseña",
                data: error.message,
            });
        }
    },
    eliminar: async (req, res) =>{
        try {
            const {id} = req.params;
            const usuarioEliminado = await UsuarioModel.findByIdAndDelete(id);
            if (!usuarioEliminado) {
                res.status(404).json({
                    allOK: false, 
                    mensaje: `El usuario con ID ${id} no se encontró`, 
                    data: null,
                });
            }
            res.status(200).json({
                allOK: true, 
                mensaje: `El usuario con ID ${id} se eliminó correctamente`, 
                data: usuarioEliminado,
            });
        } catch (error) {
            res.status(500).json({
                allOK: false, 
                mensaje: "Ocurrio un error al eliminar el usuario", 
                data: error.message
            });
        }
    },
};

export default UsuariosController;