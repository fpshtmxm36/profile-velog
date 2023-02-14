const { fetchPost } = require("./scrap");
const { createLatestCard } = require("../src/box");

module.exports = async (req, res) => {
  res.setHeader("Content-Type", "image/svg+xml");
  try {
    const posts = await fetchPost();
    console.log(posts);
    return res.send(createLatestCard(posts));
  } catch (e) {
    console.log(e);
    return res.send(e.message);
  }
};