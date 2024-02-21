const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res)=>{
    res.json({message : "Welcone to contacts book aplication!"});
});

module.exports=app;