var util = {
  prettyDate: function(date) {
    var locale = date.toLocaleDateString().split('-');
    return [locale[1], locale[2], locale[0]].join('/');
  },
  dateString: function(date) {
    var months = ['Jan', 'Feb', 'Mar', 'April', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
    return months[date.getMonth()] + ' ' + date.getDate() + ', ' + date.getFullYear();

  }
};


module.exports = util;
