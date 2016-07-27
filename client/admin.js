var app = angular.module('MyAdmin', ['angularTrix']);

app.controller('PostListController', ['$scope', '$http', function($scope, $http) {

  $scope.postList = ['test', 'tester', 'melon', 'farts'];

}]);

app.controller('NewPostController', ['$scope', '$http', function($scope, $http) {


}]);
