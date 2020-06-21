// Importiere den /users Endpoint
const userRoutes = require("./user");

const appRoutes = (app, fs) => {
  // Standardnachricht
  app.get("/api", (req, res) => {
    res.send("Willkommen zur JS Todo API");
  });

  // Verwende den /users Endpoint
  userRoutes(app, fs);
};

// Exportiere die Endpoints um sie in server.js
// zu verwenden!
module.exports = appRoutes;