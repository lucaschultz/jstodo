# Todolist server

### Project setup

```js
npm install
```

### Start server

```js
npm start
```

#### Links

- [Github Repo mit einfachen JSON Server](https://github.com/bpk68/api-server-starter/blob/master/routes/users.js)
- [Artikel der das vorherige Repo erklärt](https://robkendal.co.uk/blog/how-to-build-a-restful-node-js-api-server-using-json-files/)
- [Express.js Routing Guide](https://expressjs.com/en/guide/routing.html)
- [Express.js Error Guide](https://expressjs.com/en/guide/error-handling.html)
- [Warum das Error handling nur genau so funktioniert wie es jetzt ist](https://stackoverflow.com/questions/29700005/express-4-middleware-error-handler-not-being-called)
- [Inspiration für die custom errors](https://stackoverflow.com/questions/31089801/extending-error-in-javascript-with-es6-syntax-babel)
- [Node.js imports](https://www.sitepoint.com/understanding-module-exports-exports-node-js/)

### Todo

#### Web Service API

- [ ] **Endpunkt** `GET /api/list/{username}` – Liefert alle Todo-Listen des angegebenen Benutzers als Array von list-Objekten.
- [ ] **Endpunkt** `POST /api/list/{username}` – Legt eine neue leere Todo-Liste für den Benutzer an. Im Request wird ein list-Objekt erwartet, das nur die Property name enthält.
- [ ] **Endpunkt** `PATCH /api/list/{username}/{listname}` – Benennt die Todo-Liste des Benutzers um. Im Request wird ein list-Objekt erwartet, das nur die Property name enthält.
- [ ] **Endpunkt** `DELETE /api/list/{username}/{listname} ` – Löscht die Todo-Liste des Benutzers.
- [ ] **Endpunkt** `POST /api/item/{username}/{listname}` – Fügt der Todo-Liste des Benutzers einen Eintrag hinzu. Im Request wird ein item-Objekt erwartet, das mindestens die Properties name und done enthält.
- [ ] **Endpunkt** `PUT /api/item/{username}/{listname}/{itemname}` – Überschreibt den Eintrag in der Todo-Liste des Benutzers. Im Request wird ein item- Objekt erwartet, das mindestens die Properties name und done enthält.
- [ ] **Endpunkt** `DELETE /api/item/{username}/{listname}/{itemname}` – Löscht den Eintrag in der Todo-Liste des Benutzers.
- [x] **Endpunkt** `GET /api/user` – Liefert eine Liste aller vorhandenen Benutzer als Array von user- Objekten, die jeweils nur nur die Property user enthalten.
- [x] **Endpunkt** `POST /api/user` – Legt einen neuen Benutzer an. Im Request wird ein user-Objekt erwartet, das nur die Property user enthält.
- [ ] **Endpunkt** `PATCH /api/user/{username}` – Ändert den Namen des Benutzers. Im Request wird ein user-Objekt erwartet, das nur die Property user enthält.
- [ ] **Endpunkt** `DELETE /api/user ` – Löscht den Benutzer.
- [ ] Wenn unkorrekte URLs angefragt werden, die jeweils verlangten URL-Parameter username, listname oder itemname nicht in der Datenbank des Servers vorhanden sind oder der Nachrichtenrumpf unkorrektes oder unvollständiges JSON enthält, führen die Endpunkte keine Änderung an der Datenbank aus, sondern liefern einen geeigneten Status-Code und eine sinnvolle Fehlermeldung zurück, letztere ebenfalls im JSON-Format , z.B.: `{ "error": "missing JSON in body" }`.

In der Datenbank darf es nicht zu Konflikten kommen, d.h. es müssen eindeutige Schlüsselwerte vorliegen (eindeutige Benutzernamen, eindeutige Listennamen je Benutzer und eindeutige Aufgabennamen je Benutzer und Liste). Daher muss noch einer dieser beiden Funktionen implementiert werden:

- [ ] Würde eine Anfrage dazu führen, dass Schlüssel in der Datenbank nicht mehr eindeutig sind, wird die Anfrage mit einer geeigneten Fehlermeldung abgewiesen.
- [ ] Der Schlüsselwert in der Anfrage wird so umbenannt, dass er eindeutig ist. Existiert z. B. in der angegebenen Liste des angegebenen Benutzers schon ein Eintrag mit name: *Putzen*, wird dieser in *Putzen (1)* umbenannt (sofern eindeutig, sonst `Putzen (2)` usw.)

#### Anbindung des Clients an Server

Über eine Konstante `serverURL`, die im Modul `client/src/config.js` definiert wird, wird die Base-URL festgelegt, über die Anfragen an den Server geschickt werden sollen, z. B.

```js
export const serverURL = ’http://localhost:3000’;
```

#### Statische Route des Servers

Am Ende der Entwicklung, wenn der Client stabil läuft, soll die Vue-App für die Auslieferung kompiliert werden (`mit npm run build`), wodurch einige Dateien im Ordner `client/dist` erzeugt werden, die ein lauffähiges Abbild der App darstellen, das über einen Webserver ausge- liefert werden kann. Das soll in unserem Fall unser Express-Server sein. Dazu muss im Client zuvor der Wert von `serverURL` (siehe oben) angepasst werden.

Im Server muss nun noch eine statische Route eingerichtet werden, die den Inhalt des `client/dist`-Ordners des Clients ausliefert, siehe *Serving static files in Express*.
