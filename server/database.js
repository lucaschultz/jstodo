const fs = require("fs").promises;

// Der Pfad zur Datenbank/JSON Datei
const databasePath = "./database.json";

// Die Standard Struktur der Datenbank als Objekt.
// Wird von read() zurück gegeben falls ein Fehler 
// beim lesen der Datenbank auftritt ...
const databaseTemplate = {
  users: [
    {  
      user: 'default',
      lists: [
        {
          name: 'Haushalt',
          items: [
            {
              name: 'Putzen',
              done: false,
              deadline: '2020-06-26',
              workloadFactor: '2'
            },
            {
              name: 'Kochen',
              done: false,
              deadline: '',
              workloadFactor: '1'
            }
          ]
        },
        {
          name: 'Leere Liste',
          items: []
        }
      ]
    }  
  ]  
}

// Nimmt ein Objekt (optional einen JSON String) und schreibt das
// Resultat in die Datenbank Datei
async function write (data, path = databasePath, encoding = "utf8", stringify = true) {
  data = stringify ? JSON.stringify(data, null, 2) : data;
  await fs.writeFile(path, data, encoding);
};

// Liest den Inhalt der Datenbank Datei aus und gibt ihn
// als Objekt (optional als String) in einem Promise zurück
async function read (returnString = false, path = databasePath, template = databaseTemplate, encoding = "utf8") {
  // In dieser Variable wird das Resultat gespeichert
  let data;
  try {
    // Versuche die Daten zu lesen ung ggf. direkt 
    // in ein Objekt zu parsen
    data = await fs.readFile(path, encoding)
      .then((data) => returnString ? data : JSON.parse(data));
  } 
  // Falls das schief geht gib die Template aus
  catch (err) {
    data = returnString ? JSON.stringify(template) : template;
  }
  // Da die Funktion async ist, wit immer ein Promise zurück gegben
  return data;
};


exports.write = write;
exports.read = read;