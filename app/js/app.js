'use strict';
/*globals _, angular, console*/

var app = angular.module('app', ['ngRoute', 'ui.bootstrap']);
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


app.service('myHttpService', ['$q', '$http', '$timeout', function ($q, $http, $timeout) {
  function tryAGet() {
    var defer = $q.defer();
    $http.get('/api/address').then(function (data) {
      defer.resolve(data);
    }, function (err) {
      defer.reject(err);
    });
    return defer.promise;
  }
  function randomGet(token) {
    var defer = $q.defer(),
      rand = Math.random() * 10;
    $timeout(function () {
      defer.resolve({count: token, result: rand});
    }, rand * 1000);
    return defer.promise;
  }

  return {
    get : tryAGet,
    random: randomGet
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

  $scope.model = {
    results : [],
    latest: -1
  };

  var counter = 0, latest = 0;
  $scope.clearRequest = function () {
    $scope.model.results = [];
    counter = 0;
    latest = 0;
    $scope.model.latest = -1;
    $scope.model.progress = 0;
    $scope.model.received = 0;
  };

  function updateProgress() {
    $scope.model.progress = Math.ceil($scope.model.received * 100.0 / $scope.model.results.length);
  }

  $scope.makeRequest = function () {
    var p = counter;
    counter += 1;
    $scope.model.results.push({result: 'waiting..', count: p + 1 });

    httpService.random(p + 1).then(function (data) {
      $scope.model.results[data.count - 1].result = data.result;
      $scope.model.received += 1;
      updateProgress();
      if (data.count > latest) {
        $scope.model.latest = data.result;
        latest = data.count;
      }
    });
  };


  $scope.clearRequest();
}]);