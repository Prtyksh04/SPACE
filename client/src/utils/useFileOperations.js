import { useCallback, useEffect, useState } from "react";
import socket from "../socket";
import throttle from 'lodash/throttle';

const BASE_URI = 'http://localhost:9000';

export default function useFileOperations() {
    const [fileTree, setFileTree] = useState([]);
    const [selectedFile, setSelectedFile] = useState('');
    const [selectedFileContent, setSelectedFileContent] = useState('');
    const [code, setCode] = useState('');
    const [isSaving, SetIsSaving] = useState(false);


    const isSaved = code === selectedFileContent;

    const getFileTree = async () => {
        try {
            const response = await fetch(`${BASE_URI}/files`);
            const result = await response.json();
            setFileTree(prevTree => { JSON.stringify(prevTree) === JSON.stringify(result.tree) ? prevTree : result.tree });
            setFileTree(result.tree);
        } catch (error) {
            console.error("Error fetching file tree :", error);
        }
    }

    const getFileContent = useCallback(async () => {
        if (!selectedFile) return;
        try {
            const response = await fetch(`${BASE_URI}/files/content?path=${selectedFile}`);
            const result = await response.json();
            setSelectedFileContent(result.content);
        } catch (error) {
            console.error("Error fetching file content :", error);
        }
    }, [selectedFile]);

    useEffect(() => {
        if (selectedFile) {
            getFileContent();
        }
    }, [getFileContent, selectedFile]);

    const sendThrottleUpdate = useCallback(
        throttle((path,content)=>{
            socket.emit('file:change',{path,content});
        },300),
        []
    )

    useEffect(() => {
        if (code && !isSaved) {
            sendThrottleUpdate(selectedFile, code);
        }
    });

    useEffect(() => {
        if (selectedFile && selectedFileContent) {
            setCode(selectedFileContent);
        }
    }, [selectedFile, selectedFileContent]);

    useEffect(() => {
        setCode('');
    }, [selectedFile]);

    useEffect(() => {
        socket.on('file:saved', ({ path }) => {
            if (path === selectedFile) {
                SetIsSaving(false);
            }
        });

        return () => {
            socket.off('file:saved');
        }
    }, [selectedFile]);

    return { fileTree, selectedFile, setSelectedFile, code, setCode, isSaved, getFileTree, isSaving };
}