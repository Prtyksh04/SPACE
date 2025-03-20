import { useEffect } from "react";
import socket from "../socket";

export default function useSocket(getFileTree, setCode) {

    useEffect(() => {
        socket.on('file:refresh', getFileTree);
        socket.on('code:update', (data) => {
            setCode(data.content);
        });


        return () => {
            socket.off('file:refresh', getFileTree);
            socket.off('code:update', setCode);
        }

    }, [getFileTree, setCode]);
}