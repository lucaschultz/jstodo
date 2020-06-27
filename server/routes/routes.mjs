// Importiere die Routes
import userRoutes from './user.mjs';
import listRoutes from './list.mjs';
import itemRoutes from './item.mjs';
import invalidRoutes from './invalid.mjs';

function appRoutes (app, database, logger) {
  
  // Standardnachricht
  app.get("/api", (req, res) => {
    res.send("Willkommen zur JS Todo API");
  });

  // Verwende den /users Endpoint
  userRoutes(app, database, logger);
  
  // Verwende den /users Endpoint
  listRoutes(app, database, logger);
  
  // Verwende den /users Endpoint
  itemRoutes(app, database, logger);
  
  // Alle anderen Routen sind invalid
  invalidRoutes(app, database, logger);
}

// Exportiere die Endpoints um sie in server.js
// zu verwenden!
export default appRoutes;