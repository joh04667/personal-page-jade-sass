/*! portfolio 2016-10-06 */
var app=angular.module("MyPortfolio",["ngAnimate","wu.masonry","vModal"]);app.service("ListenerService",["$window","$rootScope",function(a,b){function c(c){a.addEventListener("scroll",function(a){b.$broadcast("DOM.scroll",a)})}return{scrollDown:c}}]),app.controller("TrayController",["ListenerService","$scope","$rootScope","$timeout","$http",function(a,b,c,d,e){function f(){e.get("/test").then(function(a){console.log("res",a)})}b.hide=!1,a.scrollDown(),d(function(){b.hide="hide"},5e3);var g=c.$on("DOM.scroll",function(){$(window).scrollTop()>250&&(d.cancel(),b.hide="hide",b.$digest(),g())});f()}]),app.controller("scroll",["ListenerService","$scope","$rootScope","$timeout",function(a,b,c,d){b.scrollTick=!1,a.scrollDown(),d(function(){b.scrollTick=!0},5e3),c.$on("DOM.scroll",function(){$(".scroll-notify").css({opacity:(100-$(window).scrollTop()/2)/100})})}]);