import GastoModel from "../models/gasto.js"

const GastosController = {
    crear: async (req, res) =>{
        try {
            const {nombreGasto, fechaGasto, montoGasto, gastoPagado} = req.body;
            const nuevoGasto = new GastoModel({
                nombreGasto, 
                fechaGasto, 
                montoGasto, 
                gastoPagado,
            });
            const gastoCreado = await nuevoGasto.save();
            res.status(201).json({
                allOK: true, 
                mensaje: "Nuevo gasto agregado correctamente", 
                data: gastoCreado,
            });
        } catch (error) {
            res.status(500).json({
                allOK: false, 
                mensaje: "Ocurrio un error al crear un nuevo gasto", 
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
                mensaje: "Ocurrio un error al los gastos", 
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

export default GastosController;