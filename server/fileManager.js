import fs from "fs";
import path from "path";

async function generateFileTree(directory) {
    const tree = {}

    async function buildTree(currDir, currTree) {
        const files = await fs.promises.readdir(currDir)

        for (const file of files) {
            const filePath = path.join(currDir, file)
            const stat = await fs.promises.stat(filePath)

            if (stat.isDirectory()) {
                currTree[file] = {}
                await buildTree(filePath, currTree[file])
            } else {
                currTree[file] = null
            }
        }
    }

    await buildTree(directory, tree);
    return tree;
}


async function readFile(path){
    return await fs.promises.readFile(`./user${path}`,'utf-8');
}

async function writeFile(path,content){
    return fs.promises.writeFile(`./user${path}`,content);
}

export {generateFileTree,readFile,writeFile};