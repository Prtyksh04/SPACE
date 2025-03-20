import { useEffect, useState } from "react";
import "./App.css";
import Terminal from "./components/terminal";
import FileTreeComponent from "./components/FileTreeComponent";
import useSocket from "./utils/useSocket";
import EditorComponent from "./components/EditorComponent";
import useFileOperations from "./utils/useFileOperations";

const INSTANCE_URI = "http://localhost:3000/";

function App() {
  const { fileTree, selectedFile, setSelectedFile, code, setCode, getFileTree } = useFileOperations();
  // const [showOutput, setShowOutput] = useState(false);

  useSocket(getFileTree, setCode);

  useEffect(() => {
    getFileTree();
  }, []);

  return (
    <div className="playground-container">
      {/* Editor & File Tree */}
      <div className="editor-container">
        <FileTreeComponent fileTree={fileTree} onSelect={setSelectedFile} />
        <EditorComponent selectedFile={selectedFile} code={code} setCode={setCode} />
      </div>

      {/* Terminal with Toggle Output Button */}
      <div className="terminal-container">
        <Terminal />
        {/* <button
          onClick={() => setShowOutput(!showOutput)}
          className="show-output-btn"
        >
          {showOutput ? "Hide Output" : "Show Output"}
        </button> */}
      </div>

      {/* Animated Output Section */}
      {/* {showOutput && (
        <div className="output-container">
          <iframe
            src={INSTANCE_URI}
            width="100%"
            height="100%"
            title="Output Preview"
          />
        </div>
      )} */}
    </div>
  );
}

export default App;
