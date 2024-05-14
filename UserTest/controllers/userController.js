const userService = require('../services/userService');

const userController = {
  async registerUser(req, res) {
    const { name, email, password, affiliation, bio, role, yearsOfExperience } = req.body;
    try {
      const newUser = await userService.registerUser({ name, email, password, affiliation, bio, role, yearsOfExperience });
      res.status(201).json(newUser);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async loginUser(req, res) {
    const { email, password } = req.body;
    try {
      const { token, role } = await userService.loginUser(email, password);
  
      res.status(200).json({ token, role });
    } catch (error) {
      res.status(401).json({ error: error.message });
    }
  },

  // Get user profile
  async getUserProfile(req, res) {
    const userId = req.userId; // Extracted from JWT token in middleware
    try {
      const userProfile = await userService.getUserProfile(userId);
      res.status(200).json(userProfile);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  },

  // Update user profile
  async updateUserProfile(req, res) {
    const userId = req.userId; // Extracted from JWT token in middleware
    const newData = req.body;
    try {
      const updatedProfile = await userService.updateUserProfile(userId, newData);
      res.status(200).json(updatedProfile);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async getAllUsers(req, res) {
    const userId = req.userId; // Extracted from JWT token in middleware
    const userRole = req.role; // Extracted from JWT token in middleware
    try {
      const allUsers = await userService.getAllUsers(userId, userRole);
      res.status(200).json(allUsers);
    } catch (error) {
      res.status(403).json({ error: error.message });
    }
  },

  async getUserRole(req, res) {
    const userRole = req.role; // Extracted from JWT token in middleware
    res.status(200).json(userRole);
  },

  async removeUser(req, res) {
    const userId = req.userId; // Extracted from JWT token in middleware
    const userRole = req.role; // Extracted from JWT token in middleware
    const userToRemoveId = req.params.userId;
    try {
      const message = await userService.removeUser(userId, userRole, userToRemoveId);
      res.status(200).json({ message });
    } catch (error) {
      res.status(403).json({ error: error.message });
    }
  }
};

module.exports = userController;