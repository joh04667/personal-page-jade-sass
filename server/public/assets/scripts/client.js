/*! portfolio 2016-07-28 */
var app=angular.module("MyPortfolio",["ngAnimate","wu.masonry","vModal"]);app.service("ListenerService",["$window","$rootScope",function(a,b){function c(c){a.addEventListener("scroll",function(a){b.$broadcast("DOM.scroll",a)})}return{scrollDown:c}}]),app.factory("myModal",function(a){return a({controller:"MyModalController",controllerAs:"myModalCtrl",templateUrl:"my-modal.html"})}),app.controller("scroll",["ListenerService","$scope","$rootScope","$timeout",function(a,b,c,d){b.scrollTick=!1,a.scrollDown(),d(function(){b.scrollTick=!0},6e3),c.$on("DOM.scroll",function(){$(".scroll-notify").css({opacity:(100-$(window).scrollTop()/2)/100})})}]);