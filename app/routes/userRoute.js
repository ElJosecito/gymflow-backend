import { Router } from "express";

import  UserController  from "../controllers/userController.js";

const router = Router();

router.get("/users", UserController.getUsers);
router.get("/users/:id", UserController.getUserById);
router.put("/users/:id", UserController.updateMemberShip);
router.delete("/users/delete/:id", UserController.deleteUser);
router.put("/users/update/:id", UserController.updateUser);

export default router;