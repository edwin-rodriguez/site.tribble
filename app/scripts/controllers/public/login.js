'use strict';

/**
 * @ngdoc function
 * @name sitetribbleApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the sitetribbleApp
 */
app.controller('LoginCtrl',['$scope','authenticationService','$state', function ($scope, authenticationService,$state) {
  $scope.$parent.bodyClass = '';

  $scope.loginData = {
    email: 'test@account.com', //edwin3@rodriguez.com
    password: 'Admin123', //Admin123
  };
  $scope.goLogin = function (){
    authenticationService.login($scope.loginData.email, $scope.loginData.password)
      .then(function(data){
        $state.go('private.home');
      }, function(err){
        alert('error login!');
        console.log(err);
      });
  }
}]);
