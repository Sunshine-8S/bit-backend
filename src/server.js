import "dotenv/config";
import connectDB from "./config/db.js";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import usuariosRouter from "./routers/usuarios.js";
import gastosRouter from "./routers/gastos.js";
import ahorrosRouter from "./routers/ahorros.js";

const server = express();
const host = process.env.HOST;
const port = process.env.PORT;

connectDB();

server.use(cors());
server.use(express.json());
server.use(morgan("dev"));
server.use("/api/usuarios", usuariosRouter);
server.use("/api/gastos", gastosRouter);
server.use("/api/ahorros", ahorrosRouter);

const __dirname = path.dirname(fileURLToPath(import.meta.url));

server.use(express.static(path.join(__dirname, 'dist/spa')));

server.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/spa', 'index.html'));
});

/* server.get("/", (req, res) =>{
    res.status(204).send();
}); */

server.listen(port, () =>{
    console.log(`The server is running at ${host} port ${port}`);
});
