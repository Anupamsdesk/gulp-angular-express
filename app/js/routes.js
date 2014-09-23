/*globals app*/
'use strict';
app.config(['$routeProvider', function ($rp) {
  $rp.when('/', {
    templateUrl: 'js/views/main.template.html',
    controller: 'appCtrl'
  });

  /*
  $rp.when('/', {
    templateUrl: 'js/views/viewtemplate.html',
    controller: 'appCtrl',
    resolve: {
      'authentication': authService.authenticate
    }
  });
  $rp.otherwise({
    redirectTo: '/login'
  });
  */
}]);
