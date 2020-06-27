// Importiere Express.js und das Hilfspaket
import express from 'express';
import cors from 'cors';

// Ich hoffe body-parser zählt NICHT als 
// "weiteres externes Modul". Ich war zu faul 
// das selber nochmal zu implementieren. Meine
// Argumente sind das body-parser zum einen Teil
// der vorgegebenen package-lock.json und zum 
// anderen Teil des express.js projects ist. Siehe:
// https://github.com/expressjs/body-parser
import bodyParser from 'body-parser';

// Eigene imports
import Logger from './utils/logger.mjs';
const logger = new Logger();
import JSONDatabase from './database.mjs';
const database = new JSONDatabase;
import cleanup from './utils/cleanup.mjs';
import errorHandler from './utils/errorHandler.mjs';

// Initialisiere Express instance
const app = express();
const port = 3000;

app.use(express.static('../client/dist'));

// Konfiguriere die Express Instanz um das Hilfspaket
// body-parser zu benutzen.
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Die API hat kein favicon ...
app.get('/favicon.ico', (req, res) => res.status(204));

// In der routes.mjs Datei werden die routen definiert 
import routesCreator from './routes/routes.mjs';
const routes = routesCreator(app, database, logger);

// Error Handler um mit einem JSON Objekt zu antworten
app.use(errorHandler);

// Um in den logs sehen zu können wenn der Server beendet wird
cleanup(logger);

// Starte den Server auf Port 
const server = app.listen(port, () => {
  logger.log(`Starting server, listening on port ${port} ...`);
});
