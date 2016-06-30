var app = angular.module('MyApp', ['ngAnimate']);


app.service('ListenerService', ['$window', '$rootScope', function($window, $rootScope) {

    // function scrollDown(callback) {
    //   $window.addEventListener('scroll', function(event) {
    //     $rootScope.$broadcast('DOM.scroll', event);
    //   });
    // }
    //
    // return {
    //   scrollDown: scrollDown
    // };

}]);


app.controller('scroll', ['ListenerService', '$scope', '$window', '$timeout', function(ListenerService, $scope, $window, $timeout) {
  $scope.scrolled = false;
  $scope.scrollTick = false;

  var scrollCount = 0;

  $window.addEventListener('scroll',function() {
    $scope.$broadcast('scroll', event);
  });

  $timeout(function() {
    $scope.scrollTick = true;
  }, 6000);

  // var listen = $scope.$on('scroll', function() {
  //   console.log('ddddd');
  //   scrollCount ++;
  //   if(scrollCount > 5) {
  //     listen();
  //     $scope.scrolled = true;
  //     $scope.$digest();
  //   }
  // });

  $scope.$on('scroll', function() {
    $('.scroll-notify').css({'opacity':( 100-$(window).scrollTop()/2 )/100});
  });

}]);
