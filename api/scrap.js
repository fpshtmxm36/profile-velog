const axios = require("axios");
const cheerio = require("cheerio");

String.prototype.cut = function(len) {
    var str = this;
    var s = 0;
    for (var i=0; i<str.length; i++) {
            s += (str.charCodeAt(i) > 128) ? 2 : 1;
            if (s > len) return str.substring(0,i) + "...";
    }        
return str;
} 

function textEllipsis(text) {
    text = text.replace(/&/gi, '&amp;').replace(/'/gi, '&apos;').replace(/"/gi, '&quot;').replace(/</gi, '&lt;').replace(/>/gi, '&gt;');
    
    if (text.length > 23) {
        text.cut(23);
    }
    return text;
}

const getHtml = async (id) => {
    try {
        return await axios.get('https://velog.io/@'+id);
    } catch (error) {
        console.error(error);
    }
};

const parsing = async (id, seq) => {
    const html = await getHtml(id);
    const $ = cheerio.load(html.data);
    const $bodyList = $("#root > div:nth-child(2) > div:nth-child(3) > "
				+ " div:nth-child(4) div:nth-child(3) div").children();
    let ulList = [];
    
    $bodyList.each(function(i, elem) {
        if(i == seq){
            ulList[i] = {
                title: textEllipsis($(this).find('div a h2').text()),
                createTime: $(this).find('div div.subinfo span:nth-child(1)').text(),
                url: 'https://velog.io' + $(this).find('div a').attr('href')
            };
        }
    });

    let data = [];
    data = ulList.filter(n => n.title);

    return data;
}

module.exports = { parsing };