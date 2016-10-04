var app = angular.module('MyAdmin', ['angularTrix', 'ngAria', 'ngAnimate', 'ngMaterial']);

app.factory('DataService', ['$http', function($http) {

  var result = {};
  var GetPosts = function() {
    $http.get('/admin/all').then(function(response) {
      result.data = response.data;
    });
  };

  GetPosts();

  return {
    result: result,
    GetPosts: GetPosts
  };

}]);


app.controller('PostListController', ['DataService', '$scope', function(DataService, $scope) {

  $scope.edit = function(stuff) {
    console.log(stuff);
  };

}]);

app.controller('NewPostController', ['DataService', '$scope', '$http', function(DataService, $scope, $http) {
  function resetScope() {
    $scope.title = '';
    $scope.body = '';
  }

  $scope.submit = function() {

    if($scope.title && $scope.body) {
      $http.post('/admin/new', {title: $scope.title, body: $scope.body}).then(function(response){
        DataService.GetPosts();
      });
      resetScope();
    }
  };

}]);
