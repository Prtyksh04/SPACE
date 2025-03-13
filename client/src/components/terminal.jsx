import { Terminal as XTerminal } from "@xterm/xterm";
import { useEffect, useRef } from "react";
import "@xterm/xterm/css/xterm.css";
import socket from "../socket";


const OPTIONS_TERM = {
    useStyle: true,
    screenKeys: true,
    cursorBlink: true,
    rows:20,
    theme: {
        background: 'black'
    }
}

const Terminal = () => {
    const terminalRef = useRef();
    const isRendered = useRef(false);

    useEffect(() => {
        if (isRendered.current) return;
        isRendered.current = true;

        
        const term = new XTerminal(OPTIONS_TERM);
        term.open(terminalRef.current);
        term.onData((data) => {
            socket.emit('terminal:write', data);


        });

        function onterminalData(data) {
            term.write(data);
        }

        socket.on("terminal:data", onterminalData);

    }, [terminalRef]);

    return (
        <div ref={terminalRef}></div>
    );
};

export default Terminal;
