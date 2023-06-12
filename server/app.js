const express = require('express');
const cors = require('cors')
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken')

const app = express();
app.use(cors())

const port = 3030;

app.get('/', (req, res) => {
  res.send('Hello World!');
})

let users = [];
let todos = [];

// 미들웨어 설정
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/auth/signup', (req, res) => {
  const { email, password } = req.body;

  // 회원 데이터 저장
  users.push({ email, password });
  res.json();
})

app.post('/auth/signin', (req, res) => {
  const { email, password } = req.body;

  // 유저 정보 확인
  const user = users.find((user) => user.email === email && user.password === password);

  if (!user) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }

  // JWT 생성
  const token = jwt.sign({ userEmail: user.email }, 'secretKey', { expiresIn: '1h' })

  // JWT를 응답에 포함하여 반환
  res.json({ token });
})

// todo list 불러오기
app.get('/todos', (req, res) => {
  res.json(todos);
})

// todo 추가
app.post('/todos', (req, res) => {
  const { todoValue, length } = req.body;
  todos.push({
    "id": length + 1,
    'todo': todoValue,
    'isCompleted': false,
    'userId': 1,
  })
  res.json(todos)
})

app.put('/todos/done/:id', (req, res) => {
  const todoId = req.params.id;
  const { isCompleted } = req.body;
  const todoToUpdate = todos.find(todo => todo.id === parseInt(todoId));

  if (todoToUpdate) {
    todoToUpdate.isCompleted = isCompleted
  }

  res.json(todoToUpdate)
})

app.put('/todos/edit/:id', (req, res) => {
  const todoId = req.params.id;
  const { todo } = req.body;
  const todoToUpdate = todos.find(todo => todo.id === parseInt(todoId));

  if (todoToUpdate) {
    todoToUpdate.todo = todo
  }

  res.json(todoToUpdate)
})

app.delete('/todos/:id', (req, res) => {
  const todoId = req.params.id;

  todos = todos.filter((v) => v.id !== parseInt(todoId));

  res.json(todos)
})

app.listen(port, () => {
  console.log(`app listening on port ${port}`)
})