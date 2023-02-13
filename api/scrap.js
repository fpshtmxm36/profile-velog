const express = require('express');
const router = express.Router();
const axios = require("axios");
const cheerio = require("cheerio");

const url = 'https://velog.io/@fpshtmxm36';

const getHtml = async (url) => {
    try {
        return await axios.get(url);
    } catch (error) {
        console.error(error);
    }
};

/* GET home page. */
router.get('/', function(req, res, next) {
    getHtml(url)
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
        })
        .then(result => res.render('index', { title: result }));
});

module.exports = router;