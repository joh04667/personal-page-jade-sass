/*! portfolio 2016-07-27 */
var app=angular.module("MyAdmin",["angularTrix"]);app.factory("DataService",["$http",function(a){var b={},c=function(){a.get("/admin/all").then(function(a){b.data=a.data,console.log(a)})};return c(),{result:b,GetPosts:c}}]),app.controller("PostListController",["DataService","$scope",function(a,b){b.postList=a.result}]),app.controller("NewPostController",["$scope","$http",function(a,b){function c(){a.title="",a.body=""}a.submit=function(){a.title&&a.body&&(b.post("/admin/new",{title:a.title,body:a.body}).then(function(a){console.log("coool",a)}),c())}}]);