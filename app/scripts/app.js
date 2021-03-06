'use strict';

/**
 * @ngdoc overview
 * @name sitetribbleApp
 * @description
 * # sitetribbleApp
 *
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


  //auth interceptor for Bearer token
  .factory('authInterceptorService', ['$q', '$location'/*,'localStorageService'*/, function ($q, $location/*,localStorageService*/) {

    var authInterceptorServiceFactory = {};

    var _request = function (config) {
      config.headers = config.headers || {};

      //var authData = localStorageService.get('authorizationData');
      var authData = sessionStorage.getItem("access_token");
      if (authData) {
          config.headers.Authorization = 'Bearer ' + authData;
      }

      return config;
    };

    var _responseError = function (rejection) {
      if (rejection.status === 401) {
        $location.path('/');
      }
      return $q.reject(rejection);
    }

    authInterceptorServiceFactory.request = _request;
    authInterceptorServiceFactory.responseError = _responseError;

    return authInterceptorServiceFactory;
  }])
  .config(['$httpProvider',function ($httpProvider) {
    $httpProvider.interceptors.push('authInterceptorService');
  }])

  //validate auth responses after route changes
  .run(['$rootScope', '$state', 'authenticationService', function ($rootScope, $state, authenticationService) {
    $rootScope.$on('$stateChangeStart', function (event, toState, toParams) {
      var token = authenticationService.getAccessToken();
      if (toState.data && toState.data.requireLogin) {
        if (token === undefined) {
          event.preventDefault();
          $state.go('login'); // get me a login modal!
        }
      } else {
        if (token != undefined) {
          event.preventDefault();
          $state.go('private.home'); // get me a login modal!
        }
      }
    });
  }])

  //routes config
  .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider
      .when('', '/#/')
      .otherwise('/noencontrado');

    $stateProvider
      .state('404', {
        url: '/noencontrado',
        views: {
          'main': {
            templateUrl: 'views/public/404.html',
            controller: function () { }
          }
        }
      })
      .state('login', {
        url: '/ingresar',
        views: {
          'main': {
            templateUrl: 'views/public/login.html',
            controller: 'LoginCtrl'
          }
        }
      })
      .state('signup', {
        url: '/suscribirme',
        views: {
          'main': {
            templateUrl: 'views/public/signup.html',
            controller: 'SignupCtrl'
          }
        }
      })
      .state('forgotpassword', {
        url: '/recuperarcontrasena',
        views: {
          'main': {
            templateUrl: 'views/public/forgotpassword.html',
            controller: function () { }
          }
        }
      })

      .state('private', {
        abstract: true,
        data: {
          requireLogin: true
        },
        views: {
          'main': {
            templateUrl: 'index.main.html',
            controller: function ($scope){
              $scope.$parent.bodyClass = 'teal';
            }
          }
        }
      })
      .state('private.home', {
        url: '/',
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })

      //store
      .state('private.store', {
        url: '/mitienda',
        templateUrl: 'views/store/store.html',
        controller: 'StoreCtrl'
      })

      //articles
      .state('private.articles', {
        url: '/articulos',
        templateUrl: 'views/articles/list.html',
        controller: 'ArticleCtrl'
      })
      .state('private.articles_new', {
        url: '/articulos/nuevo',
        templateUrl: 'views/articles/article.html',
        controller: 'ArticleDetailCtrl',
      })
      .state('private.articles_view', {
        url: '/articulos/ver/:id',
        templateUrl: 'views/articles/article.html',
        controller: 'ArticleDetailCtrl'
      })
      ;
  }])

  //image upload directive
  .directive('flowItem', [function () {
    return {
      'scope': false,
      'require': '^flowInit',
      'link': function (scope, element, attrs) {
        var file = attrs.flowItem;
        scope.$watch(file, function (file) {
          if (!file) {
            return;
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
