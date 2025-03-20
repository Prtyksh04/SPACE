import http from "http";
import express from "express";
import cors from "cors";
import {setupSocket} from "./socket.js";
import fileRoutes from "./routes/fileRoutes.js";

//Making Server and Socket Connection
const app = express();
const server = http.createServer(app);
setupSocket(server);

//Middleware
app.use(cors());
app.use(fileRoutes);

//Starting Server
server.listen(9000, () => { console.log("Docker server running 🐳") });