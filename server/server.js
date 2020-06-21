// Importiere Express.js und das Hilfspaket
const express = require("express");
const bodyParser = require("body-parser");

// Initialisiere Express instance
const app = express();

// Importiere die Node.js File System Library für 
// das lesen und schreiben der JSON Datenbank
const fs = require("fs");

// Konfiguriere die Express Instanz um das Hilfspaket
// body-parser zu benutzen.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// In der endpoints.mjs Datei werden die Enpunkte definiert 
const routes = require("./routes/routes.js")(app, fs);

// Error Handler um mit einem JSON Objekt zu antworten
app.use((err, req, res, next) => {
  res.status(err.status);
  res.send(JSON.stringify({ 
    error: err.name,
    message: err.message
  }));
});

// Starte den Server auf Port 
const server = app.listen(3000, () => {
  console.log("listening on port %s...", server.address().port);
});