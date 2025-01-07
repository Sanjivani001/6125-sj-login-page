const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const User = require("./user.model");  // Import the User model

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.render('login');
});

// Handle POST request to save user data
app.post('/login', async (req, res) => {
  const { username, Email, password } = req.body;

  try {
    // Create a new user instance
    const newUser = new User({
      name: username,  // Use 'username' from the form
      Email: Email,    // Use 'Email' from the form
      password: password  // Use 'password' from the form
    });

    // Save the new user to the database
    await newUser.save();

    // Send success message
    res.send("User created successfully!");
    console.log("User created:", username, Email, password);
  } catch (error) {
    console.log(error);
    res.send("Error creating user.");
  }
});

app.post('/login', async (req, res) => {
  const { Email, password } = req.body;

  try {
    const user = await User.findOne({ Email });

    if (!user) {
      return res.status(400).send("User not found");
    }

    // Check if the password is correct
    const isMatch = await user.isPasswordCorrect(password);

    if (isMatch) {
      res.send("Login successful!");
    } else {
      res.status(400).send("Invalid credentials");
    }

  } catch (error) {
    console.log(error);
    res.status(500).send("Error during login");
  }
});


app.listen(4000, () => {
  console.log("Server started at port 4000");
});
