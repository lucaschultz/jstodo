const fs = require("fs").promises;
const logger = require("./utils/logger.js");

// Der Pfad zur Datenbank/JSON Datei
const databasePath = "./data/database.json";

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
    },
    {
      user: 'Luca',
      lists: []
    } 
  ]  
}


function incrementName (string) {
    re = /\(\d+\)/g
    let match = string.match(re) || null;
    if (!match) {
        return string + ' (1)';
    } else {
        match = match[0]
        const incremented = `(${parseInt(match.slice(1, -1)) + 1})`;
        return string.replace(match, incremented);
    }
}

function inArray (arr, obj, key) {
  // Finde den Index des ersten Objekts mit dem selben Key im Array
  const index = arr.findIndex(item => item[key] === obj[key]);
  
  if (index === -1) {
    // Falls kein solches Objekt existiert ...
    return false;
  } else {
    // Falls ein solches Objekt existiert ...
    return true;
  }
}

function pushIfUnique (arr, obj, key, rename = false) {
  // Teste ob ein Objekt mit dem selben Key existiert 
  const exists = inArray(arr, obj, key)
  // Wenn eines existiert ...
  if (exists) {
    // ... und nicht umbennant werden soll ...
    if (!rename) {
      // ... wird das Objekt nicht hinzugefügt.
      return false;
    } else {
      // Wenn umbennant werden soll wird der Key geändert ... 
      obj[key] = incrementName(obj[key]);
      // ... und das Objekt hinzugefügt.
      arr.push(obj);
    }
  // Wenn kein Objekt mit dem selben Key existiert ... 
  } else {
    // ... füge den Objekt hinzu.
    arr.push(obj);  
  }
  // Gib true zurück falls das Objekt hinzugefügt wurde
  return true;
}


class JSONDatabase {

  constructor (path = databasePath) {
    this.path = path;
    this.data = null;
  }

  async save () {
    await fs.writeFile(this.path, JSON.stringify(this.data, null, 2), 'utf8');
  }

  async load () {
    // Versuche die Daten zu lesen und parse sie in ein Objekt
    this.data = await fs.readFile(this.path, 'utf8')
      .then(data => JSON.parse(data));
  }

  get users () {
    let result = [];
    this.data.users.forEach(user => {
      result.push({ 'user': user.user });
    });
    return result;
  }

  async addUser (name) {
    const template = { user: name, lists: [] };
    const pushed = pushIfUnique (this.data.users, template, 'user');
    if (!pushed) {
      throw new Error(`User tried to add already existing user ${name}`);
    }
    await this.save();
  }

  async renameUser (oldName, newName) {
    let index = this.data.users.findIndex(u => u.user === oldName);
    if (index === -1) {
      throw new Error(`User tried to rename non-existent user ${oldName}`);
    }
    this.data.users[index].user = newName;
    await this.save();
  }

  async deleteUser (name) {
    this.data.users = this.data.users.filter(u => u.user !== name);
    await this.save();
  }

  static async new (path, template = databaseTemplate) {
    await fs.writeFile(path, JSON.stringify(template, null, 2), 'utf8');
  }

}


module.exports = new JSONDatabase();