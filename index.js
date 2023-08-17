const express = require("express");
const mysql = require("mysql");
const bodyParser=require("body-parser");
const sequelize=require("sequelize");

const db= mysql.createConnection({
    port:'3306',
    host:'localhost',
    user:'root',
    password:'',
    database:'temp' //inser this value when database is created otherwise blanck it...
})
const app = express();
// Add body-parser middleware to parse JSON data
app.use(bodyParser.json());
//connect 
db.connect((err)=>{
    if(err!=0)
        console.log("MySql connected.....");
     else
     console.log(err);
});

//create DB
app.get("/createdb",(req,res)=>{
    let sql =  "CREATE DATABASE temp";
    db.query(sql,(err,result)=>{
        res.send("Database Created...");
    })
})
//create Table
app.get("/create_table",(req,res)=>{
  let sql = "CREATE TABLE bottel(id INT AUTO_INCREMENT,fullname VARCHAR(255),address VARCHAR (255),PRIMARY KEY (id))"
  console.log("Creating a table initialize");
  
    db.query(sql,(err,result)=>{
        if(result)
        {   console.log(result);
            res.send(" Table created succesfully.....");  
        }
     else if(err)
     console.log(err);
    
    })
})
//Insert Data 
app.post("/postdata1",(req,res)=>{
    let post={fullname:'akash',address:'Dewas Naka'};
    let sql= "INSERT INTO bottel SET ?";
    db.query(sql,post,(err,result)=>{
        if(err) throw err
        console.log(result);
        res.send("Postdata_1 added succcessull....");
    })
})
//data insertion through req.body 
app.post('/postdata2', (req, res) => {
  let details = req.body;              
  let sql = 'INSERT INTO bottel SET ?';
  if (details && details.fullname && details.address) {
    db.query(sql, details, (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send('Error adding postdata.');
      } else {
        console.log(result);
        res.send('Postdata_2 added successfully.');
      }
    });
  } else {
    res.status(400).send('Invalid data provided.');
  }
});

//Fetching data
app.get('/getdata', (req, res) => {
  const sql = 'SELECT * FROM bottel'; // Replace 'your_table_name' with the actual table name
  db.query(sql, (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error fetching data.');
    } else {
      console.log(results);
      res.json(results);
    }
  });
});

//Update Data
app.patch('/update', (req, res) => {
    const newData = ["Zenith_New", "Nandangar_New"];
    db.query('UPDATE bottel SET fullname=?,address=? WHERE id=1', newData, (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send("Error updating data.");
      } else {
        console.log(result);
        res.send("Updated data successfully.");
      }
    });
  });
 
  //Delete Data
  app.delete('/delete', (req, res) => {    
    db.query('DELETE FROM bottel WHERE id=5', (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send("Error deleting data.");
      } else {
        console.log(result);
        res.send("delete data successfully.");
      }
    });
  });

app.listen(3001,()=>{
    console.log("Server Started on port 3001");
});
