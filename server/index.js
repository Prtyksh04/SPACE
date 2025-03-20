import http from "http";
import express from "express";
import cors from "cors";
import { setupSocket } from "./socket.js";
import fileRoutes from "./routes/fileRoutes.js";
import compression from "compression";

const app = express();
const server = http.createServer(app);
setupSocket(server);

//Middleware
app.use(cors());
app.use(express.json());
app.use(compression({ brotli: { enabled: true, zlib: {} } }));

//Routes
app.use(fileRoutes);

//Starting Server
server.listen(9000, () => { console.log("Docker server running 🐳") });
