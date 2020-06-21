const usersEndpoint = (app, fs) => {
  // Konfiguration
  const dataPath = "./database.json";

  // Lese die Daten aus der JSON
  app.get("/users", (req, res) => {
    fs.readFile(dataPath, "utf8", (err, data) => {
      if (err) {
        throw err;
      }

      res.send(JSON.parse(data));
    });
  });
};

module.exports = usersEndpoint;