const { getHtml } = require("./scrap");
const { createLatestCard } = require("../src/box");
const log = console.log;

module.exports = async (req, res) => {
  res.setHeader("Content-Type", "image/svg+xml");
  try {
    const posts = await getHtml();
    return res.send(createLatestCard(posts));
  } catch (e) {
    log(e);
    return res.send(e.message);
  }
};