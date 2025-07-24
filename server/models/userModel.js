const { defalt: mongoose } = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please Enter Name"],
    },
    email: {
      type: String,
      unique: true,
      required: [true, "Please Enter Email"],
    },

    password: {
      type: String,
      required: [true, "Please Enter Password"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("USER", userSchema);
