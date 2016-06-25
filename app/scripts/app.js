'use strict';

/**
 * @ngdoc overview
 * @name sitetribbleApp
 * @description
 * # sitetribbleApp
 *
 * Main module of the application.
 */
var app = angular
  .module('sitetribbleApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    //custom modules
    'ui.router',
    'flow',
    'isteven-multi-select',
    'jkuri.gallery',
    'ngTagsInput',
    'ui.utils.masks'
  ])

  .config(['$stateProvider','$urlRouterProvider',function ($stateProvider,$urlRouterProvider) {

    $urlRouterProvider
    .when('', '/#/')
    .otherwise('/noencontrado');

    $stateProvider
      .state('default', {
        url: '/',
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .state('about', {
        url: '/about',
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .state('404', {
        url: '/noencontrado',
        templateUrl: 'views/404.html'
      })
      
      //articles
      .state('articles', {
        url: '/articulos',
        templateUrl: 'views/articles/list.html',
        controller: 'ArticleCtrl'
      })
      .state('articles_new', {
        url: '/articulos/nuevo',
        templateUrl: 'views/articles/article.html',
        controller: 'ArticleDetailCtrl'
      })
      .state('articles_view', {
        url: '/articulos/ver/:id',
        templateUrl: 'views/articles/article.html',
        controller: 'ArticleDetailCtrl'
      })

      ;
  }])

  .directive('flowItem', [function() {
    return {
      'scope': false,
      'require': '^flowInit',
      'link': function(scope, element, attrs) {
        var file = attrs.flowItem;
        scope.$watch(file, function (file) {
          if (!file) {
            return ;
          }
          var fileReader = new FileReader();
          fileReader.readAsDataURL(file.file);
          fileReader.onload = function (event) {
            //this properties are used for other commponents, instead of reading the file again
            file.img = event.target.result;
            file.thumb = event.target.result;
            scope.$apply(function () {
              attrs.$set('data-src', event.target.result);
              attrs.$set('style', "background-image: url(" + event.target.result + ");");
              //data-src="../assets/media/gallery/10.jpg" style="background-image: url(../assets/media/gallery/10.jpg);"
            });
          };
        });
      }
    };
  }])
  /*.config(['flowFactoryProvider', function (flowFactoryProvider) {
    flowFactoryProvider.defaults = {
      target: 'upload.php',
      permanentErrors: [404, 500, 501],
      maxChunkRetries: 1,
      chunkRetryInterval: 5000,
      simultaneousUploads: 4,
      singleFile: true
    };
    flowFactoryProvider.on('catchAll', function (event) {
      console.log('catchAll', arguments);
    });
    // Can be used with different implementations of Flow.js
    // flowFactoryProvider.factory = fustyFlowFactory;
  }]);*/
  .config(['flowFactoryProvider', function (flowFactoryProvider) {
    flowFactoryProvider.defaults = {
      target: 'http://localhost:5000/images/article',
      //testMethod: 'POST',
      //target: '',
      permanentErrors: [500, 501],
      maxChunkRetries: 1,
      chunkRetryInterval: 5000,
      simultaneousUploads: 1
    };
    flowFactoryProvider.on('catchAll', function (event) {
      //console.log('catchAll', event, arguments);
    });
    // this is support for older browsers - Can be used with different implementations of Flow.js
    //flowFactoryProvider.factory = fustyFlowFactory;
  }]);
