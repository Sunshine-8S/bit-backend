import { Router } from "express";
import UsuariosController from "../controllers/usuarios.js";

const usuariosRouter = Router();

usuariosRouter.post("/registrarse", UsuariosController.crearRegistro);
usuariosRouter.post("/ingresar", UsuariosController.login);

usuariosRouter.get("/registrados", UsuariosController.leerTodos);

usuariosRouter.put('/recuperarContrasena', UsuariosController.recuperarContraseña);

usuariosRouter.get("/:id", UsuariosController.leerUno);
usuariosRouter.put("/:id", UsuariosController.editar);
usuariosRouter.delete("/:id", UsuariosController.eliminar);

export default usuariosRouter;