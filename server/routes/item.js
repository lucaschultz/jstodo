// Utility imports
const Database = require("../database.js");
const logger = require("../utils/logger.js");
const ResponeJSON = require("../utils/response.js");

// Costom Error Imports
const MissingError = require("../errors/missing.js");
const InternalError = require("../errors/internal.js");
const DuplicateError = require("../errors/duplicate.js");



const itemRoutes = (app, fs) => {

  app.post('/api/item/:username/:listname', (req, res, next) => {
    Database.load()
      .then(() => {
        const userName = req.params['username'];
        const listName = req.params['listname'];
        const item = req.body;
        Database.addItem(userName, listName, item)
          .then(() => res.send(ResponeJSON
            .SUCCESS('Item Added', `Successfully added item '${item.name}' to list '${listName}' of user '${userName}'`)))
          .catch(err => {
            logger(err.stack || err.toString());
            if (err instanceof MissingError || err instanceof DuplicateError) {
              next(err);
            } else {
              next(new InternalError(`Internal error adding item '${item.name}' to list '${listName}' of user '${userName}'`));
            }
          })
      })
      .catch(err => {
        logger(err.stack || err.toString());
        next(new InternalError('Error loading Database'));
      });
  });

  app.put('/api/item/:username/:listname/:itemname', (req, res, next) => {
    Database.load()
      .then(() => {
        const userName = req.params['username'];
        const listName = req.params['listname'];
        const itemName = req.params['itemname'];
        const item = req.body;
        Database.updateItem(userName, listName, itemName, item)
          .then(() => res.send(ResponeJSON
            .SUCCESS('Item Updated', `Successfully updated item '${item.name}' in list '${listName}' of user '${userName}'`)))
          .catch(err => {
            logger(err.stack || err.toString());
            if (err instanceof MissingError || err instanceof DuplicateError) {
              next(err);
            } else {
              next(new InternalError(`Internal error updating item '${item.name}' in list '${listName}' of user '${userName}'`));
            }
          })
      })
      .catch(err => {
        logger(err.stack || err.toString());
        next(new InternalError('Error loading database'));    
      });
  });

  app.delete('/api/item/:username/:listname/:itemname', (req, res, next) => {
    Database.load()
      .then(() => {
        const userName = req.params['username'];
        const listName = req.params['listname'];
        const itemName = req.params['itemname'];
        Database.deleteItem(userName, listName, itemName)
          .then(() => res.send(ResponeJSON
            .SUCCESS('Item Deleted', `Successfully deleted item '${itemName}' in list '${listName}' of user '${userName}'`)))
          .catch(err => {
            logger(err.stack || err.toString());
            if (err instanceof MissingError) {
              next(err);
            } else {
              next(new InternalError(`Internal error deleting item '${itemName}' in list '${listName}' of user '${userName}'`));
            }
          });
      })
      .catch(err => {
        logger(err.stack || err.toString());
        next(new InternalError('Error loading database'));    
      });
  });
};

module.exports = itemRoutes;