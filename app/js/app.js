'use strict';
/*globals _, angular*/

var app = angular.module('app', ['ngRoute']);

app.constant('_', _);


app.service('myService', ['_', function (_) {
  var arr = ['Hello', 'World'];
  return {
    getGreetings : function () {
      return arr.join(', ');
    },
    getLengths: function () {
      return _.map(arr, function (val) { return val.length; });
    }
  };
}]);


app.service('myHttpService', ['$q', '$http', function ($q, $http) {
  function tryAGet() {
    var defer = $q.defer();
    $http.get('/api/address').then(function (data) {
      defer.resolve(data);
    }, function (err) {
      defer.reject(err);
    });
    return defer.promise;
  }

  return {
    get : tryAGet
  };
}]);

app.controller('appCtrl', ['$scope', 'myService', 'myHttpService', function ($scope, myService, httpService) {
  $scope.message = myService.getGreetings();
  httpService.get().then(
    function (data) {
      console.log(data);
    },
    function (err) {
      console.log(err);
    }
  );
}]);