
const express = require('express');
const router = express.Router();
const axios = require("axios");
const cheerio = require("cheerio");

var html = "";
let ulList = [];
async function getHTML(){
    try{
        console.log("getHtml");
        return await axios.get("https://velog.io/@fpshtmxm36");
    }catch(err){
        console.log(err);
    }
}

async function parsing(){
    html = await getHTML();
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
}

router.get('/', function(req, res) {
    res.send(ulList);
}); 

module.exports = {
    parsing, router
};