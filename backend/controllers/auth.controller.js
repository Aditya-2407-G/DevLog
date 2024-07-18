import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";

export const signup = async (req, res, next) => {
    const { username, email, password } = req.body;

    if (
        !username ||
        !email ||
        !password ||
        username === "" ||
        email === "" ||
        password === ""
    ) {
        next(errorHandler(400, "All fields are required"));
    }
    if (password.length < 6) {
        return res
            .status(400)
            .json({ message: "Password must be at least 6 characters long" });
    }

    const hashPass = bcryptjs.hashSync(password, 10);

    const newUser = new User({
        username,
        email,
        password: hashPass,
    });

    try {
        await newUser.save();

        res.json("Signup success!");
    } catch (error) {
        next(error);
    }
};
