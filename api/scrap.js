const axios = require("axios");
const cheerio = require("cheerio");
const log = console.log;

const getHtml = async () => {
    try {
        log("axios");
        return await axios.get('https://velog.io/@fpshtmxm36');
    } catch (error) {
        console.error(error);
    }
};
  
getHtml()
    .then(html => {
    let ulList = [];
    log("cheerio");
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

    log(ulList[0].title + " - " + ulList[0].date);
    
    let data = [];
    data = ulList.filter(n => n.title);
    
    log(data[0].title + " - " + data[0].date);

    return data;
    })
    .then(res => {log(res); return res;}
);

module.exports = { getHtml };