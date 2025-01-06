const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const userModel = require("./user.model")

app.set('view engine','ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.render('login');
});

app.post('/login', (req, res) => {
  const { username, Email, password } = req.body;
  res.send("user created ! ")
});

app.listen(5000,()=>{
  console.log("server started at port 5000");
})
