const cheerio = require('cheerio')
var request = require('request');

module.exports = {
  getScrapedData : () => {
    const listOfRepo = [];
    for (const page of Array(5).keys()) {
      const url = `https://github.com/search?o=desc&q=nodejs&s=updated&type=Repositories&p=${page}`
      request(url, function(error, response, html){
        // First we'll check to make sure no errors occurred when making the request
        if (!error) {
          const $ = cheerio.load(html);
          listOfRepo[page] = {}
          $('li.repo-list-item').each((childIndex, child) => {
            listOfRepo[page][childIndex] = {
              title : $(child).find('a.v-align-middle').text(),
              desc : $(child).find('p').text(),
              tag : $(child).find('a.topic-tag').text(),
              language : $(child).find('span [itemprop=programmingLanguage]').text(),
            }
          });
        } else {
          console.log("error => ", error);
        }
      });   
    }
    return listOfRepo;
  }
}
