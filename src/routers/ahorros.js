import { Router } from "express";
import AhorrosController from "../controllers/ahorros.js";

const ahorrosRouter = Router();

// POST - crear un nuevo dato
ahorrosRouter.post("/", AhorrosController.crearAhorro);

//GET - obtener todos los datos
ahorrosRouter.get("/", AhorrosController.leerTodos);

//GET - obtener un solo dato
ahorrosRouter.get("/:id", AhorrosController.leerUno);

// PUT - editar un dato
ahorrosRouter.put("/:id", AhorrosController.editar);

//DELETE - eliminar un dato
ahorrosRouter.delete("/:id", AhorrosController.eliminar);

export default ahorrosRouter;