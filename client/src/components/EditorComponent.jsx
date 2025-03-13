import { Editor } from "@monaco-editor/react";

const languageMap = {
    js: 'javascript',
    py: 'python',
    java: 'java',
    html: 'html',
    css: 'css',
    json: 'json',
    sql: 'sql',
    xml: 'xml',
    sh: 'shell',
    yml: 'yaml',
    yaml: 'yaml',
    md: 'markdown',
    txt: 'plaintext',
};

const getLanguage = (fileName)=>{
    if(!fileName) return 'plaintext';
    const extention = fileName.split('.').pop().toLowerCase();
    return languageMap[extention] || 'plaintext';
}



export default function EditorComponent({selectedFile , code, setCode}) {
    return (
        <div className="editor">
            {selectedFile && <p>
                {selectedFile.replaceAll('/', ' > ')}
            </p>}
            <Editor
                height="100%"
                width='100%'
                language={getLanguage(selectedFile)}
                defaultValue="// some comment"
                theme="vs-dark"
                value={code}
                onChange={(value) => { setCode(value) }}
            />
        </div>
    )
}