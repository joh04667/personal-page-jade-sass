/*! portfolio 2016-10-05 */
var app=angular.module("MyAdmin",["angularTrix","ngAria","ngAnimate","ngMaterial","vModal"]);app.factory("DataService",["$http",function(a){var b={},c=function(){a.get("/admin/all").then(function(a){b.data=a.data})};c();var d={},e=function(a){var c=b.data.find(function(b){return b.id===a});d.data=void 0===a?{}:c};return{modalShare:e,modalData:d,result:b,GetPosts:c}}]),app.factory("MyModal",["vModal",function(a){return a({controller:"ModalController",templateUrl:"views/edit_modal.html"})}]),app.controller("ModalController",["MyModal","DataService","$scope",function(a,b,c){c.close=function(){a.deactivate(),b.modalShare()},c.modalData=b.modalData.data,c.trixInitialize=function(a,b){b.setSelectedRange([0,0]),b.insertHTML(c.modalData.body)}}]),app.controller("PostListController",["DataService","$scope","MyModal",function(a,b,c){b.edit=function(b){c.activate(),a.modalShare(b)},b.modalData=a.modalData.data}]),app.controller("NewPostController",["DataService","$scope","$http",function(a,b,c){function d(){b.title="",b.body=""}b.submit=function(){b.title&&b.body&&(c.post("/admin/new",{title:b.title,body:b.body}).then(function(b){a.GetPosts()}),d())}}]);