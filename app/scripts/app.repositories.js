'use strict';

var URL_API = 'http://localhost:5000/';

app.factory('ArticleRepository', ['$resource',
  function($resource) {
    var resource = $resource(URL_API+'articles/:id', {
        id:'@id'
    }, {
        update: {method: 'PUT'}
    });
    return resource;
}]);

app.factory('SectionRepository', ['$resource',
  function($resource) {
    var resource = $resource(URL_API+'sections/:id', {
        id:'@id'
    }, {
        update: {method: 'PUT'}
    });
    return resource;
}]);
