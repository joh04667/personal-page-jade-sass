var app = angular.module('MyAdmin', ['angularTrix', 'ngAria', 'ngAnimate', 'ngMaterial', 'vModal']);

app.factory('DataService', ['$http', function($http) {

    var result = {};
    var GetPosts = function() {
        $http.get('/admin/all').then(function(response) {
            result.data = response.data;
        });
    };

    GetPosts();

    var modalData = {};
    var modalShare = function(postId) {
      var post = result.data.find(function(s) {
        return s.id === postId;
      });
      modalData.data = postId === undefined ? {} : post;
    }

    return {
        modalShare: modalShare,
        modalData: modalData,
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



app.controller('ModalController', ['MyModal', 'DataService', '$http', '$scope', '$window', function(MyModal, DataService, $http, $scope, $window) {
    $scope.close = function() {
      MyModal.deactivate();
      DataService.modalShare();
    }
    $scope.modalData = DataService.modalData.data;

// when editor is initialized in modal, insert selected posts' data in body and title
    $scope.trixInitialize = function(e, editor) {
      editor.setSelectedRange([0, 0])
      editor.insertHTML($scope.modalData.body)
      $scope.modalTitle = DataService.modalData.data.title;
    }



    $scope.submit = function() {

      if($scope.modalTitle && $scope.modalBody) {

        $http.put('/admin/edit/' + DataService.modalData.data.id, {
          title: $scope.modalTitle,
          body: $scope.modalBody
        }).then(function(response) {

          if(response.status != 200) {
            alert('Error updating database');
          } else {
            $window.location.href = '/blog/' + DataService.modalData.data.id;
          }

        });
      }
    }
}]);


app.controller('PostListController', ['DataService', '$scope', 'MyModal', function(DataService, $scope, MyModal) {
    $scope.edit = function(post) {
      MyModal.activate();
      DataService.modalShare(post);
    }
    $scope.modalData = DataService.modalData.data;

}]);

app.controller('NewPostController', ['DataService', '$scope', '$http', '$window', function(DataService, $scope, $http, $window) {
    function resetScope() {
        $scope.title = '';
        $scope.body = '';
    }


    // create storage key for images. Might not need as filenames will do for repeated images!
    // Plunkr example: http://plnkr.co/edit/hSzwlzUmRQoUtZJke2C4?p=preview
    createStorageKey = function(file) {
      var date, day, time;
      date = new Date();
      day = date.toISOString().slice(0, 10);
      time = date.getTime();
      return "tmp/" + day + "/" + time + "-" + file.name;
    };


    $scope.submit = function() {

        if ($scope.title && $scope.body) {
            $http.post('/admin/new', {
                title: $scope.title,
                body: $scope.body
            }).then(function(response) {
                DataService.GetPosts();
                $window.location.href = '/blog/latest';
            });

        }
    };

}]);
