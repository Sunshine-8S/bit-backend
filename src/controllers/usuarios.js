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
            const gastos = await GastoModel.find();
            res.status(200).json({
                allOK: true, 
                mensaje: "Todos los gastos leidos correctamente", 
                data: gastos,
            });
        } catch (error) {
            res.status(500).json({
                allOK: false, 
                mensaje: "Ocurrio un error al leer los gastos", 
                data: error.message,
            });
        }
    },
    leerUno: async (req, res) =>{
        try {
            const {id} = req.params;
            const gasto = await GastoModel.findById(id);
            if (!gasto) {
                res.status(404).json({
                    allOK: false, 
                    mensaje: `El gasto con ID ${id} no se encontró`, 
                    data: null,
                });
            }
            res.status(200).json({
                allOK: true, 
                mensaje: `El gasto con ID ${id} se leyo correctamente`, 
                data: gasto
            });
        } catch (error) {
            res.status(500).json({
                allOK: false, 
                mensaje: "Ocurrio un error al leer el gasto", 
                data: error.message
            });
        }
    },
    editar: async (req, res) =>{
        try {
            const {id} = req.params;
            const {nombreGasto, fechaGasto, montoGasto, gastoPagado} = req.body;
            const gastoActualizado = await GastoModel.findByIdAndUpdate(id, {
                nombreGasto, 
                fechaGasto, 
                montoGasto, 
                gastoPagado,
            });
            if (!gastoActualizado) {
                res.status(404).json({
                    allOK: false, 
                    mensaje: `El gasto con ID ${id} no se encontró`, 
                    data: null,
                });
            }
            res.status(200).json({
                allOK: true, 
                mensaje: `El gasto con ID ${id} se actualizó correctamente`, 
                data: gastoActualizado,
            });
        } catch (error) {
            res.status(500).json({
                allOK: false, 
                mensaje: "Ocurrio un error al actualizar el gasto", 
                data: error.message
            });
        }
    },
    eliminar: async (req, res) =>{
        try {
            const {id} = req.params;
            const gastoEliminado = await GastoModel.findByIdAndDelete(id);
            if (!gastoEliminado) {
                res.status(404).json({
                    allOK: false, 
                    mensaje: `El gasto con ID ${id} no se encontró`, 
                    data: null,
                });
            }
            res.status(200).json({
                allOK: true, 
                mensaje: `El gasto con ID ${id} se eliminó correctamente`, 
                data: gastoEliminado,
            });
        } catch (error) {
            res.status(500).json({
                allOK: false, 
                mensaje: "Ocurrio un error al eliminar el gasto", 
                data: error.message
            });
        }
    },
};

export default UsuariosController;