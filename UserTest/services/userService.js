const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const config = require('../config/config');

const userService = {
  async registerUser(userData) {
    try {
      const hashedPassword = await bcrypt.hash(userData.password, 10);
      const newUser = new User({
        name: userData.name,
        email: userData.email,
        password: hashedPassword,
        affiliation: userData.affiliation,
        bio: userData.bio,
        role: userData.role,
        yearsOfExperience: userData.yearsOfExperience // Only for instructors
      });
      const savedUser = await newUser.save();
      return savedUser;
    } catch (error) {
      throw new Error('Error registering user');
    }
  },

  async loginUser(email, password) {
    try {
      const user = await User.findOne({ email });
      if (!user) {
        throw new Error('User not found');
      }
  
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        throw new Error('Incorrect password');
      }
  
      const token = jwt.sign({ userId: user._id, role: user.role }, config.jwtSecret);
      return { token, role: user.role }; // Return both the token and user role
    } catch (error) {
      throw new Error('Error authenticating user');
    }
  },  

  async getUserProfile(userId) {
    try {
      const user = await User.findById(userId);
      if (!user) {
        throw new Error('User not found');
      }
      return user;
    } catch (error) {
      throw new Error('Error getting user profile');
    }
  },

  async getInstructor(userId) {
    try {
      const user = await User.findById(userId);
      if (!user) {
        throw new Error('User not found');
      }
      if (user.role !== 'instructor') {
        throw new Error('User is not an instructor');
      }
      return user;
    } catch (error) {
      throw new Error('Error getting user profile: ' + error.message);
    }
  },  

  async getStudent(userId) {
    try {
      console.log('Arrived')
      const user = await User.findById(userId);
      if (!user) {
        console.log('No user')
        throw new Error('User not found');
      }
      if (user.role !== 'student') {
        console.log('wrong role')
        throw new Error('User is not an instructor');
      }
      return user;
    } catch (error) {
      console.log('Error')
      throw new Error('Error getting user profile: ' + error.message);
    }
  },  

  async updateUserProfile(userId, newData) {
    try {
      const updatedUser = await User.findByIdAndUpdate(userId, newData, { new: true });
      if (!updatedUser) {
        throw new Error('User not found');
      }
      return updatedUser;
    } catch (error) {
      throw new Error('Error updating user profile');
    }
  },

  async getAllUsers(userId, role) {
    try {
      if (role !== 'admin') {
        throw new Error('Unauthorized');
      }
      const users = await User.find({});
      return users;
    } catch (error) {
      throw new Error('Error getting all users');
    }
  },

  async removeUser(userId, role, userToRemoveId) {
    try {
      if (role !== 'admin') {
        throw new Error('Unauthorized');
      }
      const userToRemove = await User.findById(userToRemoveId);
      if (!userToRemove) {
        throw new Error('User to remove not found');
      }
      await User.findByIdAndRemove(userToRemoveId);
      return 'User removed successfully';
    } catch (error) {
      throw new Error('Error removing user');
    }
  }
};

module.exports = userService;