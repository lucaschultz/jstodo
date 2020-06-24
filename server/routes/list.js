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
        const userName = req.params['username'];
        Database.getLists()
          .then(lists => res.send(JSON.stringify(lists)))
          .catch(err => {
            logger(err.stack || err.toString());
            if (err instanceof MissingError) {
              next(err);
            } else {
              next(new InternalError(`Internal getting lists of user with ID '${userName}'`));
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
        const userName = req.params['username'];
        const listName = req.body.name;
        Database.addList(userName, listName)
          .then(() => res.send(ResponeJSON
            .SUCCESS('List Added', `Successfully added list with ID '${listName}' of user '${userName}'`)))
          .catch(err => {
            logger(err.stack || err.toString());
            if (err instanceof MissingError || err instanceof DuplicateError) {
              next(err);
            } else {
              next(new InternalError(`Internal error adding list with ID '${listName}' of user '${userName}'`));
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
        const userName = req.params['username'];
        const oldListName = req.params['listname'];
        const newListName = req.body.name;
        Database.renameList(userName, oldListName, newListName)
          .then(() => res.send(ResponeJSON
            .SUCCESS('List Renamed', `Successfully renamed list with ID '${oldListName}' of user '${userName}'`)))
          .catch(err => {
            logger(err.stack || err.toString());
            if (err instanceof MissingError || err instanceof DuplicateError) {
              next(err);
            } else {
              next(new InternalError(`Internal error renaming list with ID '${oldListName}' of user '${userName}'`));
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
        const userName = req.params['username'];
        const oldListName = req.params['listname'];
        Database.deleteList(userName, oldListName)
          .then(() => res.send(ResponeJSON
            .SUCCESS('List Deleted', `Successfully deleted list with ID '${oldListName}' of user '${userName}'`)))
          .catch(err => {
            logger(err.stack || err.toString());
            if (err instanceof MissingError) {
              next(err);
            } else {
              next(new InternalError(`Internal error deleting list with ID '${oldListName}' of user '${userName}'`));
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