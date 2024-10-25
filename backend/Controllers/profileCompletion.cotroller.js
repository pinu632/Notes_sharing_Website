import User from "../Models/user.model.js";
import { v2 as cloudinary } from 'cloudinary';

export const ProfileCompletion = async (req, res) => {
  const { name, dob, gender, hometown, college, course, semester } = req.body;
  let { profilepic } = req.body;

  const userId = req.user._id;  // Ensure that middleware adds req.user

  try {
    // Validate all required fields
    console.log(name);
    console.log(dob);
    console.log(gender);
    console.log(hometown);
    console.log(college);
    console.log(course);
    console.log(semester);

    if (!name || !dob || !gender || !hometown || !college || !course || !semester) {
      return res.status(400).json({ error: "All fields are mandatory" });
    }

    // Find user by ID
    let user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if name matches
    if (name !== user.fullname) {
      return res.status(401).json({ error: "Name doesn't match" });
    }

    // Handle profile picture upload if provided
    if (profilepic) {
      const response = await cloudinary.uploader.upload(profilepic, {
        folder: "profile_pics",  // Organize in a folder in Cloudinary
        allowed_formats: ["jpg", "jpeg", "png"],
        transformation: [{ width: 500, height: 500, crop: "fill" }] // Optional: Resize the image
      });

      profilepic = response.secure_url;  // Get the URL of the uploaded image
    }

    // Update user details
    user.dob = dob;
    user.gender = gender;
    user.hometown = hometown;
    user.college = college;
    user.course = course;
    user.semester = semester;
    user.isCompleteProfile = true;
    

    // If a profile picture is provided, update it
    if (profilepic) {
      user.profileImg = profilepic;
    }

    // Save updated user information
    await user.save();

    // Remove sensitive data from the response
    user.password = undefined;

    return res.status(200).json(user);

  } catch (error) {
    console.error("Error in ProfileCompletion: ", error.message);
    return res.status(500).json({ error: "Internal server error" });
  }
};
