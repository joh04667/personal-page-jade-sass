/*! portfolio 2016-07-27 */
var app=angular.module("MyAdmin",["angularTrix"]);app.factory("DataService",["$http",function(a){var b={},c=function(){a.get("/admin/all").then(function(a){b.data=a.data,console.log(a)})};return c(),{result:b,GetPosts:c}}]),app.controller("PostListController",["DataService","$scope",function(a,b){}]),app.controller("NewPostController",["DataService","$scope","$http",function(a,b,c){function d(){b.title="",b.body=""}b.submit=function(){b.title&&b.body&&(c.post("/admin/new",{title:b.title,body:b.body}).then(function(b){a.GetPosts()}),d())}}]);