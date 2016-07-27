var app = angular.module('MyAdmin', ['angularTrix']);

app.factory('DataService', ['$http', function($http) {

  var result = {};
  var GetPosts = function() {
    $http.get('/admin/all').then(function(response) {
      result.data = response.data;
      console.log(response);
    });
  };

  GetPosts();

  return {
    result: result,
    GetPosts: GetPosts
  };

}]);


app.controller('PostListController', ['DataService', '$scope', function(DataService, $scope) {
  $scope.postList = DataService.result;

}]);

app.controller('NewPostController', ['$scope', '$http', function($scope, $http) {
  function resetScope() {
    $scope.title = '';
    $scope.body = '';
  }

  $scope.submit = function() {
    if($scope.title && $scope.body) {
      $http.post('/admin/new', {title: $scope.title, body: $scope.body}).then(function(response){
        console.log('coool', response);
      });
      resetScope();
    }
  };

}]);
