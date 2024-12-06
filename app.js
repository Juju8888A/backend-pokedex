const express = require("express");
const morgan = require("morgan");
const favicon = require("serve-favicon");
const bodyParser = require("body-parser");
const sequelize = require("./src/db/sequelize");

const app = express();
const port = 3000;

// middlewares
app
  .use(favicon(__dirname + "/favicon.ico"))
  .use(morgan("dev"))
  .use(bodyParser.json());

sequelize.initDb();

// futur points de terminaison
require("./src/routes/findAllPokemons")(app);
require("./src/routes/findPokemonByPk")(app);
require("./src/routes/createPokemon")(app);
require("./src/routes/updatePokemon")(app);
require("./src/routes/deletePokemon")(app);

app.listen(port, () =>
  console.log(
    `Notre application Node est démarré sur :http://localhost:${port}`
  )
);