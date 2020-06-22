const Database = require("../database.js");
const NotFoundError = require("../errors/notFound.js");
const InternalError = require("../errors/internal.js");
const DuplicateError = require("../errors/duplicate.js");
const logger = require("../utils/logger.js");
const ResponeJSON = require("../utils/response.js");



const userRoutes = (app, fs) => {

  app.get("/api/user", (req, res, next) => {
    Database.load()
      .then(() => res.send(JSON.stringify(Database.users)))
      .catch(err => {
        logger(err.stack || err.toString());
        next(new InternalError('Database Error!'));
      })
  });

  app.post("/api/user", (req, res, next) => {
    Database.load()
      .then(() => {
        Database.addUser(req.body.user)
          .then(() => res.send(ResponeJSON.SUCCESS('User Created', `Successfully created user ${req.body.user}!`)))
          .catch(err => {
            logger(err.stack || err.toString());
            next(new DuplicateError(`User ${req.body.user} already exists!`));
          })
      })
      .catch(err => {
        logger(err.stack || err.toString());
        next(new InternalError('Database Error!'));
      });
  });

};

module.exports = userRoutes;