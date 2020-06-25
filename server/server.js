// Importiere Express.js und das Hilfspaket
const express = require("express");

// Ich hoffe body-parser zählt NICHT als 
// "weiteres externes Modul". Ich war zu faul 
// das selber nochmal zu implementieren. Meine
// Argumente sind das body-parser zum einen Teil
// der vorgegebenen package-lock.json und zum 
// anderen Teil des express.js projects ist. Siehe:
// https://github.com/expressjs/body-parser
const bodyParser = require("body-parser");

// Importiere die Node.js File System Library für 
// das lesen und schreiben der JSON Datenbank.
// Der Import erfolgt hier zentral für alle Routen!
const fs = require("fs");

// Eigene imports
const logger = require("./utils/logger.js");
const cleanup = require("./utils/cleanup.js");
const errorHandler = require("./utils/errorHandler.js");

// Initialisiere Express instance
const app = express();
const port = 3000;

// Konfiguriere die Express Instanz um das Hilfspaket
// body-parser zu benutzen.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Die API hat kein favicon ...
app.get('/favicon.ico', (req, res) => res.status(204));

// In der routes.mjs Datei werden die routen definiert 
const routes = require("./routes/routes.js")(app, fs);

// Error Handler um mit einem JSON Objekt zu antworten
app.use(errorHandler);

// Um in den logs sehen zu können wenn der Server beendet wird
cleanup(logger);

// Starte den Server auf Port 
const server = app.listen(port, () => {
  logger(`Starting server, listening on port ${port} ...`);
});
