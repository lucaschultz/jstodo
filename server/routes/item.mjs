// Utility imports
import ResponeJSON from '../utils/response.mjs';
import Validate from '../utils/validate.mjs';

// Costom Error Imports
import MissingError from '../errors/missing.mjs';
import InternalError from '../errors/internal.mjs';
import DuplicateError from '../errors/duplicate.mjs';
import InvalidObjectError from '../errors/object.mjs';


const itemRoutes = (app, database, logger) => {

  app.all(/api\/item\/.*/, function (req, res, next) {
    Validate.ITEM(req.body)
      .then(() => next())
      .catch(err => {
        logger.log(err.stack || err.toString());
        if (err instanceof InvalidObjectError) {
          next(err);
        } else {
          next(new InternalError(`Internal error validating request body against item requirements`));
        }
      });
  })

  app.post('/api/item/:username/:listname', (req, res, next) => {
    database.load()
      .then(() => {
        const userName = req.params['username'];
        const listName = req.params['listname'];
        const item = req.body;
        database.addItem(userName, listName, item)
          .then(() => res.send(ResponeJSON
            .SUCCESS('Item Added', `Successfully added item '${item.name}' to list '${listName}' of user '${userName}'`)))
          .catch(err => {
            logger.log(err.stack || err.toString());
            if (err instanceof MissingError || err instanceof DuplicateError) {
              next(err);
            } else {
              next(new InternalError(`Internal error adding item '${item.name}' to list '${listName}' of user '${userName}'`));
            }
          })
      })
      .catch(err => {
        logger.log(err.stack || err.toString());
        next(new InternalError('Error loading database'));
      });
  });

  app.put('/api/item/:username/:listname/:itemname', (req, res, next) => {
    database.load()
      .then(() => {
        const userName = req.params['username'];
        const listName = req.params['listname'];
        const itemName = req.params['itemname'];
        const item = req.body;
        database.updateItem(userName, listName, itemName, item)
          .then(() => res.send(ResponeJSON
            .SUCCESS('Item Updated', `Successfully updated item '${item.name}' in list '${listName}' of user '${userName}'`)))
          .catch(err => {
            logger.log(err.stack || err.toString());
            if (err instanceof MissingError || err instanceof DuplicateError) {
              next(err);
            } else {
              next(new InternalError(`Internal error updating item '${item.name}' in list '${listName}' of user '${userName}'`));
            }
          })
      })
      .catch(err => {
        logger.log(err.stack || err.toString());
        next(new InternalError('Error loading database'));    
      });
  });

  app.delete('/api/item/:username/:listname/:itemname', (req, res, next) => {
    database.load()
      .then(() => {
        const userName = req.params['username'];
        const listName = req.params['listname'];
        const itemName = req.params['itemname'];
        database.deleteItem(userName, listName, itemName)
          .then(() => res.send(ResponeJSON
            .SUCCESS('Item Deleted', `Successfully deleted item '${itemName}' in list '${listName}' of user '${userName}'`)))
          .catch(err => {
            logger.log(err.stack || err.toString());
            if (err instanceof MissingError) {
              next(err);
            } else {
              next(new InternalError(`Internal error deleting item '${itemName}' in list '${listName}' of user '${userName}'`));
            }
          });
      })
      .catch(err => {
        logger.log(err.stack || err.toString());
        next(new InternalError('Error loading database'));    
      });
  });
};

export default itemRoutes;