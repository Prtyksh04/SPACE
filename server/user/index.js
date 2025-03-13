const express = require("express");
const app = express();

app.get('/' , (req,res)=>{res.json({msg : "hello from my own server"})});

app.listen(3000,()=>{console.log("server is started at the port : 3000")});
