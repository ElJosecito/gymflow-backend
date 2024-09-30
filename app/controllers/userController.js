import User from "../models/userModel.js";
import gymEntries from "../models/gymEntryModel.js";

import fs from "fs";

// get all users

const getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal server error");
    }
}

// get user by id

const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).send("User not found");
        }
        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal server error");
    }
}

// update memberShip

const updateMemberShip = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        const allowedMemberShips = ['basic', 'gold', 'platinum'];

        // Verifica si el valor de memberShip es uno de los permitidos
        if (!allowedMemberShips.includes(req.body.memberShip)) {
            return res.status(400).json({ message: "Membresía no válida" });
        }

        user.memberShip = req.body.memberShip;
        await user.save();
        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).send("Error interno del servidor");
    }
};
//update user

const updateUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        user.image = req.body.image;
        user.active = req.body.active;
        user.gymEntries = req.body.gymEntries;
        user.isAdmin = req.body.isAdmin;
        await user.save();
        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal server error");
    }
}

//delete user

const deleteUser = async (req, res) => {
    try {
        const { id } = req.body;

        const user = await User.findById(id);

        if (!user) {
            return res.status(404).send("User not found");
        }

        user.gymEntries.forEach(async (entry) => {
            await gymEntries.findByIdAndDelete(entry);
        });

        await User.findByIdAndDelete(id);
        res.send("User deleted successfully");


    } catch (error) {
        console.error(error);
        res.status(500).send("Internal server error");
    }
}

const imageUpload = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        const filePath = await saveImage(req.file);

        user.image = `/${filePath}`;
        await user.save();

        res.status(200).send('File uploaded successfully');
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal server error");
    }
}

const saveImage = async (file) => {
    const timestamp = Date.now(); // Obtiene la marca de tiempo actual
    const originalName = file.originalname.split('.'); // Divide el nombre por el punto (extensión)
    const fileNameWithoutExt = originalName[0]; // Obtiene el nombre sin extensión
    const fileExt = originalName[1]; // Obtiene la extensión del archivo
    const newFileName = `${fileNameWithoutExt}_${timestamp}.${fileExt}`; // Crea un nuevo nombre con la fecha
    const newPath = `uploads/profileImages/${newFileName}`; // Nueva ruta

    // Renombra el archivo a la nueva ruta con el nombre modificado
    fs.renameSync(file.path, newPath);
    return newPath;
}


const imageDelete = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        fs.unlinkSync(user.image);
        user.image = null;
        await user.save();
        res.status(200).send('File deleted successfully');
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal server error");
    }
}



const userController = { getUsers, getUserById, updateMemberShip, updateUser, deleteUser, imageUpload, imageDelete };

export default userController;