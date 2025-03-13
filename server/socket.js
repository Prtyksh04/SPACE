const { Server: SocketServer } = require('socket.io');
const chokidar = require('chokidar');
const { writeFile } = require('./fileManager');
const ptyProcess = require('./terminal');

module.exports = function setupSocket(Server) {
    console.log("Setting up Socket Server");
    const io = new SocketServer(Server , {
        cors: {
            origin: "*",
        }
    });

    chokidar.watch('./user').on('all', (event, path) => {
        io.emit('file:refresh', path);
    });

    ptyProcess.onData((data) => {
        io.emit('terminal:data', data);
    });

    io.on('connection', (socket) => {
        console.log("Socket Connection", socket.id);
        socket.emit('file:refresh');

        socket.on('file:change', async ({ path, content }) => {
            await writeFile(path, content);
            io.emit("code:update",content);
        });

        socket.on('terminal:write', (data) => {
            ptyProcess.write(data);
        });

    });
    return io;
};
