'use strict';

/**
 * @ngdoc overview
 * @name 3djsTestApp
 * @description
 * # 3djsTestApp
 *
 * Main module of the application.
 */
angular
  .module('3djsTestApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      /*.when('/', {
        templateUrl: 'templates/demo.html',
        controller: 'DemoCtrl'
      })*/
      .when('/demo2', {
        templateUrl: 'templates/demo2.html',
        controller: 'Demo2Ctrl'
      })
      .when('/demo', {
        templateUrl: 'templates/demo.html',
        controller: 'DemoCtrl'
      })
      .when('/demo3', {
        templateUrl: 'templates/demo3.html',
        controller: 'Demo3Ctrl'
      })
      .otherwise({
        redirectTo: '/demo2'
      });
  });
