// Utility imports
const Database = require("../database.js");
const logger = require("../utils/logger.js");
const ResponeJSON = require("../utils/response.js");
const Validate = require("../utils/validate.js");

// Costom Error Imports
const MissingError = require("../errors/missing.js");
const InternalError = require("../errors/internal.js");
const DuplicateError = require("../errors/duplicate.js");
const InvalidObjectError = require("../errors/object.js");


const userRoutes = (app, fs) => {

  app.all(/api\/user\/.*/, function (req, res, next) {
    Validate.USER(req.body)
      .then(() => next())
      .catch(err => {
        logger(err.stack || err.toString());
        if (err instanceof InvalidObjectError) {
          next(err);
        } else {
          next(new InternalError(`Internal error validating request body against user requirements`));
        }
      });
  })

  app.get('/api/user', (req, res, next) => {
    Database.load()
      .then(() => res.send(JSON.stringify(Database.users)))
      .catch(err => {
        logger(err.stack || err.toString());
        next(new InternalError('Database error'));
      })
  });

  app.post('/api/user', (req, res, next) => {
    Database.load()
      .then(() => {
        const userName = req.body.user;
        Database.addUser(userName)
          .then(() => res.send(ResponeJSON
            .SUCCESS('User Added', `Successfully added user with ID '${userName}' to the database`)))
          .catch(err => {
            logger(err.stack || err.toString());
            if (err instanceof DuplicateError) {
              next(err);
            } else {
              next(new InternalError(`Internal error adding User with ID '${userName}' to the database`));
            }
          })
      })
      .catch(err => {
        logger(err.stack || err.toString());
        next(new InternalError('Error loading Database'));
      });
  });

  app.delete('/api/user/:name', (req, res, next) => {
    Database.load()
      .then(() => {
        const userName = req.params['name'];
        Database.deleteUser(userName)
          .then(() => res.send(ResponeJSON
            .SUCCESS('User Deleted', `Successfully deleted user with ID '${userName}' from the database`)))
          .catch(err => {
            logger(err.stack || err.toString());
            if (err instanceof MissingError) {
              next(err);
            } else {
              next(new InternalError(`Internal error deleting user with ID '${userName}' from the database`));
            }
          });
      })
      .catch(err => {
        logger(err.stack || err.toString());
        next(new InternalError('Error loading database'));    
      });
  });

  app.patch('/api/user/:name', (req, res, next) => {
    Database.load()
      .then(() => {
        const oldUserName = req.params['name'];
        const newUserName = req.body.user;
        Database.renameUser(oldUserName, newUserName)
          .then(() => res.send(ResponeJSON
            .SUCCESS('User Renamed', `Successfully renamed user with ID '${oldUserName}' in the database`)))
          .catch(err => {
            logger(err.stack || err.toString());
            if (err instanceof MissingError || err instanceof DuplicateError) {
              next(err);
            } else {
              next(new InternalError(`Internal error renaming user with ID '${oldUserName}' in the database`));
            }          
          })
      })
      .catch(err => {
        logger(err.stack || err.toString());
        next(new InternalError('Error loading database'));    
      });
  });

};

module.exports = userRoutes;