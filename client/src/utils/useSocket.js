import { useEffect } from "react";
import socket from "../socket";

export default function useSocket(getFileTree, setCode) {
    console.log("TYpe of getFileTree :    " + typeof getFileTree);

    useEffect(() => {
        socket.on('file:refresh', getFileTree);
        socket.on('code:update', (data) => {
            console.log("Code Update : " + data);
            setCode(data);
        });

        return () => {
            socket.off('file:refresh', getFileTree);
            socket.off('code:update', setCode);
        }

    }, [getFileTree, setCode]);
}