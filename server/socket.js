import { Server as SocketServer } from 'socket.io';
import chokidar from 'chokidar';
import PQueue from 'p-queue';
import { writeFile } from './fileManager.js';
import {ptyProcess} from './terminal.js';

const saveQueue = new PQueue({ concurrency: 1 });
const pendingSaves = new Map();

export function setupSocket(Server) {
    console.log("Setting up Socket Server");
    
    const io = new SocketServer(Server, {
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
            // await writeFile(path, content);
            socket.broadcast.emit("code:update", { path, content });

            if (pendingSaves.has(path)) {
                clearTimeout(pendingSaves.get(path));
            }

            const saveTimeout = setTimeout(async ()=>{
                await saveQueue.add(async ()=>{
                    try {
                        console.log(`Saving file : ${path}`);
                        await writeFile(path,content);
                        io.emit('file:saved',{path});
                    } catch (error) {
                        console.error("Error saving file : " , error);
                    }
                })

                pendingSaves.delete(path);
            } , 5000);
            pendingSaves.set(path,saveTimeout);
        });

        socket.on('terminal:write', (data) => {
            ptyProcess.write(data);
        });

    });
    return io;
};
