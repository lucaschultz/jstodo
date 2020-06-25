// Utility imports
import ResponeJSON from '../utils/response.mjs';
import Validate from '../utils/validate.mjs';

// Costom Error Imports
import MissingError from '../errors/missing.mjs';
import InternalError from '../errors/internal.mjs';
import DuplicateError from '../errors/duplicate.mjs';
import InvalidObjectError from '../errors/object.mjs';


const listRoutes = (app, database, logger) => {

  app.all(/api\/list\/.*/, function (req, res, next) {
    Validate.LIST(req.body)
      .then(() => next())
      .catch(err => {
        logger.log(err.stack || err.toString());
        if (err instanceof InvalidObjectError) {
          next(err);
        } else {
          next(new InternalError(`Internal error validating request body against list requirements`));
        }
      });
  })

  app.get('/api/list/:username', (req, res, next) => {
    database.load()
      .then(() => {
        const userName = req.params['username'];
        database.getLists(userName)
          .then(lists => res.send(JSON.stringify(lists)))
          .catch(err => {
            logger.log(err.stack || err.toString());
            if (err instanceof MissingError) {
              next(err);
            } else {
              next(new InternalError(`Internal getting lists of user with ID '${userName}'`));
            }            
          })
      })
      .catch(err => {
        logger.log(err.stack || err.toString());
        next(new InternalError('database error'));
      })
  });

  app.post('/api/list/:username', (req, res, next) => {
    database.load()
      .then(() => {
        const userName = req.params['username'];
        const listName = req.body.name;
        database.addList(userName, listName)
          .then(() => res.send(ResponeJSON
            .SUCCESS('List Added', `Successfully added list with ID '${listName}' of user '${userName}'`)))
          .catch(err => {
            logger.log(err.stack || err.toString());
            if (err instanceof MissingError || err instanceof DuplicateError) {
              next(err);
            } else {
              next(new InternalError(`Internal error adding list with ID '${listName}' of user '${userName}'`));
            }
          })
      })
      .catch(err => {
        logger.log(err.stack || err.toString());
        next(new InternalError('Error loading database'));
      });
  });


  app.patch('/api/list/:username/:listname', (req, res, next) => {
    database.load()
      .then(() => {
        const userName = req.params['username'];
        const oldListName = req.params['listname'];
        const newListName = req.body.name;
        database.renameList(userName, oldListName, newListName)
          .then(() => res.send(ResponeJSON
            .SUCCESS('List Renamed', `Successfully renamed list with ID '${oldListName}' of user '${userName}'`)))
          .catch(err => {
            logger.log(err.stack || err.toString());
            if (err instanceof MissingError || err instanceof DuplicateError) {
              next(err);
            } else {
              next(new InternalError(`Internal error renaming list with ID '${oldListName}' of user '${userName}'`));
            }
          })
      })
      .catch(err => {
        logger.log(err.stack || err.toString());
        next(new InternalError('Error loading database'));    
      });
  });

  app.delete('/api/list/:username/:listname', (req, res, next) => {
    database.load()
      .then(() => {
        const userName = req.params['username'];
        const oldListName = req.params['listname'];
        database.deleteList(userName, oldListName)
          .then(() => res.send(ResponeJSON
            .SUCCESS('List Deleted', `Successfully deleted list with ID '${oldListName}' of user '${userName}'`)))
          .catch(err => {
            logger.log(err.stack || err.toString());
            if (err instanceof MissingError) {
              next(err);
            } else {
              next(new InternalError(`Internal error deleting list with ID '${oldListName}' of user '${userName}'`));
            }
          });
      })
      .catch(err => {
        logger.log(err.stack || err.toString());
        next(new InternalError('Error loading database'));    
      });
  });
};

export default listRoutes;