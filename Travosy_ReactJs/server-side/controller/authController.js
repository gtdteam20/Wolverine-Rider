import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../model/User.js"; // Adjust the path to your User model

export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        // Compare provided password with hashed password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ success: false, message: "Invalid credentials" });
        }

        // Generate JWT token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

        // Send success response
        res.status(200).json({ success: true, token });
    } catch (err) {
        console.error("Login error:", err);
        res.status(500).json({ success: false, message: "Server error" });
    }
};


// Logout function
export const logoutUser = async (req, res) => {
    try {
      const token = req.headers.authorization?.split(" ")[1]; // Extract token
      if (!token) {
        return res.status(400).json({ success: false, message: "No token provided" });
      }
  
      // OPTIONAL: Blacklist token logic here if necessary
  
      res.status(200).json({ success: true, message: "User logged out successfully" });
    } catch (error) {
      console.error("Logout error:", error);
      res.status(500).json({ success: false, message: "Server error" });
    }
  };
