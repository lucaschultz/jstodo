
// Formalisiert ein Antwort Objekt das
// von der API zurückgegeben wird
class ResponseObject {

  constructor (status, title, message) {
    this.status = status;
    this.title = title;
    this.message = message;
  }

}

// Formalisiert einen Antwort JSON String der
// von der API zurückgegeben wird
class ResponseJSON {

  static ERROR (title, message) {
    return JSON.stringify(new ResponseObject('ERROR', title, message));
  }
  
  static SUCCESS (title, message) {
    return JSON.stringify(new ResponseObject('SUCCESS', title, message));
  }

}

module.exports = ResponseJSON;