const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const cors = require('cors');

const app = express();
const PORT = 3000;
const SECRET_KEY = 'your_secret_key';

app.use(bodyParser.json());
app.use(cors());

let users = [
  {
    id: 1,
    username: 'user1',
    password: bcrypt.hashSync('password1', 8)
  }
];

// ユーザー登録エンドポイント
app.post('/signup', (req, res) => {
  const { username, password } = req.body;
  const userExists = users.some(u => u.username === username);

  if (userExists) {
    return res.status(400).send({ message: 'ユーザー名は既に使用されています' });
  }

  const hashedPassword = bcrypt.hashSync(password, 8);
  const newUser = {
    id: users.length + 1,
    username,
    password: hashedPassword
  };

  users.push(newUser);
  res.status(201).send({ message: 'ユーザー登録が成功しました' });
});

// ログインエンドポイント
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username);

  if (!user) {
    return res.status(404).send('ユーザーが見つかりません');
  }

  const passwordIsValid = bcrypt.compareSync(password, user.password);

  if (!passwordIsValid) {
    return res.status(401).send('パスワードが無効です');
  }

  const token = jwt.sign({ id: user.id }, SECRET_KEY, { expiresIn: 86400 });

  res.status(200).send({ auth: true, token });
});

app.listen(PORT, () => {
  console.log(`サーバーがポート ${PORT} で起動しました`);
});