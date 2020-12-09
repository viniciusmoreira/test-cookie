const path = require('path');
const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const PORT = process.env.SERVER_PORT || 3000;
const app = express();

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  let contas = req.cookies.contas || [];

  res.render('index', {
    contas
  });
})

app.post('/calc', (req, res) => {
  let total = 0;
  let { num1, num2, op } = req.body;

  num1 = parseInt(num1);
  num2 = parseInt(num2);

  if(op === '+'){
    total = num1 + num2;
  } else if(op === '-'){
    total = num1 - num2;
  } else if(op === '*'){
    total = num1 * num2;
  } else if(op === '/'){
    total = num1 / num2;
  }

  let contas = req.cookies.contas || []

  contas.push({ num1, num2, op, total })

  res.cookie('contas', contas)

  res.redirect('/');
})

app.listen(PORT, error => {
  if(error) {
    console.log('Problemas ao subir servidor.');
  } else {
    console.log('Servidor iniciado com sucesso.');
  }
})