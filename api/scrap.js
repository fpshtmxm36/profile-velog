const axios = require("axios");
const cheerio = require("cheerio");

const getHtml = async () => {
    try {
        return await axios.get('https://velog.io/@${name}');
    } catch (error) {
        console.error(error);
    }
};

async function fetchPost(name) {
    try {
      const { data } = await getHtml(name);
      return data;
    } catch (e) {
      throw new Error(e);
    }
  }

  module.exports = fetchPost;

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

    const data = ulList.filter(n => n.title);
    
    return data;
    })
    .then();