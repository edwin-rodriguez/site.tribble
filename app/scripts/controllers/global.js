'use strict';

/**
 * @ngdoc function
 * @name sitetribbleApp.controller:GlobalCtrl
 * @description
 * # GlobalCtrl
 * Controller of the sitetribbleApp
 */
app.controller('GlobalCtrl', ['$scope','authenticationService','$state',function ($scope, authenticationService,$state) {
  $scope.logout = function (){
    authenticationService.logout();
    $state.go('private.home');
  };
}]);
