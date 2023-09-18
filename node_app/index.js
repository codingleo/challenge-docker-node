import { faker } from '@faker-js/faker'
import ejs from 'ejs'
import express from 'express'
import mysql from 'mysql'

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
connection.query(`INSERT INTO people(name) values("${faker.person.fullName()}")`)

const app = express()

app.engine('html', ejs.renderFile);
app.set('view engine', 'ejs');

app.set('views', './views');

app.get('/', (req, res) => {
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