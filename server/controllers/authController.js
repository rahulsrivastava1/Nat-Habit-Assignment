const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/userModels");

const secret = "test";

exports.signup = async (req, res) => {
  const { name, email, password, confirmPassword } = req.body;

  try {
    if (password === confirmPassword) {
      const oldUser = await User.findOne({ email });

      if (oldUser) return res.status(400).json({ msg: "User already exists" });

      const hashedPassword = await bcrypt.hash(password, 12);
      const result = await User.create({
        name,
        email,
        password: hashedPassword,
      });

      res.status(201).json({
        status: "success",
        message: "User added successfully.",
      });
    } else {
      res.status(500).json({ msg: "password doesn't match" });
    }
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (!existingUser)
      return res.status(404).json({ message: "User doesn't exists" });

    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isPasswordCorrect)
      return res.status(400).json({ message: "Invalid Credentials" });

    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      secret
    );

    res.status(201).json({
      status: "success",
      message: "User loggedin successfully.",
      token: token,
    });
  } catch (err) {
    res.status(500).json({ message: err.msg });
  }
};
