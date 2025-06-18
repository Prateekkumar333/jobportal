import { Company } from "../models/company.model.js";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";

// Register Company
export const registerCompany = async (req, res) => {
  try {
    const { companyName } = req.body;

    if (!companyName) {
      return res.status(400).json({
        message: "Company name is required.",
        success: false
      });
    }

    let company = await Company.findOne({ name: companyName });
    if (company) {
      return res.status(400).json({
        message: "You can't register the same company twice.",
        success: false
      });
    }

    company = await Company.create({
      name: companyName,
      userId: req.id
    });

    return res.status(201).json({
      message: "Company registered successfully.",
      company,
      success: true
    });
  } catch (error) {
    console.log("registerCompany error:", error);
    res.status(500).json({ message: "Server error", success: false });
  }
};

// Get Companies of Logged In User
export const getCompany = async (req, res) => {
  try {
    const userId = req.id;
    const companies = await Company.find({ userId });

    if (!companies || companies.length === 0) {
      return res.status(404).json({
        message: "No companies found.",
        success: false
      });
    }

    return res.status(200).json({
      companies,
      success: true
    });
  } catch (error) {
    console.log("getCompany error:", error);
    res.status(500).json({ message: "Server error", success: false });
  }
};

// Get Company by ID
export const getCompanyById = async (req, res) => {
  try {
    const companyId = req.params.id;
    const company = await Company.findById(companyId);

    if (!company) {
      return res.status(404).json({
        message: "Company not found.",
        success: false
      });
    }

    return res.status(200).json({
      company,
      success: true
    });
  } catch (error) {
    console.log("getCompanyById error:", error);
    res.status(500).json({ message: "Server error", success: false });
  }
};

// Update Company Info (file optional)
export const updateCompany = async (req, res) => {
  try {
    const { name, description, website, location } = req.body;
    const updateData = {};

    if (name) updateData.name = name;
    if (description) updateData.description = description;
    if (website) updateData.website = website;
    if (location) updateData.location = location;

    // Upload logo if file exists
    if (req.file) {
      const allowedTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
      if (!allowedTypes.includes(req.file.mimetype)) {
        return res.status(400).json({
          message: "Only JPEG, PNG, GIF, or WEBP images are allowed.",
          success: false
        });
      }

      const fileUri = getDataUri(req.file);
      const cloudResp = await cloudinary.uploader.upload(fileUri.content, {
        folder: "jobportal/companies",
        public_id: `logo_${Date.now()}`
      });

      updateData.logo = cloudResp.secure_url;

      // Optional: Delete previous logo
      const prevCompany = await Company.findById(req.params.id).select("logo");
      if (prevCompany?.logo) {
        const publicId = prevCompany.logo.split("/").pop().split(".")[0];
        await cloudinary.uploader.destroy(`jobportal/companies/${publicId}`);
      }
    }

    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({
        message: "No update fields provided.",
        success: false
      });
    }

    const company = await Company.findOneAndUpdate(
      { _id: req.params.id, userId: req.id },
      updateData,
      { new: true }
    );

    if (!company) {
      return res.status(404).json({
        message: "Company not found or not authorized.",
        success: false
      });
    }

    return res.status(200).json({
      message: "Company information updated.",
      company,
      success: true
    });
  } catch (error) {
    console.log("updateCompany error:", error);
    res.status(500).json({ message: "Server error", success: false });
  }
};
