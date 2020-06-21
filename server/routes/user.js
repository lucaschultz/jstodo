const database = require("../database.js");

const userRoutes = (app, fs) => {

  app.get("/api/user", (req, res) => {
    database.read().then(data => {
      let users = [];
      data.users.forEach(user => {
        users.push({ 'user': user.user});
      });
      res.send(JSON.stringify(users));
    });
  });


};

module.exports = userRoutes;