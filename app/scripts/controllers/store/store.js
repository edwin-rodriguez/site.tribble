'use strict';

/**
 * @ngdoc function
 * @name sitetribbleApp.controller:StoreCtrl
 * @description
 * # StoreCtrl
 * Controller of the sitetribbleApp
 */
app.controller('StoreCtrl',['$scope','$stateParams','$location','StoreRepository','authenticationService', function ($scope,$stateParams,$location,StoreRepository,authenticationService) {
  //page setup
  $scope.tabs = {
    info: true,
    images: false,
    stats: false,
  };
  $scope.selectedTags = [];

  //load data from backend
  authenticationService.getUser().then(function(data){
    StoreRepository.get({ id: data.customData.store })
    .$promise.then(
      //success
      function (data) {
        $scope.store = data;
        $scope.store.id = $scope.store._id;
        $scope.selectedTags = $.map($scope.store.tags, function(tag, i){
          return { text: tag };
        });
      },
      //error handler
      function(error){
        if(error.status == "404"){
          $location.path('/noencontrado').replace();
        }
      }
    );
  }, function(err){
    console.log(err);
  });

  //actions
  $scope.changetab = function (tabname) {
    angular.forEach($scope.tabs, function (e, i) {
      $scope.tabs[i] = (i == tabname);
    });
  };
  $scope.save = function(){
    //prepare data model
    $scope.store.tags = $.map($scope.selectedTags, function(tag, i){
      return tag.text;
    });

    //save
    StoreRepository.update($scope.store)
    .$promise.then(
      //success
      function (data) {
        $scope.store = data;
      },
      //error handler
      function(error){
        console.log(error);
      }
    );
  };
}]);
