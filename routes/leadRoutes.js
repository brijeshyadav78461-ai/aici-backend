const express = require("express");
const router = express.Router();
const Lead = require("../models/Lead");

// ✅ POST - Save Lead (Form Submission)
router.post("/", async (req, res) => {
  try {
    const { name, phone, email, className, course } = req.body;

    // Basic validation
    if (!name || !phone) {
      return res.status(400).json({
        success: false,
        message: "Name and phone are required",
      });
    }

    // Create new lead
    const newLead = new Lead({
      name,
      phone,
      email,
      className,
      course,
    });

    await newLead.save();

    res.status(201).json({
      success: true,
      message: "Lead saved successfully ✅",
      data: newLead,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server error ❌",
    });
  }
});

// ✅ GET - Fetch all leads (for admin later)
router.get("/", async (req, res) => {
  try {
    const leads = await Lead.find().sort({ createdAt: -1 });

    res.json({
      success: true,
      data: leads,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching leads",
    });
  }
});

module.exports = router;
