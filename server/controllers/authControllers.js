const bcrypt = require("bcryptjs");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

//Register User
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  //Check If all  fields are coming

  if (!email || !name || !password) {
    res.status(400);
    throw new Error("Please Fill All Details!!");
  }

  //Check if password length atleast 8 character Long
  if (password.length < 8) {
    res.status(400);
    throw new Error("Password Length Must Be 8 Character Long");
  }
  //Check if user already exists
  const emailExist = await User.findOne({ email: email });

  if (emailExist) {
    res.status(400);
    throw new Error("User Already Exist");
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
    res.status(400);
    throw new Error("User Not Created");
  }

  res.status(201).json({
    name: user.name,
    email: user.email,
    createdAt: user.createdAt,
    token: generatToken(user._id),
  });
};

//Login User
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  //Check if all fields are coming
  if (!email || !password) {
    res.status(400);
    throw new Error("Please Fill All Details!!");
  }

  //Find If user Exist
  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(200).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generatToken(user._id),
      createdAt: user.createdAt,
    });
  } else {
    res.status(406).json("Invalid Credentials");
    throw new Error("Invalid Credentials");
  }
};

const privateController = (req, res) => {
  res.json(req.user);
};

//Generate Token

const generatToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

module.exports = { registerUser, loginUser, privateController };
