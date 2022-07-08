import express from "express";
import _applyMiddlewares from "lib/server/middlewares";
import _applyRoutes from "lib/server/routes";
import 'lib/global'

const app = express();

_applyMiddlewares(app);
_applyRoutes(app);

app.listen(4313, () => console.log("app is running on port 4313"));
