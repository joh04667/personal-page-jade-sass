var util = {
  prettyDate: function(date) {
    return date.toLocaleDateString();
    //return [locale[1], locale[2], locale[0]].join('/');
  },
  dateString: function(date) {
    var months = ['Jan', 'Feb', 'Mar', 'April', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
    return months[date.getMonth()] + ' ' + date.getDate() + ', ' + date.getFullYear();
  },
  addPrettyClass: function(post) {
    // use Cheerio to load the body html.
    var $ = require('cheerio').load(post);
    // Use cheerio's jQuery methods to add 'prettyprint' class to <pre> tags
    // This has to be done serverside as Trix will not allow attribute editing.
    // either that or I just can't figure it out, idk
    $('pre').addClass('prettyprint');
    // store new body with 'prettyprint' tags added in variable
    return $.html();
  }
};


module.exports = util;
