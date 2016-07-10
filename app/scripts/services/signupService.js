'use strict';

var URL_AUTH_API = 'http://localhost:3000/';

app.factory("signupService", ["$http", "$q", function ($http, $q) {
  return {
      signup: function (fullname, email, password) {
          var deferred = $q.defer();

          $http.post(URL_AUTH_API+"signup", { fullname: fullname, email: email, password: password })
              .then(function (result) {
                console.log(result.data);
                deferred.resolve(result);
              }, function (error) {
                  deferred.reject(error);
              });

          return deferred.promise;
      }
  };
}]);
