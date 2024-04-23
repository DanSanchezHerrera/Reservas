const UserController = require("../controllers/user.controller");
const { authenticate } = require("../config/jwt.config");

module.exports = (app) => {
  app.post("/api/register", UserController.register);
  app.post("/api/login", UserController.login);
  // this route now has to be authenticated
  app.get("/api/users", authenticate, UserController.getAll);

  app.get("/api/users/loggedin", authenticate, UserController.getLoggedInUser);
  app.get("/api/users/logout", UserController.logout);

  app.get("/api/users/", UserController.findAllUsers);
  app.get("/api/users/:id", UserController.findOneSingleUser);
  app.put("/api/users/update/:id", UserController.updateExistingUser);
  app.post("/api/users/new", UserController.createNewUser);
  app.delete("/api/users/delete/:id", UserController.deleteAnExistingUser);
};
