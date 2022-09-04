require("dotenv/config");

const express = require("express");
const app = express();
const expressLoader = require("./app/server");
const mongooseLoader = require("./mongoose/mongoose-loader");

expressLoader(app);
mongooseLoader();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.info(`Listening on PORT ${PORT}`);
});
