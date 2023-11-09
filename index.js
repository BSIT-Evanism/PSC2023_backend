const mysql = require('mysql');
const express = require('express')
const cors = require('cors')

const port = 3000

const app = express()

app.use(cors())

const connection = mysql.createConnection({
          host: 'localhost',
          user: 'root',
          password: '392002',
          database: 'seoul'
      })

connection.connect();

app.get('/users', (req, res) => {
    connection.query('SELECT * FROM users', (error, results, fields) => {
        if (error) throw error;
        res.json(results);
      });
})

app.get('/api/users',(req,res) => {
    const {username,password} = req.query
    connection.query('SELECT * FROM users WHERE Username = ? AND Password = ?', [username,password], (error,results,fields) => {
        if (error) throw error;
        res.json(results[0])
    })
})

app.post('/create', (req, res) => {
      const { username, password, fullname, gender, birthdate, numberoffamily} = req.body;

      connection.query('INSERT INTO accounts (Username, Password, FullName, Gender, BirthDate, FamilyCount) VALUES (?, ?)', [username, password, fullname, gender, birthdate, numberoffamily], (error, results, fields) => {
            if (error) throw error;
            res.json(results);
          });
    });

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })
