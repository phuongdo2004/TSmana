import {Express} from "express";
import {UserRouter} from "../../routers/client/users.route";

import {router} from "../../routers/client/tasks.route";
export const routesApi = (app : Express)=>{
    app.use("/tasks" , router);
    app.use("/user" , UserRouter);



}

