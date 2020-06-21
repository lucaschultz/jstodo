const database = require("../database.js");
const NotFoundError = require("../errors/notFound.js");
const InternalError = require("../errors/internal.js");

const userRoutes = (app, fs) => {

  app.get("/api/user", (req, res, next) => {
    // Lies von der Datenbank ...
    database.read().then(data => {
      try {
        let users = [];
        // ... sortiere alle user in ein Array ...
        data.users.forEach(user => {
          users.push({ 'user': user.user});
        });
        // ... und schicke es als Antwort.
        res.send(JSON.stringify(users));
      }
      catch (err) {
        // Falls das schief geht logge den Fehler ...
        console.log(err);
        // ... und präsentiere dem Client eine kurze Variante
        return next(new InternalError('Database Error!'));
      }
    });
  });


};

module.exports = userRoutes;