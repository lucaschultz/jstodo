// Utility imports
const Database = require("../database.js");
const logger = require("../utils/logger.js");
const ResponeJSON = require("../utils/response.js");

// Costom Error Imports
const InvalidRouteError = require("../errors/invalid.js");



const invalidRoutes = (app, fs) => {

  app.all(/.*/, function (req, res, next) {
    err = new InvalidRouteError(`Request to invalid route: ${req.path}`);
    logger(err.stack || err.toString());
    next(err);
  })
  
};

module.exports = invalidRoutes;