// Utility imports
const Database = require("../database.js");
const logger = require("../utils/logger.js");
const ResponeJSON = require("../utils/response.js");

// Costom Error Imports
const MissingError = require("../errors/missing.js");
const InternalError = require("../errors/internal.js");
const DuplicateError = require("../errors/duplicate.js");



const listRoutes = (app, fs) => {

  app.get('/api/list/:username', (req, res, next) => {
    Database.load()
      .then(() => {
        Database.getLists(req.params['username'])
          .then(lists => res.send(JSON.stringify(lists)))
          .catch(err => {
            logger(err.stack || err.toString());
            if (err instanceof MissingError) {
              next(err);
            } else {
              next(new InternalError(`Internal getting lists of user with ID ${req.body.user} from the database`));
            }            
          })
      })
      .catch(err => {
        logger(err.stack || err.toString());
        next(new InternalError('Database error'));
      })
  });

  app.post('/api/list/:username', (req, res, next) => {
    Database.load()
      .then(() => {
        Database.addList(req.params['username'], req.body.name)
          .then(() => res.send(ResponeJSON
            .SUCCESS('List Added', `Successfully added list ${req.body.name} of user ${req.params['username']} to the database`)))
          .catch(err => {
            logger(err.stack || err.toString());
            if (err instanceof MissingError || err instanceof DuplicateError) {
              next(err);
            } else {
              next(new InternalError(`Internal error adding list ${req.body.name} of user with ID ${req.params['username']} to the database`));
            }
          })
      })
      .catch(err => {
        logger(err.stack || err.toString());
        next(new InternalError('Error loading Database'));
      });
  });


  app.patch('/api/list/:username/:listname', (req, res, next) => {
    Database.load()
      .then(() => {
        Database.renameList(req.params['username'], req.params['listname'], req.body.name)
          .then(() => res.send(ResponeJSON
            .SUCCESS('List Renamed', `Successfully renamed list ${req.params['listname']} of user ${req.params['username']} in the database`)))
          .catch(err => {
            logger(err.stack || err.toString());
            if (err instanceof MissingError) {
              next(err);
            } else {
              next(new InternalError(`Internal error renaming list with ID ${req.params['listname']} of user ${req.params['username']} in the database`));
            }
          })
      })
      .catch(err => {
        logger(err.stack || err.toString());
        next(new InternalError('Error loading database'));    
      });
  });

  app.delete('/api/list/:username/:listname', (req, res, next) => {
    Database.load()
      .then(() => {
        Database.deleteList(req.params['username'], req.params['listname'])
          .then(() => res.send(ResponeJSON
            .SUCCESS('List Deleted', `Successfully deleted list ${req.params['listname']} of user ${req.params['username']} from the database`)))
          .catch(err => {
            logger(err.stack || err.toString());
            if (err instanceof MissingError) {
              next(err);
            } else {
              next(new InternalError(`Internal error deleting list with ID ${req.params['listname']} of user ${req.params['username']} from the database`));
            }
          });
      })
      .catch(err => {
        logger(err.stack || err.toString());
        next(new InternalError('Error loading database'));    
      });
  });
};

module.exports = listRoutes;