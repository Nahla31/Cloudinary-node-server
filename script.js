const express = require("express");
const cors = require("cors");
const cloudinary = require("cloudinary").v2; // Import the v2 version of the Cloudinary SDK.
const app = express();
const port = 3001;

app.use(cors());

cloudinary.config({
  cloud_name: "dgicaph36",
  api_key: "529255672761148",
  api_secret: "9wvxWMxjSmefBkP1umyoCBcr2Qw",
});

const searchResult = async (searchInput) => {
  try {
    const result = await cloudinary.search
      .expression(`${searchInput}`)
      .execute();

    return result.resources;
  } catch (error) {
    throw error;
  }
};

app.get("/home/:searchInput", async (req, res) => {
  try {
    console.log(req.params.searchInput);
    const results = await searchResult(req.params.searchInput);
    res.json(results);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while searching for assets." });
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
