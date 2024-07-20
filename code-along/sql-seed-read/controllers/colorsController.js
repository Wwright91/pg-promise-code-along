const express = require("express");
const router = express.Router();
const {
  getAllColors,
  getColor,
  createColor,
  deleteColor,
  updateColor,
} = require("../queries/color");
const { checkName, checkBoolean } = require("../validations/checkColors.js");

router.get("/", async (req, res) => {
  const allColors = await getAllColors();
  if (allColors[0]) {
    res.status(200).json(allColors);
  } else {
    res.status(500).json({ error: "server error" });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const color = await getColor(id);
  if (color) {
    res.json(color);
  } else {
    res.status(404).json({ error: "not found" });
  }
});

router.post("/", checkName, checkBoolean, async (req, res) => {
  const color = await createColor(req.body);
  res.status(201).json(color);
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const deletedColor = await deleteColor(id);
  if (deletedColor.id) {
    res.status(200).json(deletedColor);
  } else {
    res.status(404).json("Color not found");
  }
});

router.put("/:id", checkName, checkBoolean, async (req, res) => {
  const { id } = req.params;
  try {
    const updatedColor = await updateColor(id, req.body);
    res.status(200).json(updatedColor);
  } catch (error) {
    res.status(404).json({ error: `No color with the id: ${id} exists` });
  }
});

module.exports = router;
