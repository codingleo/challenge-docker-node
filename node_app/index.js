const ejs = require('ejs')
const express = require('express')
const mysql = require('mysql')

const config = {
  host: 'db',
  user: 'admin',
  password: 'admin',
  database: 'nodedb'
}

const connection = mysql.createConnection(config) 

connection.query('CREATE DATABASE IF NOT EXISTS nodedb')
connection.query('USE nodedb')
connection.query('CREATE TABLE IF NOT EXISTS people (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255))')

const app = express()

app.engine('html', ejs.renderFile);
app.set('view engine', 'ejs');

app.set('views', './views');

app.get('/', async (req, res) => {
  const id = randomIntFromInterval(1, 10)
  const user = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
  const userJson = await user.json()

  connection.query(`INSERT INTO people (name) VALUES ('${userJson.name}')`)
  connection.query('SELECT * FROM people', (err, rows) => {
    if (err) {
      console.log(err)
      return
    }
    const people = rows.map(row => ({ id: row.id, name: row.name}))
    res.render('index.ejs', { people })
    return
  })
})

app.listen(3000, () => {
  console.log('Server is up on port 3000')
})

function randomIntFromInterval(min, max) { // min and max included 
  return Math.floor(Math.random() * (max - min + 1) + min)
}