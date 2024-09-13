"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routesApi = void 0;
const users_route_1 = require("../../routers/client/users.route");
const tasks_route_1 = require("../../routers/client/tasks.route");
const routesApi = (app) => {
    app.use("/tasks", tasks_route_1.router);
    app.use("/user", users_route_1.UserRouter);
};
exports.routesApi = routesApi;
