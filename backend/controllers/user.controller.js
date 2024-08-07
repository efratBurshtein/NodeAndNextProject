const userService = require('../services/user.service');

exports.signup = async (req, res) => {
  const {  email, phone, address, isWorker } = req.body;
  const { googleId } = req.params;

  try {
    const updatedUser = await userService.signup(
      {  email,phone, address, isWorker },
      googleId
    );
    
    if (!updatedUser) {
      return res.status(404).json({ message: "Failed to sign up" });
    }
    
    res.json(updatedUser);
  } catch (error) {
    console.error("Failed to signup:", error.message);
    res.status(500).json({ message: error.message || "Failed to signup" });
  }
};

exports.login = async (req, res) => {
  try {
    const task = await userService.login(req.body);
    res.json(task);
  } catch (error) {
    console.error("Failed to login:", error.message);
    res.status(500).json({ message: error.message || "Failed to login" });
  }
};

exports.deleteUser = async (req, res) => {
  const email = req.body.email;
  try {
    const deletedUser = await userService.deleteUser(email);
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Failed to delete user:", error.message);
    res.status(500).json({ message: error.message || "Failed to delete user" });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await userService.getAllUsers();
    res.json(users);
  } catch (error) {
    console.error("Failed to get users:", error.message);
    res.status(500).json({ message: error.message || "Failed to get users" });
  }
};

exports.updateUser = async (req, res) => {
  const { displayName, email } = req.body;

  try {
    const updatedUser = await userService.updateUser( { displayName, email });
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(updatedUser);
  } catch (error) {
    console.error("Failed to update user:", error.message);
    res.status(500).json({ message: error.message || "Failed to update user" });
  }
};

exports.getUserByGoogleId = async (req, res) => {
  const { googleId  } = req.params;

  try {
    const user = await userService.getUserByGoogleId(googleId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    console.error("Failed to get user:", error.message);
    res.status(500).json({ message: error.message || "Failed to get user" });
  }
};
