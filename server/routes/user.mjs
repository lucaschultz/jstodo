// Utility imports
import ResponseJSON from '../utils/response.mjs';
import Validate from '../utils/validate.mjs';

// Costom Error Imports
import MissingError from '../errors/missing.mjs';
import InternalError from '../errors/internal.mjs';
import DuplicateError from '../errors/duplicate.mjs';
import InvalidObjectError from '../errors/object.mjs';


const userRoutes = (app, database, logger) => {

  app.all(/api\/user\/.*/, function (req, res, next) {
    Validate.USER(req.body)
      .then(() => next())
      .catch(err => {
        logger.log(err.stack || err.toString());
        if (err instanceof InvalidObjectError) {
          next(err);
        } else {
          next(new InternalError(`Internal error validating request body against user requirements`));
        }
      });
  })

  app.get('/api/user', (req, res, next) => {
    database.load()
      .then(() => res.send(JSON.stringify(database.users)))
      .catch(err => {
        logger.log(err.stack || err.toString());
        next(new InternalError('database error'));
      })
  });

  app.post('/api/user', (req, res, next) => {
    database.load()
      .then(() => {
        const userName = req.body.user;
        database.addUser(userName)
          .then(() => res.send(ResponseJSON
            .SUCCESS('User Added', `Successfully added user with ID '${userName}' to the database`)))
          .catch(err => {
            logger.log(err.stack || err.toString());
            if (err instanceof DuplicateError) {
              next(err);
            } else {
              next(new InternalError(`Internal error adding User with ID '${userName}' to the database`));
            }
          })
      })
      .catch(err => {
        logger.log(err.stack || err.toString());
        next(new InternalError('Error loading database'));
      });
  });

  app.delete('/api/user/:name', (req, res, next) => {
    database.load()
      .then(() => {
        const userName = req.params['name'];
        database.deleteUser(userName)
          .then(() => res.send(ResponseJSON
            .SUCCESS('User Deleted', `Successfully deleted user with ID '${userName}' from the database`)))
          .catch(err => {
            logger.log(err.stack || err.toString());
            if (err instanceof MissingError) {
              next(err);
            } else {
              next(new InternalError(`Internal error deleting user with ID '${userName}' from the database`));
            }
          });
      })
      .catch(err => {
        logger.log(err.stack || err.toString());
        next(new InternalError('Error loading database'));    
      });
  });

  app.patch('/api/user/:name', (req, res, next) => {
    database.load()
      .then(() => {
        const oldUserName = req.params['name'];
        const newUserName = req.body.user;
        database.renameUser(oldUserName, newUserName)
          .then(() => res.send(ResponseJSON
            .SUCCESS('User Renamed', `Successfully renamed user with ID '${oldUserName}' in the database`)))
          .catch(err => {
            logger.log(err.stack || err.toString());
            if (err instanceof MissingError || err instanceof DuplicateError) {
              next(err);
            } else {
              next(new InternalError(`Internal error renaming user with ID '${oldUserName}' in the database`));
            }          
          })
      })
      .catch(err => {
        logger.log(err.stack || err.toString());
        next(new InternalError('Error loading database'));    
      });
  });

};

export default userRoutes;