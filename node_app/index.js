import express from 'express'
import mysql from 'mysql'

const config = {
  host: 'db',
  port: 3306,
  use: 'admin',
  password: 'admin'
}

const connection = mysql(config)

const app = express()

app.get('/', (req, res) => {
    res.send('<h1>Full Cycle Rocks!</h1>')
})

app.listen(3000, () => {
  console.log('Server is up on port 3000')
})