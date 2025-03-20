import { memo } from "react";

const FileTreeNode = ({ FileName, nodes, onSelect, path }) => {
    const isDir = !!nodes;
    return (
        <div
            onClick={(e) => {
                e.stopPropagation();
                if (isDir) {
                    return;
                }
                onSelect(path);
            }}
            style={{ marginLeft: 10 }}>
            <p className={isDir ? '' : "file-node"}>{FileName}</p>
            {nodes && FileName !== 'node_modules'
             &&
                <ul>
                    {Object.keys(nodes).map(child => (
                        <li key={child}>
                            <FileTreeNode
                                onSelect={onSelect}
                                path={path + '/' + child}
                                FileName={child}
                                nodes={nodes[child]}
                            />
                        </li>
                    ))}
                </ul>
            }
        </div>
    )
}


const FileTree = memo(({ tree, onSelect }) => {
    console.log(tree);
    return (
        <FileTreeNode
            fileName="/"
            onSelect={onSelect}
            path=""
            nodes={tree}
        />
    );
});

export default FileTree;