const client = require('cheerio-httpcli');

client.fetch('https://connpass.com/event/95485/', (err, $, res) => {
   //const result = [];
   //  $('.normal_list').each(function (id, el) {
   //      const month = $(this).find('.normal_h2').text();

   //      $(this).find('li').each(function (id, el) {
   //          result.push(month + $(this).text().replace(/\r?\n?/g, ''));
   //      });
   //  });
    console.log($('meta[name="description"]').attr('content'));
});