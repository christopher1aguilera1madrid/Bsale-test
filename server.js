const express = require("express");
const app = express();
//se levanta el servidor
app.listen(3000, ()=>{
    console.log("servidor levantado")
})
//url base donde se ejecuta la aplicacion de la tienda
app.get("/", (req, res)=>{
    res.sendFile(__dirname + "/index.html")
})