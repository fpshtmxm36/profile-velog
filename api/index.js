const scrapper = require("./scrap");
const createBox = require("../src/box");

module.exports = async (req, res) => {
  //const { name } = req.query;
  res.setHeader("Content-Type", "image/svg+xml");
  try {
    const posts = await scrapper();
    return res.send(createBox(posts));
  } catch (e) {
    console.log(e);
    return res.send(e.message);
  }
};
