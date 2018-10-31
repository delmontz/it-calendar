const withCSS = require('@zeit/next-css');
const exportPathMap =  async function (defaultPathMap) {
   return {
     '/': { page: '/' },
   }
}

module.exports = withCSS(exportPathMap());
