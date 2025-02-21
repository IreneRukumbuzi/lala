import Property from "../models/Property.js";
import { uploadToCloudinary } from "../utils/cloudinary.js";
import { Op } from "sequelize";

export const createProperty = async (req, res) => {
  try {
    const { title, description, pricePerNight, location } = req.body;
    const hostId = req.user.id;

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
    let { page, limit, search, price } = req.query;

    page = parseInt(page) || 1;
    limit = parseInt(limit) || 10;
    const offset = (page - 1) * limit;

    let whereClause = {};

    if (search) {
      whereClause[Op.or] = [
        { title: { [Op.iLike]: `%${search}%` } },
        { location: { [Op.iLike]: `%${search}%` } },
      ];
    }

    let order = [["createdAt", "DESC"]];

    if (price === "low") {
      order = [["pricePerNight", "ASC"]];
    } else if (price === "high") {
      order = [["pricePerNight", "DESC"]];
    }  

    const { count, rows: properties } = await Property.findAndCountAll({
      where: whereClause,
      limit,
      offset,
      order,
    });

    res.json({
      totalProperties: count,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      pageSize: limit,
      properties,
    });
  } catch (error) {
    console.error("Error fetching properties:", error);
    res.status(500).json({ message: "Failed to retrieve properties", error });
  }
};

export const getHostProperties = async (req, res) => {
  try {
    let { page, limit, search, price } = req.query;
    const hostId = req.user.id;

    page = parseInt(page) || 1;
    limit = parseInt(limit) || 10;
    const offset = (page - 1) * limit;

    let whereClause = {
      hostId,
    };

    if (search) {
      whereClause[Op.or] = [
        { title: { [Op.iLike]: `%${search}%` } },
        { location: { [Op.iLike]: `%${search}%` } },
      ];
    }

    let order = [["createdAt", "DESC"]];

    if (price === "low") {
      order = [["pricePerNight", "ASC"]];
    } else if (price === "high") {
      order = [["pricePerNight", "DESC"]];
    }  

    const { count, rows: properties } = await Property.findAndCountAll({
      where: whereClause,
      limit,
      offset,
      order,
    });

    res.json({
      totalProperties: count,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      pageSize: limit,
      properties,
    });
  } catch (error) {
    console.error("Error fetching properties:", error);
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
