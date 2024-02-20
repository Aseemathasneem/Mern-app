import User from '../model/user.model.js';
import { errorHandler } from '../utils/error.js';
import bcryptjs from 'bcryptjs';
export const test = (req,res)=>{
    res.json({
        message : 'API is working '
    })
}

export const updateUser = async (req, res, next) => {
    if (req.user.id !== req.params.id) {
      return next(errorHandler(401, 'You can update only your account!'));
    }
    try {
      if (req.body.password) {
        req.body.password = bcryptjs.hashSync(req.body.password, 10);
      }
  
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: {
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            profilePicture: req.body.profilePicture,
          },
        },
        { new: true }
      );
      const { password, ...rest } = updatedUser._doc;
      res.status(200).json(rest);
    } catch (error) {
      next(error);
    }
  };
  export const deleteUser = async (req, res, next) => {
    if (req.user.id !== req.params.id) {
      return next(errorHandler(401, 'You can delete only your account!'));
    }
    try {
      await User.findByIdAndDelete(req.params.id);
      res.status(200).json('User has been deleted...');
    } catch (error) {
      next(error);
    }
  
  }
  export const userData = async (req, res, next) => {
    
    const userId = req.params.id; // Extract the user ID from the request params
    try {
        const user = await User.findById(userId); // Query the database for the user with the provided ID
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }
        res.json(user); // Return the user data if found
    } catch (error) {
        next(error); // Forward any errors to the error handler middleware
    }
  };
  export const editUserData = async (req, res, next) => {
    const userId = req.params.id; // Extract the user ID from the request params
    const { username, email, password, profilePicture } = req.body; // Extract the updated user data from the request body
  
    try {
      // Query the database for the user with the provided ID
      const user = await User.findById(userId);
  
      if (!user) {
        // If user with the provided ID is not found, return a 404 error
        return res.status(404).json({ success: false, message: 'User not found' });
      }
  
      // Update user data with the provided values
      if (username) user.username = username;
      if (email) user.email = email;
      if (password) user.password = password;
      if (profilePicture) user.profilePicture = profilePicture;
  
      // Save the updated user data to the database
      await user.save();
  
      // Return a success response
      return res.status(200).json({ success: true, message: 'User data updated successfully', user });
    } catch (error) {
      // If an error occurs, forward it to the error handler middleware
      next(error);
    }
  };
 
 