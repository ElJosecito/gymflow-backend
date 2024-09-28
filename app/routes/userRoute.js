import { Router } from "express";

//import jsonwebtoken
import { validateToken } from "../libs/jsonwebtoken.js";

// import user controller
import  UserController  from "../controllers/userController.js";

//multer
import multer from "multer";

const storage = multer({
    dest: "uploads/profileImages",
})


const router = Router();

router.get("/users", UserController.getUsers);
router.get("/users/:id", validateToken, UserController.getUserById);
router.put("/users/:id", UserController.updateMemberShip);
router.delete("/users/delete/:id", UserController.deleteUser);
router.put("/users/update/:id", UserController.updateUser);
router.put("/users/image/:id", storage.single("profileImage"), UserController.imageUpload);
router.put("/users/image/delete/:id", UserController.imageDelete);

export default router;