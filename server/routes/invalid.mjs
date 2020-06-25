// Costom Error Import
import InvalidRouteError from '../errors/route.mjs';



const invalidRoutes = (app, database, logger) => {

  app.all(/.*/, function (req, res, next) {
    const err = new InvalidRouteError(`Request to invalid route: ${req.path}`);
    logger.log(err.stack || err.toString());
    next(err);
  })
  
};

export default invalidRoutes;