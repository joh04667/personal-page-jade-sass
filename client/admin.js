var app = angular.module('MyAdmin', ['angularTrix', 'ngAria', 'ngAnimate', 'ngMaterial', 'vModal']);

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

app.factory('MyModal', ['vModal', function(vModal) {
    return vModal({
        controller: 'ModalController',
        templateUrl: 'views/edit_modal.html'
    })
}]);

app.controller('ModalController', ['MyModal', 'DataService', '$scope', function(MyModal, DataService, $scope) {
    $scope.close = MyModal.deactivate;

}]);


app.controller('PostListController', ['DataService', '$scope', 'MyModal', function(DataService, $scope, MyModal) {
    $scope.edit = MyModal.activate;

}]);

app.controller('NewPostController', ['DataService', '$scope', '$http', function(DataService, $scope, $http) {
    function resetScope() {
        $scope.title = '';
        $scope.body = '';
    }

    $scope.submit = function() {

        if ($scope.title && $scope.body) {
            $http.post('/admin/new', {
                title: $scope.title,
                body: $scope.body
            }).then(function(response) {
                DataService.GetPosts();
            });
            resetScope();
        }
    };

}]);
