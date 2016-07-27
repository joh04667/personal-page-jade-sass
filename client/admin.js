var app = angular.module('MyAdmin', ['angularTrix']);

app.controller('PostListController', ['$scope', function($scope) {

  $scope.postList = ['test', 'tester', 'melon', 'banana'];

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
