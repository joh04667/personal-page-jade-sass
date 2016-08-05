var app = angular.module('MyPortfolio', ['ngAnimate', 'wu.masonry', 'vModal']);


app.service('ListenerService', ['$window', '$rootScope', function($window, $rootScope) {

    function scrollDown(callback) {
      $window.addEventListener('scroll', function(event) {
        $rootScope.$broadcast('DOM.scroll', event);
      });
    }

    return {
      scrollDown: scrollDown
    };

}]);

// app.factory('myModal', function (vModal) {
//   return vModal({
//     controller: 'MyModalController',
//     controllerAs: 'myModalCtrl',
//     templateUrl: 'my-modal.html'
//   });
// });

app.controller('TrayController', ['ListenerService', '$scope', '$rootScope', '$timeout', function(ListenerService, $scope, $rootScope, $timeout) {
  $scope.hide = false;
  ListenerService.scrollDown();

  $timeout(function() {
    $scope.hide = 'hide';
  }, 5000);

// if user scrolls a bit show tray.
// Also, cancel timeout above, digest to start animation, and deregister itself
  var scrollListen = $rootScope.$on('DOM.scroll', function() {
    if($(window).scrollTop() > 250) {
      $timeout.cancel();
      $scope.hide = 'hide';
      $scope.$digest();
      scrollListen();
    }
  });


}]);

app.controller('scroll', ['ListenerService', '$scope', '$rootScope', '$timeout', function(ListenerService, $scope, $rootScope, $timeout) {
  $scope.scrollTick = false;
  ListenerService.scrollDown();

  $timeout(function() {
    $scope.scrollTick = true;
  }, 5000);

  $rootScope.$on('DOM.scroll', function() {
    $('.scroll-notify').css({'opacity':( 100-$(window).scrollTop()/2 )/100});
  });
}]);
