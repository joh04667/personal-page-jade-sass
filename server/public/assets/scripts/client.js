/*! portfolio 2016-08-11 */
var app=angular.module("MyPortfolio",["ngAnimate","wu.masonry","vModal"]);app.service("ListenerService",["$window","$rootScope",function(a,b){function c(c){a.addEventListener("scroll",function(a){b.$broadcast("DOM.scroll",a)})}return{scrollDown:c}}]),app.controller("TrayController",["ListenerService","$scope","$rootScope","$timeout",function(a,b,c,d){b.hide=!1,a.scrollDown(),d(function(){b.hide="hide"},5e3);var e=c.$on("DOM.scroll",function(){$(window).scrollTop()>250&&(d.cancel(),b.hide="hide",b.$digest(),e())})}]),app.controller("scroll",["ListenerService","$scope","$rootScope","$timeout",function(a,b,c,d){b.scrollTick=!1,a.scrollDown(),d(function(){b.scrollTick=!0},5e3),c.$on("DOM.scroll",function(){$(".scroll-notify").css({opacity:(100-$(window).scrollTop()/2)/100})})}]);