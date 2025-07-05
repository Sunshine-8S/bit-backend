import { Router } from "express";
import GastosController from "../controllers/gastos.js";

const gastosRouter = Router();

// POST - crear un nuevo gasto
gastosRouter.post("/", GastosController.crear);

//GET - obtener todos los gastos
gastosRouter.get("/", GastosController.leerTodos);

//GET - obtener un solo gasto
gastosRouter.get("/:id", GastosController.leerUno);

// PUT - editar un gasto
gastosRouter.put("/:id", GastosController.editar);

//DELETE - eliminar un gasto
gastosRouter.delete("/:id", GastosController.eliminar);

export default gastosRouter;