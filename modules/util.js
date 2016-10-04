var util = {
  // Make a date pretty and human readable (keeping here for uniform format changes)
  prettyDate: function(date) {
    return date.toLocaleDateString();
  },

  // Make an ISO date string in text-string format. No, I don't know what Moment.JS is.
  dateString: function(date) {
    var months = ['Jan', 'Feb', 'Mar', 'April', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
    return months[date.getMonth()] + ' ' + date.getDate() + ', ' + date.getFullYear();
  },

  // Make an HTML snippet usable with Prettify's code syntax highlighting.
  addPrettyClass: function(post) {
    // Uses Cheerio to load the body html. Cheerio exposes jQuery methods to interact with it like it was on the DOM. 
    var $ = require('cheerio').load(post);
    $('pre').addClass('prettyprint');
    return $.html();
  }
};


module.exports = util;
