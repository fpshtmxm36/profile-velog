const axios = require("axios");
const cheerio = require("cheerio");
const log = console.log;

const getHtml = async () => {
    try {
        return await axios.get('https://velog.io/@fpshtmxm36');
    } catch (error) {
        console.error(error);
    }
};

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
            date: $(this).find('div div.subinfo span:nth-child(1)').text()
        };
    });

    const data = ulList.filter(n => n.title);
    
    return data;
    })
    .then(res => log(res));

    module.exports = getHtml;