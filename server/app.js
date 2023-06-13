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
  res.status(201).json();
})

app.post('/auth/signin', (req, res) => {
  const { email, password } = req.body;

  // 유저 정보 확인
  const user = users.find((user) => user.email === email && user.password === password);

  if (!user) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }

  // JWT 생성
  const access_token = jwt.sign({ userEmail: user.email }, 'secretKey', { expiresIn: '1h' })

  // JWT를 응답에 포함하여 반환
  res.status(200).json({ access_token });
})

// JWT 토큰 인증 미들웨어
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  console.log(authHeader, token)

  if (token == null) {
    return res.sendStatus(401); // 토큰이 없는 경우
  }

  jwt.verify(token, 'secretKey', (err, decoded) => {
    if (err) {
      return res.sendStatus(403); // 토큰이 유효하지 않은 경우
    }

    // 토큰이 유효한 경우, decoded 객체에서 userEmail을 추출하여 사용할 수 있습니다.
    const userEmail = decoded.userEmail;

    // 추출한 userEmail을 요청 객체에 추가합니다.
    req.userEmail = userEmail;

    next();
  });
}

// todo list 불러오기
app.get('/todos', authenticateToken, (req, res) => {
  res.status(200).json(todos);
})

// todo 추가
app.post('/todos', authenticateToken, (req, res) => {
  const { todo } = req.body;
  todos.push({
    'todo': todo,
  })
  res.status(201).json(todos)
})

app.put('/todos/:id', authenticateToken, (req, res) => {
  const todoId = req.params.id;
  const { todo, isCompleted } = req.body;
  const todoToUpdate = todos.find(todo => todo.id === parseInt(todoId));

  if (todoToUpdate) {
    todoToUpdate.todo = todo
    todoToUpdate.isCompleted = isCompleted
  }

  res.status(200).json(todoToUpdate)
})

app.delete('/todos/:id', authenticateToken, (req, res) => {
  const todoId = req.params.id;

  todos = todos.filter((v) => v.id !== parseInt(todoId));
})

app.listen(port, () => {
  console.log(`app listening on port ${port}`)
})