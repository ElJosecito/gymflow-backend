import User from "../models/userModel.js";

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
        user.memberShip = req.body.memberShip;
        await user.save();
        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal server error");
    }
}

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
        await User.findByIdAndDelete(req.params.id);
        res.send("User deleted successfully");
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal server error");
    }
}

const userController = { getUsers, getUserById, updateMemberShip, updateUser, deleteUser };

export default userController;