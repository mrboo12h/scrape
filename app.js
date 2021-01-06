const fetch = require('node-fetch');
const fs = require('fs');

const FetchStart = require('./FetchStart.js');
const FetchDetails = require('./FetchDetails.js');

console.log('Web scraping');

// const start = new FetchStart('https://www.eurogirlsescort.com/escorts/india/?girl-grid-vpGirl-page=1');
// start.loadStart().then(data => {
//   let jsonString = JSON.stringify(data[0], null, 2);
//   fs.writeFile("dataInfo.json", jsonString, function(err) {
//     console.log(err);
//   });
// });

(async () => {

  for(let i=1; i<=68; i++) {
    const start = new FetchStart(`https://www.eurogirlsescort.com/escorts/india/?girl-grid-vpGirl-page=${i}`);

    let result = await start.loadStart();

    let res = result[0];
    console.log(res[1].url);

    let details = [];

    for(let i=0; i<res.length; i++) {
      const detailsInfo = new FetchDetails(`https://www.eurogirlsescort.com${res[i].url}`, `${res[i].url}`);

      let result2 = await detailsInfo.loadStart();

      await details.push(result2);
    }

    let dataObj = {
      start: res,
      details: details
    }
    let writeData = JSON.stringify(dataObj, null, 2);

    fs.writeFile(`page-${i}.json`, writeData, function(err) {
      if(err) throw err;
      console.log(`Writing done!! - page ${i} (.)(|)`);
    });
  }
})();
 
