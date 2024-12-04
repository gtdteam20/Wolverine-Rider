import path from 'path';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import User from '../model/User.js'; // Adjust the path to your User model
import connectDB from '../database/db.js'; // Adjust the path to your db.js

// Load environment variables from the .env file
dotenv.config({ path: './config.env' });

connectDB();  // Connect to the database

// Insert user function
const insertUser = async () => {
    try {
      // Hash the password
      const hashedPassword = await bcrypt.hash("muddu@074", 10);  // add password here 
  
      // Create a new user in the database
      const newUser = await User.create({ email: "mudita07074@gmail.com", password: hashedPassword }); // add email here 
      
  
      console.log("User inserted successfully:", newUser);
    } catch (error) {
      console.error("Error inserting user:", error);
    } finally {
      // Disconnect from the database
      mongoose.disconnect();
    }
  };

insertUser();
