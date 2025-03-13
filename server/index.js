const http = require('http');
const express = require("express");
const cors = require("cors");
const setupSocket = require('./socket');
const fileRoutes = require('./routes/fileRoutes');

//Making Server and Socket Connection
const app = express();
const server = http.createServer(app);
setupSocket(server);

//Middleware
app.use(cors());
app.use(fileRoutes);

//Starting Server
server.listen(9000, () => { console.log("Docker server running 🐳") });