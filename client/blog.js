var app = angular.module('BlogPost', []);

function codify() {
  var pre = document.getElementsByTagName('pre');
  console.log(pre);
  for(var i = 0; i < pre.length; i++) {
    pre[i].className ='prettyprint';
    console.log(pre[i])
  }
}
