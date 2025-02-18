import Property from "../models/Property.js";
import { uploadToCloudinary } from "../utils/cloudinary.js";


export const createProperty = async (req, res) => {
  try {
    const { title, description, pricePerNight, location, hostId } = req.body;

    let fileUrl = null;
    if (req.file) {
      const buffer = req.file.buffer;
      const cloudinaryFolder = `rental-properties/host-${hostId}`;
      fileUrl = await uploadToCloudinary(buffer, cloudinaryFolder);
    }

    const property = await Property.create({
      title,
      description,
      pricePerNight,
      location,
      hostId,
      imageUrl: fileUrl,
    });

    res.status(201).json(property);
  } catch (error) {
    res.status(500).json({ message: "Failed to create property", error });
  }
};

export const getAllProperties = async (req, res) => {
  try {
    let { page, limit } = req.query;

    page = parseInt(page) || 1;
    limit = parseInt(limit) || 10;
    const offset = (page - 1) * limit;

    const { count, rows: properties } = await Property.findAndCountAll({
      limit,
      offset,
    });

    res.json({
      totalProperties: count,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      pageSize: limit,
      properties,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve properties", error });
  }
};


export const getPropertyById = async (req, res) => {
  try {
    const property = await Property.findByPk(req.params.id);
    if (!property)
      return res.status(404).json({ message: "Property not found" });

    res.json(property);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving property", error });
  }
};


export const updateProperty = async (req, res) => {
  try {
    const { id } = req.params;

    const property = await Property.findByPk(id);
    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }

    const { title, description, pricePerNight, location, hostId } = req.body;

    let fileUrl = property.imageUrl;
    if (req.file) {
      const buffer = req.file.buffer;
      const cloudinaryFolder = `rental-properties/host-${hostId}`;
      fileUrl = await uploadToCloudinary(buffer, cloudinaryFolder);
    }

    await property.update({
      title: title || property.title,
      description: description || property.description,
      pricePerNight: pricePerNight || property.pricePerNight,
      location: location || property.location,
      imageUrl: fileUrl || property.imageUrl,
    });

    res.json({ message: "Property updated successfully", property });
  } catch (error) {
    res.status(500).json({ message: "Failed to update property", error });
  }
};



export const deleteProperty = async (req, res) => {
  try {
    const property = await Property.findByPk(req.params.id);
    if (!property)
      return res.status(404).json({ message: "Property not found" });

    await property.destroy();
    res.json({ message: "Property deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete property", error });
  }
};
