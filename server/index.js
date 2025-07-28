const express = require("express");
require("dotenv").config();
const connectDB = require("./config/dbConfig");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 8081;

//DB CONNECTION
connectDB();

//Body-Parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

//Default Route
app.get("/", (req, res) => {
  res.json({
    msg: "WELCOME TO KHATABOOK API",
  });
});

app.use("/api/auth", require("./routes/authRoutes"));

app.use("/api", require("./routes/transactionRoutes"));
//Error Handler
// app.use(errorHandler);

app.listen(PORT, () => console.log(`SERVER IS RUNNING AT PORT : ${PORT}`));
