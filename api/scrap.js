const axios = require("axios");
const cheerio = require("cheerio");
const log = console.log;

const getHtml = async (id) => {
    try {
        log("axios");
        return await axios.get('https://velog.io/@'+id);
    } catch (error) {
        console.error(error);
    }
};

const parsing = async (id, seq) => {
    const html = await getHtml(id);
    log("cheerio");
    const $ = cheerio.load(html.data);
    const $bodyList = $("#root > div:nth-child(2) > div:nth-child(3) > "
				+ " div:nth-child(4) div:nth-child(3) div").children();
    let ulList = [];
    
    $bodyList.each(function(i, elem) {
        if(i == seq){
            ulList[i] = {
                title: $(this).find('div a h2').text(),
                createTime: $(this).find('div div.subinfo span:nth-child(1)').text(),
                url: 'https://velog.io/@' + id + $(this).find('div a').attr('href')
            };
        }
    });

    let data = [];
    data = ulList.filter(n => n.title);

    return data;
}

module.exports = { parsing };