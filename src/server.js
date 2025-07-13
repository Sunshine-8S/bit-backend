import "dotenv/config";
import connectDB from "./config/db.js";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import usuariosRouter from "./routers/usuarios.js";
import gastosRouter from "./routers/gastos.js";

const server = express();
const host = process.env.HOST;
const port = process.env.PORT;

connectDB();

server.use(cors());
server.use(express.json());
server.use(morgan("dev"));
server.use("/usuarios", usuariosRouter);
server.use("/gastos", gastosRouter);

server.get("/", (req, res) =>{
    res.status(204).send();
});

server.listen(port, () =>{
    console.log(`The server is running at ${host} port ${port}`);
});