const mysql = require('mysql');
//configuracion para conectarse al database
const db_connection = mysql.createPool({
  host: "mdb-test.c6vunyturrl6.us-west-1.rds.amazonaws.com",
  user: "bsale_test",
  password: "bsale_test",
  database: "bsale_test"
});

//consulta todos los productos en el database
const consultproducts = () => new Promise((resolve, reject) => {
  db_connection.getConnection((err, connection) => {
    if (err) console.error(err);
    connection.query('SELECT * FROM product', (err, results) => {
      if (err) console.error(err);
      resolve(results);
      connection.release(err => { if (err) console.error(err) });
    });
  });
});

//consulta todas las categorias en el database
const consultcategories = () => new Promise((resolve, reject) => {
  db_connection.getConnection((err, connection) => {
    if (err) console.error(err);
    connection.query('SELECT * FROM category', (err, results) => {
      if (err) console.error(err);
      resolve(results);
      connection.release(err => { if (err) console.error(err) });
    });
  });
});

//consulta el o los productos en el database
const searchproduct = (name) => new Promise((resolve, reject) => {
  db_connection.getConnection((err, connection) => {
      if (err) console.error(err);
        let text = `SELECT * FROM product WHERE name like '%${name}%'`
        connection.query(text, (err, results) => {
          if (err) console.error(err);
//consulta si existe el o los productos en el database, de lo contrario mostrara mensaje
          if(results.length==0){
            resolve(results);
            connection.release(err => { if (err) console.error(err) });
          }
          else{
        resolve(results);
        connection.release(err => { if (err) console.error(err) });
          }
      });
  });
});

//consulta los productos en la categoria en el database
const searchcategory = (name) => new Promise((resolve, reject) => {
  db_connection.getConnection((err, connection) => {
    if (err) console.error(err);
//consulta la categoria en el database para extraer el id
    let text = `SELECT * FROM category WHERE name = '${name}'`
    connection.query(text, (err, results) => {
      if (err) console.error(err);
      let id = results[0].id
//consulta la categoria por la id en la informacion de los productos en el database
      let text = `SELECT * FROM product WHERE category = '${id}'`
      connection.query(text, (err, results) => {
        if (err) console.error(err);
        resolve(results);
        connection.release(err => { if (err) console.error(err) });
      });
    });
  });
});

module.exports = {consultproducts, consultcategories, searchproduct, searchcategory};