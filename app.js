const express = require("express");
const cors = require("cors");

const app = express();
const contactsRouter = require("./app/route/contact.route");

app.use(cors());
app.use(express.json());

app.get("/", (req, res)=>{
    res.json({message : "Welcone to contacts book aplication!"});
});

app.use("/api/contacts", contactsRouter);

module.exports=app;