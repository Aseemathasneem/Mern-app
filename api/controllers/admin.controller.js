import User from "../model/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const adminSignin = async (req, res, next) => {
    const { email, password } = req.body;
    try {
      // Find user with email and is_admin set to true
      const validAdmin = await User.findOne({ email, is_admin: true });
      if (!validAdmin) return next(errorHandler(404, "Admin not found"));
      
      const validPassword = bcryptjs.compareSync(password, validAdmin.password);
      if (!validPassword) return next(errorHandler(401, "Wrong credentials"));
      
      const token = jwt.sign({ id: validAdmin._id }, process.env.JWT_SECRET);
      const { password: hashedPassword, ...rest } = validAdmin._doc;
      
      res.cookie("access_token", token, {
        httpOnly: true,
        expires: new Date(Date.now() + 3600000), // Set expiry time to 1 hour from now
      }).status(200).json(rest);
    } catch (error) {
      next(error);
    }
  };
  export const deleteUserData = async (req, res, next) => {
    try {
      const userId = req.params.id;
      const deletedUser = await User.findByIdAndDelete(userId);
  
      if (!deletedUser) {
        // If the user with the provided ID does not exist
        return res.status(404).json({ message: 'User not found' });
      }
  
      res.status(200).json({ message: 'User has been deleted', deletedUser });
    } catch (error) {
      // Pass the error to the error handling middleware
      next(error);
    }
  };

  export const usersList = async (req, res, next) => {
    
    try {
      const users = await User.find({ is_admin: false });
      res.json(users);
    } catch (error) {
      next(error);
    }
  };
  export const addUser = async (req, res, next) => {
    const { username, email, password } = req.body;
    const hashedPassword = bcryptjs.hashSync(password, 10); // Hash the password
  
    try {
      const newUser = new User({ username, email, password: hashedPassword }); // Create a new user instance
      await newUser.save(); // Save the new user to the database
      res.status(201).json({ message: "User created successfully" });
    } catch (error) {
      next(error);
    }
  };