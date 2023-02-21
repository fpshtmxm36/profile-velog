const { parsing } = require("./scrap");
const { createLatestCard } = require("../src/box");
const d3 = require("d3");
const log = console.log;

module.exports = async (req, res) => {
  const { id, seq } = req.query;
  res.setHeader("Content-Type", "image/svg+xml");
  try {
    const posts = await parsing(id, seq);
    return res.send(createLatestCard(posts, d3));
  } catch (e) {
    log(e);
    return res.send(e.message);
  }
};