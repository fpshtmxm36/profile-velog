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

const parsing = async (seq) => {
    const html = await getHtml();
    log("cheerio");
    const $ = cheerio.load(html.data);
    const $bodyList = $("#root > div:nth-child(2) > div:nth-child(3) > "
				+ " div:nth-child(4) div:nth-child(3) div").children();
    let ulList = [];
    
    $bodyList.each(function(i, elem) {
        if(i == seq){
            ulList[i] = {
                title: $(this).find('div a h2').text(),
                createTime: $(this).find('div div.subinfo span:nth-child(1)').text()
            };
        }
    });

    let data = [];
    data = ulList.filter(n => n.title);

    return data;
}

module.exports = { parsing };