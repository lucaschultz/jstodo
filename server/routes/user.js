// Utility imports
const Database = require("../database.js");
const logger = require("../utils/logger.js");
const ResponeJSON = require("../utils/response.js");

// Costom Error Imports
const MissingError = require("../errors/missing.js");
const InternalError = require("../errors/internal.js");
const DuplicateError = require("../errors/duplicate.js");



const userRoutes = (app, fs) => {

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
        Database.addUser(req.body.user)
          .then(() => res.send(ResponeJSON
            .SUCCESS('User Added', `Successfully added user ${req.body.user} to the database`)))
          .catch(err => {
            logger(err.stack || err.toString());
            if (err instanceof DuplicateError) {
              next(err);
            } else {
              next(new InternalError(`Internal error adding User with ID ${req.body.user} to the database`));
            }
          })
      })
      .catch(err => {
        logger(err.stack || err.toString());
        next(new InternalError('Error loading Database'));
      });
  });

  app.delete('/api/user', (req, res, next) => {
    Database.load()
      .then(() => {
        Database.deleteUser(req.body.user)
          .then(() => res.send(ResponeJSON
            .SUCCESS('User Deleted', `Successfully deleted user ${req.body.user} from the database`)))
          .catch(err => {
            logger(err.stack || err.toString());
            if (err instanceof MissingError) {
              next(err);
            } else {
              next(new InternalError(`Internal error deleting user with ID ${req.body.user} from the database`));
            }
          });
      })
      .catch(err => {
        logger(err.stack || err.toString());
        next(new InternalError('Error loading database'));    
      });
  });

  app.put('/api/user/:name', (req, res, next) => {
    Database.load()
      .then(() => {
        Database.renameUser(req.params['name'], req.body.user)
          .then(() => res.send(ResponeJSON
            .SUCCESS('User Renamed', `Successfully renamed user ${req.params['name']} in the database`)))
          .catch(err => {
            logger(err.stack || err.toString());
            if (err instanceof MissingError) {
              next(err);
            } else {
              next(new InternalError(`Internal error renaming user with ID ${req.body.user} in the database`));
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