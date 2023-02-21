const axios = require("axios");
const cheerio = require("cheerio");
const {getTextWidth} = require("get-text-width");

const getHtml = async (id) => {
    try {
        return await axios.get('https://velog.io/@'+id);
    } catch (error) {
        console.error(error);
    }
};

function textEllipsis(text) {
    //https://www.npmjs.com/package/get-text-width
    text = text.replace(/&/gi, '&amp;').replace(/'/gi, '&apos;').replace(/"/gi, '&quot;').replace(/</gi, '&lt;').replace(/>/gi, '&gt;');
    
    console.log('text: '+ text);
    console.log('text.getBytes: '+ getBytes(text));
    console.log('getTextWidth: '+ gtw.getTextWidth(text));
    
    if (getTextWidth(text) > 324) {
        text = text.substr(0, 35) + '...';
    }
    return text;
}

function getBytes(str) {
    var byte = 0;
    for (var i=0; i<str.length; ++i) {
        (str.charCodeAt(i) > 127) ? byte += 2 : byte++ ;
    }    
    return byte;
}

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