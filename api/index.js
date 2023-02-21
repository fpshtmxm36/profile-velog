import d3 from "d3";
const { parsing } = require("./scrap");
const { createLatestCard } = require("../src/box");
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