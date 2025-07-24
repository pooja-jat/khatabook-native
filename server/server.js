const express = require("express");
require("dotenv").config();
const connectDB = require("./config/dbConfig");

const app = express();
const PORT = process.env.PORT || 3000;

//DB CONNECTION
connectDB();

//Body-Parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Default Route
app.get("/", (req, res) => {
  res.json({
    msg: "WELCOME TO KHATABOOK API",
  });
});

//Error Handler
// app.use(errorHandler);

app.listen(PORT, () => console.log(`SERVER IS RUNNING AT PORT : ${PORT}`));
