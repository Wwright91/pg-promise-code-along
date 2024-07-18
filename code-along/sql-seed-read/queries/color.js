const db = require("../db/dbConfig.js");

const getAllColors = async () => {
  try {
    const allColors = await db.any("SELECT * FROM colors");
    return allColors;
  } catch (error) {
    return error;
  }
};

const getColor = async (id) => {
  try {
    const oneColor = await db.one("SELECT * FROM colors WHERE id = $1", id);
    return oneColor;
  } catch (error) {
    return error;
  }
};

const createColor = async (color) => {
  const { name, is_favorite } = color;
  try {
    const currColor = await db.one(
      "INSERT INTO colors (name, is_favorite) VALUES ($1, $2) RETURNING *",
      [name, is_favorite]
    );
    return currColor;
  } catch (error) {
    return error;
  }
};

module.exports = { getAllColors, getColor, createColor };
