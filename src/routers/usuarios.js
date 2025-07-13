import { Router } from "express";
import UsuariosController from "../controllers/usuarios.js";

const usuariosRouter = Router();

// POST - crear un nuevo gasto
usuariosRouter.post("/registrarse", UsuariosController.crearRegistro);
usuariosRouter.post("/ingresar", UsuariosController.login);

//GET - obtener todos los gastos
usuariosRouter.get("/", UsuariosController.leerTodos);

//GET - obtener un solo gasto
usuariosRouter.get("/:id", UsuariosController.leerUno);

// PUT - editar un gasto
usuariosRouter.put("/:id", UsuariosController.editar);

//DELETE - eliminar un gasto
usuariosRouter.delete("/:id", UsuariosController.eliminar);

export default usuariosRouter;