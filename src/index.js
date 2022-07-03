import express from "express";
import _applyMiddlewares from "lib/server/middlewares";
import _applyRoutes from "lib/server/routes";

global.print = console.log;
global.printError = (...args) => {
  console.log("\x1b[41m", ...args);
  console.log("\x1b[0m");
};
global.deepClone = (obj) => JSON.parse(JSON.stringify(obj));

const app = express();

_applyMiddlewares(app);
_applyRoutes(app);

app.listen(4313, () => console.log("app is running on port 4313"));
