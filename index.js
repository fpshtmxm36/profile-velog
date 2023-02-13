const scrapper = require("./src/scrap");
const createBox = require("./ui/box");

module.exports = async (req, res) => {
  const { name } = req.query;
  res.setHeader("Content-Type", "image/svg+xml");
  try {
    const posts = await scrapper(name);
    return res.send(createBox(posts));
  } catch (e) {
    console.log(e);
    return res.send(e.message);
  }
};
