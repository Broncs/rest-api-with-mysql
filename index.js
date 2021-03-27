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
  res.status(200).json(userList);
});

app.post('/users', (req, res) => {
  const newUser = req.body;
  userList.push(newUser);
  res.json(userList);
});

app.put('/users', (req, res) => {
  const { newName } = req.body;
  const newUsers = userList.map((user) => {
    return { ...user, name: newName };
  });
  res.json(newUsers);
});

app.delete('/users/:id', (req, res) => {
  const { id } = req.params;

  const found = userList.find((user) => user.id === Number(id));

  if (!found) {
    return res
      .status(400)
      .json({ success: false, msg: `User with id ${id} was not found` });
  }

  const newList = userList.filter((user) => user.id !== Number(id));

  res.json(newList);
});

app.listen(3001, () => console.log('server is running on port : 3000'));
