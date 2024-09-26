import { Router } from "express";

//import jsonwebtoken
import { validateToken } from "../libs/jsonwebtoken.js";

// import user controller
import  UserController  from "../controllers/userController.js";

const router = Router();

router.get("/users", UserController.getUsers);
router.get("/users/:id", validateToken, UserController.getUserById);
router.put("/users/:id", UserController.updateMemberShip);
router.delete("/users/delete/:id", UserController.deleteUser);
router.put("/users/update/:id", UserController.updateUser);

export default router;