var app = angular.module('MyApp', ['ngAnimate', 'wu.masonry', "ngSticky"]);


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


app.controller('scroll', ['ListenerService', '$scope', '$rootScope', '$timeout', function(ListenerService, $scope, $rootScope, $timeout) {
  $scope.scrollTick = false;

  ListenerService.scrollDown();

  $timeout(function() {
    $scope.scrollTick = true;
  }, 6000);

  $rootScope.$on('DOM.scroll', function() {
    $('.scroll-notify').css({'opacity':( 100-$(window).scrollTop()/2 )/100});
  });

}]);
