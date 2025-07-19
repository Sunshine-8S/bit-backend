import AhorroModel from "../models/ahorro.js"

const AhorrosController = {
    crearAhorro: async (req, res) =>{
        try {
            const {nombreAhorro, fechaAhorro, montoAhorro} = req.body;
            const nuevoAhorro = new AhorroModel({
                nombreAhorro, 
                fechaAhorro, 
                montoAhorro,
            });
            const ahorroCreado = await nuevoAhorro.save();
            res.status(201).json({
                allOK: true, 
                mensaje: "Nuevo ahorro agregado correctamente", 
                data: ahorroCreado,
            });
        } catch (error) {
            res.status(500).json({
                allOK: false, 
                mensaje: "Ocurrio un error al crear un nuevo ahorro", 
                data: error.message,
            });
        }
    },
    leerTodos: async (req, res) =>{
        try {
            const ahorros = await AhorroModel.find();
            res.status(200).json({
                allOK: true, 
                mensaje: "Todos los ahorros leidos correctamente", 
                data: ahorros,
            });
        } catch (error) {
            res.status(500).json({
                allOK: false, 
                mensaje: "Ocurrio un error al leer los ahorros", 
                data: error.message,
            });
        }
    },
    leerUno: async (req, res) =>{
        try {
            const {id} = req.params;
            const ahorro = await AhorroModel.findById(id);
            if (!ahorro) {
                res.status(404).json({
                    allOK: false, 
                    mensaje: `El ahorro con ID ${id} no se encontró`, 
                    data: null,
                });
            }
            res.status(200).json({
                allOK: true, 
                mensaje: `El ahorro con ID ${id} se leyo correctamente`, 
                data: ahorro
            });
        } catch (error) {
            res.status(500).json({
                allOK: false, 
                mensaje: "Ocurrio un error al leer el ahorro", 
                data: error.message
            });
        }
    },
    editar: async (req, res) =>{
        try {
            const {id} = req.params;
            const {nombreAhorro, fechaAhorro, montoAhorro} = req.body;
            const ahorroActualizado = await AhorroModel.findByIdAndUpdate(id, {
                nombreAhorro, 
                fechaAhorro, 
                montoAhorro,
            });
            if (!ahorroActualizado) {
                res.status(404).json({
                    allOK: false, 
                    mensaje: `El ahorro con ID ${id} no se encontró`, 
                    data: null,
                });
            }
            res.status(200).json({
                allOK: true, 
                mensaje: `El ahorro con ID ${id} se actualizó correctamente`, 
                data: ahorroActualizado,
            });
        } catch (error) {
            res.status(500).json({
                allOK: false, 
                mensaje: "Ocurrio un error al actualizar el ahorro", 
                data: error.message
            });
        }
    },
    eliminar: async (req, res) =>{
        try {
            const {id} = req.params;
            const ahorroEliminado = await AhorroModel.findByIdAndDelete(id);
            if (!ahorroEliminado) {
                res.status(404).json({
                    allOK: false, 
                    mensaje: `El ahorro con ID ${id} no se encontró`, 
                    data: null,
                });
            }
            res.status(200).json({
                allOK: true, 
                mensaje: `El ahorro con ID ${id} se eliminó correctamente`, 
                data: ahorroEliminado,
            });
        } catch (error) {
            res.status(500).json({
                allOK: false, 
                mensaje: "Ocurrio un error al eliminar el ahorro", 
                data: error.message
            });
        }
    },
};

export default AhorrosController;