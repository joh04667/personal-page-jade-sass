/*! portfolio 2016-07-26 */
var app=angular.module("MyAdmin",["angularTrix"]);app.controller("PostListController",["$scope",function(a){a.postList=["test","tester","melon","banana"]}]),app.controller("NewPostController",["$scope","$http",function(a,b){function c(){a.title="",a.body=""}a.submit=function(){a.title&&a.body&&(b.post("/admin/new",{title:a.title,body:a.body}).then(function(a){console.log("coool",a)}),c())}}]);