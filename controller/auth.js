const jwt = require("jsonwebtoken");
const User = require("../model/user");
const bcrypt = require("bcrypt");
const fs = require("fs");
const privateKey = fs.readFileSync("private.key", "utf8");

exports.createUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    if (!password || typeof password !== "string") {
      return res
        .status(400)
        .json({ message: "Password must be provided and be a string" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ ...req.body, password: hashedPassword, email });

    const token = jwt.sign({ email: newUser.email }, privateKey, {
      algorithm: "RS256",
      expiresIn: "1h",
    });

    newUser.token = token;

    await newUser.save();

    res.status(201).json({
      message: "User created successfully",
      user: {
        name: newUser.name,
        password: newUser.password,
        email: newUser.email,
        token: newUser.token,
      },
    });
  } catch (err) {
    console.error("Error creating user:", err.message);
    res.status(500).json({
      message: "An error occurred while creating the user",
      error: err.message,
      stack: err.stack,
    });
  }
};

exports.login = async (req, res) => {
  try {
    const doc = await User.findOne({ email: req.body.email });
    const isAuth = bcrypt.compare(req.body.password, doc.password);
    if (isAuth) {
      var token = jwt.sign({ email: req.body.email }, privateKey, {
        algorithm: "RS256",
        expiresIn: "1h",
      });

      doc.token=token
      doc.save(()=>{
        res.json({ token });

      })
    } else {
      res.sendStatus(401).json(err);
    }
  } catch (err) {
    res.status(401).json(err);
  }
};
