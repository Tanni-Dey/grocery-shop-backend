const express = require("express");
const cors = require("cors");
const mysql = require("mysql");
const app = express();

app.use(express.json());
app.use(cors());

//database connection
const db = mysql.createConnection({
  host: "sql12.freesqldatabase.com",
  user: "sql12651031",
  password: "RA2QwK2Kh6",
  database: "sql12651031",
});

// ---------- CURD api start--------------

//get All products
app.get("/products", (req, res) => {
  const sql = "SELECT * FROM products";
  db.query(sql, (err, data) => {
    if (err) return res.json("Product Not Found");
    return res.json(data);
  });
});

//insert product
app.post("/add-product", (req, res) => {
  const sql =
    "INSERT INTO products (`name`,`description`,`price`,`image`) VALUES (?)";
  const values = [
    req.body.name,
    req.body.description,
    req.body.price,
    req.body.image,
  ];
  db.query(sql, [values], (err, data) => {
    if (err) return res.send("Product Not inserted");
    return res.send(data);
  });
});

//update product
app.put("/update-product/:id", (req, res) => {
  const sql =
    "update products set `name` = ?,`description`= ?,`price` = ?,`image` = ? where ID = ?";
  const values = [
    req.body.name,
    req.body.description,
    req.body.price,
    req.body.image,
  ];

  const id = req.params.id;

  db.query(sql, [...values, id], (err, data) => {
    if (err) return res.send("Product Not updated");
    return res.send(data);
  });
});

//delete product
app.delete("/delete-product/:id", (req, res) => {
  const sql = "DELETE FROM products WHERE ID = ?";
  const id = req.params.id;

  db.query(sql, [id], (err, data) => {
    if (err) return res.send("Product Not Deleted");
    return res.send(data);
  });
});

// ---------- CURD api end--------------

app.get("/", (req, res) => {
  res.send("grocery-shop");
});

app.listen(3306, () => {
  console.log("grocery-shop connected");
});

module.exports = app;
