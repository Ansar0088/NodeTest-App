const fs = require("fs");
const json = JSON.parse(fs.readFileSync("public/data.json", "utf-8"));
const users = json.users;

exports.createUser = (req, res) => {
    console.log(req.body)
    users.push(req.body);
    res.status(201).json(req.body);
  };
  exports.getAllUser = (req, res) => {
    res.json(users);
  };
  
  exports.getUser = (req, res) => {
    const id = req.params.id ? +req.params.id : null;
  
    if (id) {
      const user = users.find((p) => p.id === id);
      if (user) {
        res.json(user);
      } else {
        res.status(404).json({ message: "user not found" });
      }
    } else {
      res.json(users);
    }
  };
  exports.updateUser = (req, res) => {
    const id = +req.params.id;
    const userIndex = users.findIndex((p) => p.id === id);
    const user = users[userIndex];
    users.splice(userIndex, 1, { ...user, ...req.body });
    res.status(201).json();
  };
  exports. replaceUser = (req, res) => {
    const id = +req.params.id;
    const userIndex = users.findIndex((p) => p.id === id);
    users.splice(userIndex, 1, { ...req.body, id: id });
    res.status(201).json();
  };
  exports.deleteUser = (req, res) => {
    const id = +req.params.id;
    const userIndex = users.findIndex((p) => p.id === id);
    const user = users[userIndex];
    user.splice(userIndex, 1);
    console.log("gyaa---------", user);
    res.status(201).json(users);
  };