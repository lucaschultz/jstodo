const fs = require("fs").promises;
const logger = require("./utils/logger.js");
const MissingError = require("./errors/missing.js");
const DuplicateError = require("./errors/duplicate.js");


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

function equalArraysByID (arr1, arr2, keyOfID) {

    // Falls eines der Arrays kein Array ist oder die Arrays eine unterschiedliche
    // Länge haben ...
    if (!Array.isArray(arr1) || !Array.isArray(arr2) || arr1.length !== arr2.length) {
      // ... sind sie nicht gleich!
      return false;
    }

    // Compare Funktion zum sortieren nach der ID
    const compare = (a, b) => {
        return a[keyOfID].localeCompare(b);
    }

    // Erstelle jweils ein Dublikat der Arrays
    // um die originale nicht zu verändern und
    // sortiere die Duplikate nach der ID
    var arr1 = arr1.concat().sort(compare);
    var arr2 = arr2.concat().sort(compare);

    // Vergleiche jeweils zwei Objekte in den Arrays 
    // Paarweise ob sie die selbe ID haben.
    for (var i = 0; i < arr1.length; i++) {
        if (arr1[i][keyOfID] !== arr2[i][keyOfID]) {
            return false;
        }
    }

    // Falls bis hierhei kein false zurück gegeben wurde
    // sind die Array gleich.
    return true;
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
  const index = arr.findIndex(item => item[key].toLowerCase() === obj[key].toLowerCase());
  
  if (index === -1) {
    // Falls kein solches Objekt existiert ...
    return false;
  } else {
    // Falls ein solches Objekt existiert ...
    return true;
  }
}

function pushIfUnique (arr, obj, key, type, rename = false) {
  // Teste ob ein Objekt mit dem selben Key existiert 
  const exists = inArray(arr, obj, key)
  // Wenn eines existiert ...
  if (exists) {
    // ... und nicht umbennant werden soll ...
    if (!rename) {
      // ... wird das Objekt nicht hinzugefügt.
      throw new DuplicateError(`${type} with ID '${obj[key]}' can't be be added because the ID is already assigned`);
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
}

function findObjectInArray (arr, key, value) {
  return arr.findIndex(e => e[key].toLowerCase() === value.toLowerCase());
}

function deleteObjectInArray (arr, key, value, type) {
  const filtered = arr.filter(u => u[key].toLowerCase() !== value.toLowerCase());
  if (equalArraysByID(filtered, arr, key)) {
    throw new MissingError(`${type} with ID '${value}' can't be deleted because the ID is not assigned`);
  } else {
    return filtered;
  }
}

class JSONDatabase {

  constructor (path = databasePath) {
    this.path = path;
    this.data = null;
  }

  // Universelle Methoden

  async save () {
    await fs.writeFile(this.path, JSON.stringify(this.data, null, 2), 'utf8');
  }

  async load () {
    // Versuche die Daten zu lesen und parse sie in ein Objekt
    this.data = await fs.readFile(this.path, 'utf8')
      .then(data => JSON.parse(data));
  }

  static async new (path, template = databaseTemplate) {
    await fs.writeFile(path, JSON.stringify(template, null, 2), 'utf8');
  }

  findUser(name) {
    const index = findObjectInArray(this.data.users, 'user', name);
    if (index === -1) {
      throw new MissingError(`User with ID '${name}' can't be found because the ID is not assigned`);
    } else {
      return this.data.users[index];
    }
  }

  findList(userName, listName) {
    const user = this.findUser(userName);
    const index = findObjectInArray(user.lists, 'name', listName);
    if (index === -1) {
      throw new MissingError(`List with ID '${listName}' of user '${userName}' can't be found because the ID is not assigned`);
    } else {
      return user.lists[index];
    }
  }

  findItem(userName, listName, itemName) {
    const list = this.findList(userName, listName);
    const index = findObjectInArray(list.items, 'name', itemName);    
    if (index === -1) {
      throw new MissingError(`Item with ID '${itemName}' in list '${listName}' of user '${userName}' can't be found because the ID is not assigned`);
    } else {
      return list.items[index];
    }
  }


  // Methoden für die api/user Route

  get users () {
    let result = [];
    this.data.users.forEach(user => {
      result.push({ 'user': user.user });
    });
    return result;
  }

  async addUser (name) {
    const newUser = { user: name, lists: [] };
    pushIfUnique(this.data.users, newUser, 'user', 'User');
    await this.save();
  }

  async renameUser (oldName, newName) {
    const user = this.findUser(oldName);
    user.user = newName;
    await this.save();
  }

  async deleteUser (name) {
    this.data.users = deleteObjectInArray(this.data.users, "user", name, "User");
    await this.save();
  }


  // Methoden für die api/list Route

  async getLists(userName) {
    return this.findUser(userName).lists;
  }

  async addList(userName, listName) {
    const newList = { name: listName, items: [] };
    const user = this.findUser(userName);
    pushIfUnique(user.lists, newList, 'name', 'List');
    await this.save();
  }

  async renameList(userName, oldListName, newListName) {
    const list = this.findList(userName, oldListName);
    list.name = newListName;
    await this.save();
  }

  async deleteList (userName, listName) {
    const user = this.findUser(userName);
    user.lists = deleteObjectInArray(user.lists, "name", listName, "List");
    await this.save();
  }


  // Methoden für die api/item Route

  async addItem(userName, listName, item) {
    const list = this.findList(userName, listName);
    pushIfUnique(list.items, item, 'name', 'Item');
    await this.save();
  }

  async updateItem(userName, listName, item) {
    this.deleteItem(userName, listName, item.name)
      .then(() => this.addItem(userName, itemName, item));
  }

  async deleteItem(userName, listName, itemName) {
    const list = this.findListe(userName, listName);
    list.items = deleteObjectInArray(list.items, "name", itemName, "Item");
    await this.save();
  }
}


module.exports = new JSONDatabase();