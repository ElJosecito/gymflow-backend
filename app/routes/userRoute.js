import { Router } from "express";

//import jsonwebtoken
import { validateToken } from "../libs/jsonwebtoken.js";

// import user controller
import  UserController  from "../controllers/userController.js";

//multer
import upload from "../libs/multer.js";



const router = Router();

router.get("/users", UserController.getUsers);
router.get("/users/:id", validateToken, UserController.getUserById);
router.put("/users/membership/:id", UserController.updateMemberShip);
router.delete("/users/delete/:id", UserController.deleteUser);
router.put("/users/update/:id", UserController.updateUser);
router.put("/users/image/:id", upload.single("profileImage"), UserController.imageUpload);
router.put("/users/image/delete/:id", UserController.imageDelete);

export default router;