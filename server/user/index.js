const express = require("express");
const app = express();

app.get('/' , (req,res)=>{res.json({msg : "hello from my own server"})});

app.listen(3000,()=>{console.log("server is started at the port : 3000")});

const a = 3;

const b = 4;

const c = 4;

const d = 5;

console.log(2);

console.log(3);

console.log(4);