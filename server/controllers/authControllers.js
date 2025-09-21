const bcrypt = require("bcryptjs");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

//Register User
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  //Check If all  fields are coming

  if (!email || !name || !password) {
    return res.status(400).json("Invalid details");
  }

  //Check if password length atleast 8 character Long
  if (password.length < 8) {
    return res.status(400).json("Password Length Must Be 8 Character Long");
  }
  //Check if user already exists
  const emailExist = await User.findOne({ email: email });

  if (emailExist) {
    return res.status(400).json("User Already Exist");
  }

  //Hash Password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  //Create User
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  if (!user) {
    return res.status(400).json("User Not Created");
  }

  res.status(201).json({
    name: user.name,
    email: user.email,
    createdAt: user.createdAt,
    token: generateToken(user._id),
  });
};

//Login User
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  //Check if all fields are coming
  if (!email || !password) {
    return res.status(400).json("Invalid Credentials");
  }

  //Find If user Exist
  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(200).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
      createdAt: user.createdAt,
    });
  } else {
    return res.status(400).json("Invalid Credentials");
  }
};

const privateController = (req, res) => {
  res.json(req.user);
};

//Generate Token

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

module.exports = { registerUser, loginUser, privateController };
