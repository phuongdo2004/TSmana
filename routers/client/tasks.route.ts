import express from "express";
 export const router = express.Router();

import * as controller from "../../controllers/client/task.controller";
router.get("/"  , controller.index);
router.get("/detail/:id" , controller.detail);
router.patch("/change-status" , controller.changeStatus);
router.post ("/create" , controller.create);
router.patch("/edit/:id" , controller.edit)
router.patch("/delete/:id" , controller.deleted);

// export const taskRouter =  router;