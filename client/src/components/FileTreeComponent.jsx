import FileTree from "./tree";

export default function FileTreeComponent({fileTree , onSelect}){
    return (
        <div className="files">
            <FileTree onSelect={onSelect} tree={fileTree} />
        </div>
    )
}