'use strict';

/**
 * @ngdoc function
 * @name sitetribbleApp.controller:ArticleCtrl
 * @description
 * # ArticleCtrl
 * Controller of the sitetribbleApp
 */
app.controller('ArticleCtrl',['$scope','$stateParams','$location','ArticleRepository','SectionRepository', function ($scope,$stateParams,$location,ArticleRepository,SectionRepository) {
  console.log('article controller!');
}]);
app.controller('ArticleDetailCtrl',['$scope','$stateParams','$location','ArticleRepository','SectionRepository', function ($scope,$stateParams,$location,ArticleRepository,SectionRepository) {
  //load data from backend
  if ($stateParams.id !== undefined) {
    console.log($stateParams.id);
    ArticleRepository.get({ id: $stateParams.id })
      .$promise.then(
        //success
        function (data) {
          console.log(data);
        },
        //error handler
        function(error){
          if(error.status == "404"){
            $location.path('/noencontrado').replace();
          }
        }
      );
  }

  //sections
  $scope.allsections = [];
  SectionRepository.query()
    .$promise.then(
      //success
      function (data) {
        console.log(data);
      },
      //error handler
      function(error){
        if(error.status == "404"){ }
      }
    );
  $scope.selectedSections = null;
  $scope.multiselecttranslation = {
    selectAll: "Todas",
    selectNone: "Ninguna",
    reset: "Reestablecer",
    search: "Buscar...",
    nothingSelected: "Ninguna Seccion seleccionada aun...",
  }


  //article data
  $scope.article = {
    name: '',
    description: '',
    tags: [],
    price: 0,
    sections: []
  };
  $scope.tabs = {
    info: true,
    images: false,
    stats: false,
  }

  //images
  /*$scope.galleryimages = [
    {thumb: 'images/thumbs/1.jpg', img: 'images/1.jpg', description: 'Image 1'},
    {thumb: 'images/thumbs/2.jpg', img: 'images/2.jpg', description: 'Image 2'}
  ];
  $scope.ImageUploadSucceed = function (file, message, flow){
    console.log(file);
  };*/

  //actions
  $scope.changetab = function (tabname) {
    angular.forEach($scope.tabs, function (e, i) {
      $scope.tabs[i] = (i == tabname);
    });
  };
  $scope.save = function(){
    console.log('article to save',$scope.article);
    console.log('selected sections', $scope.selectedSections);
  };
}]);
