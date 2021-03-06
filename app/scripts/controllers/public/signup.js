'use strict';

/**
 * @ngdoc function
 * @name sitetribbleApp.controller:SignupCtrl
 * @description
 * # SignupCtrl
 * Controller of the sitetribbleApp
 */
app.controller('SignupCtrl',['$scope','signupService','$state','StoreRepository', function ($scope,signupService,$state,StoreRepository) {
  $scope.user = {
    fullname: null,
    email: null,
    password: null,
  };
  $scope.store = {
    name: null,
  }

  $scope.goSubscribe = function () {
    //validate user model
    if (!$scope.user.fullname || $scope.user.fullname.split(' ').length < 2){
      alert('Asegurate ingresar tu nombre completo, inclyendo al menos un Nombre y un Apellido.');
      return;
    }
    var emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!emailRegex.test($scope.user.email)) {
      alert('Email invalido, despues de corregirlo intentalo nuevamente!');
      return;
    }
    var passRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d]{8,100}$/;
    if (!passRegex.test($scope.user.password)) {
      alert('Password invalido, tu password debe ser de minimo 8 y maximo 100 caracteres, y contener al menos: 1 numero, 1 letra minuscula y 1 letra mayuscula.');
      return;
    }

    //validate store model
    //TODO

    //create store first
    StoreRepository.save($scope.store, function(resp, headers){
      //create user account
      var customData = {
        store: resp._id,
      };
      signupService.signup($scope.user.fullname, $scope.user.email, $scope.user.password, customData)
        .then(function(data){
          //update store to reference user
          //TODO

          //redirect to login page
          alert('Tu cuenta ha sido creada! Bienvenido a Tribble!');
          $state.go('login');
        }, function(err){
          alert('error in signup!');
          console.log(err);
        });

    }, function(err){
      alert('error in signup!');
      console.log(err);
    });
  };

}]);
