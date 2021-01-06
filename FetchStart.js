const fetch = require('node-fetch');
const parser = require('fast-html-parser');

class FetchStart {
  constructor (url) {
    this.url = url;
  }

  loadStart = () => {
    return new Promise((success, failure) => {
      fetch(`${this.url}`)
        .then(html => html.text())
        .then(htmlText => {

          let root = parser.parse(htmlText);

          let content = root.querySelector('.list-items').childNodes;

          let data = [];

          for (let i=0; i<content.length; i++) {
            if(content[i].isWhitespace === true) continue;

            let url = content[i].childNodes[1].attributes.href;
            let title = content[i].childNodes[1].childNodes[1].structuredText;
            let image = content[i].childNodes[1].childNodes[3].childNodes[1].attributes['data-src'];
            let info = content[i].childNodes[1].childNodes[5].structuredText;

            data.push({
              url: url,
              title: title,
              image: image,
              info: info
            });
          }
          
          success([data]);
        })
    });
  }
}

module.exports = FetchStart;