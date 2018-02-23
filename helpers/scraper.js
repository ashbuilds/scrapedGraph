var scraperjs = require('scraperjs');

var Stock = require('../models/stock');

var saveStock = function(stockObject){
  var stock = new Stock();

  stock['index'] = stockObject.index;
  stock['value'] = stockObject.value;

  stock.save(function(err) {
    if (err)
      console.log(err);
  console.log('Stock created!');
  });
};

module.exports = {
  scape: function(){
    var result = [];
    return scraperjs.StaticScraper.create('https://www.nasdaq.com/')
        .scrape(function($) {
          var dataText = $('#indexTable').text();
          var splitedData = dataText.split('nasdaqHomeIndexChart.storeIndexInfo');
          splitedData.shift();
          result = splitedData.map(function(item){
            var mainItem = item.match(/\(([^)]+)\)/)[1];
            mainItem = mainItem.split(',');
            mainItem = {index: JSON.parse(mainItem[0]), value: JSON.parse(mainItem[1])};
            saveStock(mainItem);
            return mainItem;
          });
          return result;
        })
        .then(function(data) {
          return data;
        })
  }
};