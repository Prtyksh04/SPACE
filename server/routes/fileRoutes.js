import express from "express";
import { generateFileTree, readFile, writeFile } from "../fileManager.js";

const router = express.Router();

router.get('/files', async (req, res) => {
    try {
        const fileTree = await generateFileTree('./user');
        return res.json({ tree: fileTree });
    } catch (error) {
        res.status(500).json({error : "Failed to generate file tree"});
    }
});

router.get('/files/content', async (req, res) => {
    try {
        const path = req.query.path;

        if(!path){
            return res.status(400).json({error : "Path is required"});
        }
        const content = await readFile(path);
        return res.json({content});
        
    } catch (error) {
        res.status(500).json({error : "Failed to read file"});
    }
});

export default router;