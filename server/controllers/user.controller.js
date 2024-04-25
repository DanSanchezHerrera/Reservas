const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require("../models/user.model");

module.exports.register = (req, res) => {
  const user = new User(req.body);
  user
    .save()
    .then(() => {
        res.json({ msg: "success!", user: user });
    })
    .catch(err => res.json(err));
};

module.exports.login = (req, res) => {
  User.findOne({ email: req.body.email })
    .then(user => {
      if (user === null) {
        res.json({ msg: "invalid login attempt" });
      } else {
        bcrypt.compare(req.body.password, user.password)
          .then(passwordIsValid => {
            if (passwordIsValid) {
              // Aquí es donde se necesita hacer el cambio
              const secret = "mysecret"; // Asegúrate de que esta sea tu clave secreta
              const newJWT = jwt.sign({ _id: user._id }, secret); // Crear el token con el secret

              res.cookie("usertoken", newJWT, { httpOnly: true })
                .json({ msg: "success!" });
            } else {
              res.json({ msg: "invalid login attempt" });
            }
          })
          .catch(err => res.json({ msg: "invalid login attempt" }));
      }
    })
    .catch(err => res.json(err));
};

module.exports.findAllUsers = (req, res) => {
  User.find()
    .then((allDaUsers) => res.json({ users: allDaUsers }))
    .catch((err) => res.json({ message: "Something went wrong", error: err }));
};

module.exports.findOneSingleUser = (req, res) => {
  User.findOne({ _id: req.params.id })
    .then((oneSingleUser) => res.json({ user: oneSingleUser }))
    .catch((err) => res.json({ message: "Something went wrong", error: err }));
};

module.exports.createNewUser = (req, res) => {
  User.create(req.body)
    .then((newlyCreatedUser) => res.json({ user: newlyCreatedUser }))
    .catch((err) => res.status(400).json(err));
};

module.exports.updateExistingUser = (req, res) => {
  User.findOneAndUpdate({ _id: req.params.id }, req.body, {
    new: true,
    runValidators: true,
  })
    .then((updatedUser) => res.json({ user: updatedUser }))
    .catch((err) => res.status(400).json(err));
};

module.exports.deleteAnExistingUser = (req, res) => {
  User.deleteOne({ _id: req.params.id })
    .then((result) => res.json({ result: result }))
    .catch((err) => res.json({ message: "Something went wrong", error: err }));
};

module.exports.getAll = (req, res) => {
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json(err));
}

    module.exports.getLoggedInUser = (req, res) => {
      const decodedJWT = jwt.decode(req.cookies.usertoken, { complete: true });
      User.findById(decodedJWT.payload._id)
        .then(user => res.json(user))
        .catch(err => res.json(err));
    }
    
    module.exports.logout = (req, res) => {
      res.clearCookie("usertoken", jwt.sign({ _id: "" }, "secret"), { httpOnly: true })
      res.json({ msg: "usertoken cookie cleared" });
    }



