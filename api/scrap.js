const axios = require("axios");
const cheerio = require("cheerio");
const url = 'https://velog.io/@fpshtmxm36';

async function scrapList() {
    try {
        return await axios.get(url);
    } catch (e) {
      throw new Error(e);
    }
  }

getHtml()
  .then(html => {
      let ulList = [];
      const $ = cheerio.load(html.data);

      const $bodyList = $("#root > div:nth-child(2) > div:nth-child(3) > "
          + " div:nth-child(4) div:nth-child(3) div").children();

      $bodyList.each(function(i, elem) {
          if(i == 4){
              return false;
          }
          ulList[i] = {
              title: $(this).find('div a h2').text(),
              url: $(this).find('div a').attr('href'),
              date: $(this).find('div div.subinfo span:nth-child(1)').text()
          };
      });
      return ulList.filter(n => n.title);
  });

module.exports = scrapList;