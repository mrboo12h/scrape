const fetch = require('node-fetch');

class FetchDetails {
  constructor (url, route) {
    this.url = url;
    this.route = route;
  }

  loadStart = () => {
    return new Promise((success, failure) => {
      fetch(`${this.url}`)
        .then(html => html.text())
        .then(htmlText => {
          const parser = require('fast-html-parser');

          let root = parser.parse(htmlText);

          let content = root.querySelector('.description');

          let data = [];
          let imgData = [];

          let title = content.childNodes[1].structuredText;
          let description = content.childNodes[5].structuredText;

          let specContent = root.querySelector('.params').structuredText;

          data.push({
            title: title,
            description: description,
            specification: specContent,
            routeName: this.route
          });
          let imgContent = root.querySelector('.thumbs').childNodes;

          for (let i=0; i<imgContent.length; i++) {
            if (imgContent[i].isWhitespace === true) continue;

            let images = imgContent[i].childNodes[1].attributes.href;

            imgData.push({
              image: images
            });
          }
          success([data, imgData]);
        })
    });
  }
}

module.exports = FetchDetails;