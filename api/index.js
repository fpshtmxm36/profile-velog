const { fetchPost } = require("./scrap");
const createBox = require("../src/box");

module.exports = async (req, res) => {
  res.setHeader("Content-Type", "image/svg+xml");
  try {
    const posts = await fetchPost();
    return res.send(createBox({posts}));
  } catch (e) {
    console.log(e);
    return res.send(e.message);
  }
};