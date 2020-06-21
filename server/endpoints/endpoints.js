// Importiere den /users Endpoint
const userEndpoints = require("./usersEndpoint");

const appEndpoints = (app, fs) => {
  // Standardnachricht
  app.get("/", (req, res) => {
    res.send("Willkommen zur JS Todo API");
  });

  // Verwende den /users Endpoint
  userEndpoints(app, fs);
};

// Exportiere die Endpoints um sie in server.js
// zu verwenden!
module.exports = appEndpoints;