const express = require("express");
const app = express();
//funciones para extraer datos del database
const { consultproducts, consultcategories, searchproduct, searchcategory } = require("./sql");
//se levanta el servidor
app.listen(3000, ()=>{
    console.log("servidor levantado")
})
//url base donde se ejecuta la aplicacion de la tienda
app.get("/", (req, res)=>{
    res.sendFile(__dirname + "/index.html")
})
//url donde se guarda todos los productos
app.get('/products', (req, res) => {
//Se extrae datos todos los productos de la database
    consultproducts()
    .then(users => res.send(users))
    .catch(err => console.error(err));
});
//url donde se guarda todas las categorias
app.get('/categories', (req, res) => {
//Se extrae datos de las categorias de la database
    consultcategories()
    .then(users => res.send(users))
    .catch(err => console.error(err));
});
//url donde se guarda el o los productos por nombre
app.get('/product/:name', (req, res) => {
    const { name } = req.params;
//Se extrae datos del o los productos buscados en la database
    searchproduct(name)
    .then(users => res.send(users))
    .catch(err => console.error(err));
});
//url donde se guarda los productos por categoria
app.get('/category/:name', (req, res) => {
    const { name } = req.params;
//Se extrae datos los productos por categoria de la database
    searchcategory(name)
    .then(users => res.send(users))
    .catch(err => console.error(err));
});