const axios = require('axios');
const cheerio = require('cheerio');

module.exports = () =>{
    let ulList = [];
    let bookContents = "";
    return axios.get(`https://velog.io/@fpshtmxm36`)
        .then(dataa=>{
            const $ = cheerio.load(dataa.data);
            
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

            return ulList;

        })
};