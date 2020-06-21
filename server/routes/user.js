const database = require("../database.js");

const userRoutes = (app, fs) => {

  app.get("/api/user", (req, res) => {
    database.read().then((data) => res.send(data));
  });


};

module.exports = userRoutes;