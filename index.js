const express = require('express');
const app = express();
const mysql = require('mysql');

const db = mysql.createConnection({
  user: 'root',
  host: 'localhost',
  password: '123456',
  database: 'userdb',
});

db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('Mysql connected... ');
});

app.use(express.urlencoded({ extended: false })); // when receive data ;
app.use(express.json());
let userList = [
  {
    id: 1,
    name: 'pedro',
    age: 19,
    married: false,
  },
  {
    id: 2,
    name: 'Padulo',
    age: 29,
    married: true,
  },
  {
    id: 3,
    name: 'felipe',
    age: 16,
    married: true,
  },
];

app.get('/users', (req, res) => {
  db.query('SELECT * FROM users', (err, result) => {
    if (err) {
      res.status(400).json(err);
    } else {
      res.status(200).json(result);
    }
  });
});

app.post('/users', (req, res) => {
  const { name, age, married } = req.body;
  db.query(
    'INSERT INTO users (name, age, married) VALUES (?,?,?)',
    [name, age, married],
    (err, result) => {
      if (err) {
        res.status(400).json(err);
      } else {
        res.status(200).json(`user added ! `);
      }
    }
  );
});

app.put('/users', (req, res) => {});

app.delete('/users/:id', (req, res) => {
  const { id } = req.params;
});

app.listen(3001, () => console.log('server is running on port : 3000'));
