'use strict';

var URL_AUTH_API = 'http://localhost:3000/';

app.factory("authenticationService", ["$http", "$q", "$window", function ($http, $q, $window) {
  var ACCESS_TOKEN_KEY = "access_token";
  return {
      login: function (email, password) {
          var deferred = $q.defer();

          $http.post(URL_AUTH_API+"authenticate", { login: email, password: password })
              .then(function (result) {
                console.log(result.data);
                var accessToken = result.data;
                $window.sessionStorage[ACCESS_TOKEN_KEY] = accessToken;
                deferred.resolve(accessToken);
              }, function (error) {
                  deferred.reject(error);
              });

          return deferred.promise;
      },
      logout: function () {
          $window.sessionStorage.removeItem(ACCESS_TOKEN_KEY);
      },
      getAccessToken: function () {
        return $window.sessionStorage[ACCESS_TOKEN_KEY];
      }
  };
}]);