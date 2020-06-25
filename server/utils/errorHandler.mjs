import ResponseJSON from './response.mjs';

// Einfacher custom error handler für express  
function handler (err, req, res, next) {
  // Setzt den response status falls der error diesen
  // beeinhaltet. Andernfalls setzt er den response
  // status auf 500 und spiegelt das Standard Verhalten
  // von Express.js:
  // https://expressjs.com/en/guide/error-handling.html 
  res.status(err.status || 500);
  // Als antwort an den Client gibt es ein JSON Objekt
  // in der Aufgabenstellung gefordert
  res.send(ResponseJSON.ERROR(err.name, err.message));
}

export default handler;
