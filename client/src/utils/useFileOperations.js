import { useCallback , useEffect , useState } from "react";
import socket from "../socket";

const BASE_URI = 'http://localhost:9000';

export default function useFileOperations() {
    const [fileTree, setFileTree] = useState([]);
    const [selectedFile, setSelectedFile] = useState('');
    const [selectedFileContent, setSelectedFileContent] = useState('');
    const [code, setCode] = useState('');


    const isSaved = code === selectedFileContent;

    const getFileTree = async () => {
        try {
            const response = await fetch(`${BASE_URI}/files`);
            const result = await response.json();
            setFileTree(result.tree);
        } catch (error) {
            console.error("Error fetching file tree :" , error);
        }
    }

    const getFileContent = useCallback(async () => {
        if (!selectedFile) return;
        try {
            const response = await fetch(`${BASE_URI}/files/content?path=${selectedFile}`);
            const result = await response.json();
            setSelectedFileContent(result.content);
        } catch (error) {
            console.error("Error fetching file content :" , error);
        }
    },[selectedFile]);

    useEffect(()=>{
        if(selectedFile){
            getFileContent();
        }
    },[getFileContent,selectedFile]);
    
    useEffect(()=>{
        if(code && !isSaved){
            const timer = setTimeout(()=>{
                socket.emit('file:change',{path : selectedFile , content : code});
            },5000);

            return ()=>{clearTimeout(timer)};
        }
    });

    useEffect(()=>{
        if(selectedFile && selectedFileContent){
            setCode(selectedFileContent);
        }
    },[selectedFile,selectedFileContent]);

    useEffect(()=>{
        setCode('');
    },[selectedFile]);

    return {fileTree , selectedFile , setSelectedFile , code , setCode , isSaved , getFileTree};
}