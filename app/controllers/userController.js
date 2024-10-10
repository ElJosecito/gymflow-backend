import User from "../models/userModel.js";
import gymEntries from "../models/gymEntryModel.js";

import fs from "fs/promises";

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

        if (!user) {
            return res.status(404).send("User not found");
        }

        if (req.body.firstName) {
            user.firstName = req.body.firstName;
        }
        if (req.body.lastName) {
            user.lastName = req.body.lastName;
        }
        if (req.body.phoneNumber) {
            user.phoneNumber = req.body.phoneNumber;
        }
        if (req.body.email) {
            user.email = req.body.email;
        }
        if (req.body.password) {
            user.password = req.body.password;
        }
        if (req.body.memberShip) {
            user.memberShip = req.body.memberShip;
        }
        if (req.body.active !== undefined) { // Verificación ajustada
            user.active = req.body.active;
        }
        if (req.body.isAdmin !== undefined) { // Aplicado también para isAdmin
            user.isAdmin = req.body.isAdmin;
        }


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
        const { id } = req.params;

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

        if (!user) {
            return res.status(404).send("User not found");
        }

        if (!req.file) {
            return res.status(400).send("No image uploaded");
        }

        if (user.image && user.image !== "") {
            const imagePath = user.image.split("http://10.0.0.178:3000/")[1];
            await fs.unlink(imagePath);
        }

        user.image = `http://10.0.0.178:3000/${req.file.path}`;
        await user.save();
        res.status(200).send("Image uploaded successfully");


    } catch (error) {
        console.error(error);
        res.status(500).send("Internal server error");
    }
};


const imageDelete = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).send("User not found");
        }


        if (!user.image || user.image === "") {
            return res.status(400).send("No image to delete");
        }

        const imagePath = user.image.split("http://localhost:3000/")[1];

        await fs.unlink(imagePath);

        user.image = "";

        await user.save();
        await res.status(200).send("Image deleted successfully");

    } catch (error) {
        console.error(error);
        res.status(500).send("Internal server error");
    }
}



const userController = { getUsers, getUserById, updateMemberShip, updateUser, deleteUser, imageUpload, imageDelete };

export default userController;