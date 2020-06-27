import serverURL from './config.mjs';


async function request (method, path, obj, url = serverURL) {
  if (method === 'GET' || method == 'HEAD') {
    const response = await fetch(new URL(`${url}${path}`), {
      method: method,
      credentials: 'omit',
      headers: {
        'Content-Type': 'application/json',
      }
    })
    .then(resp => resp.json())
    .catch(err => console.log(err));
    return response;
  } else {
    const response = await fetch(new URL(`${url}${path}`), {
      method: method,
      credentials: 'omit',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(obj),
    })
    .then(resp => resp.json())
    .catch(err => console.log(err));
    return response;
  }
}


class UserAPI {
  
  static async RENAME (oldName, newName) {
    const response = await request('PATCH', `/api/user/${oldName}`, { user: newName });
    return response;
  } 
  
  static async DELETE (userName) {
    const response = await request('DELETE', `/api/user/${userName}`, {});
    return response;
  } 
  
  static async ADD (userName) {
    const response = await request('POST', `/api/user`, { user: userName });
    return response;
  }

  static async GET () {
    const response = await request('GET', `/api/user`, {});
    return response;
  }
}

class ListAPI {
  
  static async RENAME (userName, oldName, newName) {
    const response = await request('PATCH', `/api/list/${userName}/${oldName}`, { name: newName });
    return response;
  } 
  
  static async DELETE (userName, listName) {
    const response = await request('DELETE', `/api/list/${userName}/${listName}`, {});
    return response;
  } 
  
  static async ADD (userName, listName) {
    const response = await request('POST', `/api/list/${userName}`, { name: listName });
    return response;
  }

  static async GET (userName) {
    const response = await request('GET', `/api/list/${userName}`, {});
    return response;
  }
}

class ItemAPI {
  
  static async UPDATE (userName, listName, itemName, item) {
    const response = await request('PUT', `/api/item/${userName}/${listName}/${itemName}`, item);
    return response;
  } 
  
  static async DELETE (userName, listName, itemName) {
    const response = await request('DELETE', `/api/item/${userName}/${listName}/${itemName}`, {});
    return response;
  } 
  
  static async ADD (userName, listName, item) {
    const response = await request('POST', `/api/item/${userName}/${listName}`, item);
    return response;
  }
}

function findUser(arr, name) {
  return arr.find(user => user.user === name);
}

function findList(arr, name) {
  return arr.find(list => list.name === name);
}

function findItem(arr, name) {
  return arr.find(item => item.name === name);
}

function generateID () {
  return '_' + Math.random().toString(36).substr(2, 9);
}

async function updateUsers (users) {
  const userList = await UserAPI.GET();

  for (const user of userList) {
    user.lists = await ListAPI.GET(user.user);
    const oldUser = findUser(users, user.user);
    if (oldUser === undefined) {
      user.id = generateID();
      user.lists.forEach(list => {
        list.id = generateID();
        list.items.forEach(item => {
          item.id = generateID();
        });
      });
    } else {
      user.id = oldUser.id;
      user.lists.forEach(list => {
        const oldList = findList(oldUser.lists, list.name);
        if (oldList === undefined) {
          list.id = generateID();
          list.items.forEach(item => {
            item.id = generateID();
          });
        } else {
          list.id = oldList.id;
          list.items.forEach(item => {
            const oldItem = findItem(oldList.items, item.name);
            if (oldItem === undefined) {
              item.id = generateID;
            } else {
              item.id = oldItem.id;
            }
          })
        }
      });
    }
  }
  return userList;
}

export default { user: UserAPI, update: updateUsers, list: ListAPI, item: ItemAPI };


// USER.ADD("Günther").then(result => console.log(result));