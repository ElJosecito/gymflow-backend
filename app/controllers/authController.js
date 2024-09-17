import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


// Register new Lender

const register = async (req, res) => {
  try {
    const { firstName, lastName, email, phoneNumber, password } = req.body;

    // Check if user already exists
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).send("User already exists");
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({
      firstName,
      lastName,
      email,
      phoneNumber,
      password: hashedPassword,
    });

    await newUser.save();

    res.send("User registered successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
};


// Login user
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).send("Invalid credentials");
    }

    // Check if password is correct
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).send("Invalid credentials");
    }

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });

    res.send
      ({
        token,
        user: {
          id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          number: user.number,
        },
      })

  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
};


//isAuth true or false
const isAuth = async (req, res) => {
  try {
    res.send(true);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
};

const authController = { register, login, isAuth };

export default authController;