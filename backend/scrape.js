const cheerio = require('cheerio')
var request = require('request-promise-native');

// return the requets for each url requested.
getHtmlsFromRequests = (url) => {
  return request(url);
}

//  loop through 5 pages to get the data.
loopThroughPages = () => {
  const promisesList = [];

  for (const page of Array(5).keys()) {
    const url = `https://github.com/search?o=desc&q=nodejs&s=updated&type=Repositories&p=${page}`;
    promisesList.push(getHtmlsFromRequests(url))
  }

  return promisesList
}

// Exports the function which gets the scraped data.
module.exports = {
  getScrapedData : async () => {
    const promisesList = loopThroughPages()
    const listOfRepo = [];
    const data = await Promise.all(promisesList);
  
    for(page of data) {
      const $ = cheerio.load(page);
      // get the list item dom object and loop through each element to get the data.
      $('li.repo-list-item').each((index, child) => {
        listOfRepo.push({
          title : $(child).find('a.v-align-middle').text(),
          desc : $(child).find('p').text(),
          tag : $(child).find('a.topic-tag').text(),
          language : $(child).find('span [itemprop=programmingLanguage]').text(),
        });
      });
    }
    return listOfRepo
  }
}
