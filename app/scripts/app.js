'use strict';

/**
 * @ngdoc overview
 * @name D7clientApp
 * @description
 * # D7clientApp
 *
 * Main module of the application.
 */
var app = angular
  .module('D7clientApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ng',
    'viewhead',
    'services.SharedServices'
  ])
  .config(['$routeProvider', '$httpProvider', '$locationProvider', function ($routeProvider, $httpProvider, $locationProvider) {
    // $locationProvider.html5Mode(true);
    $locationProvider.hashPrefix('!');

    $routeProvider
      .when('/', {
        templateUrl: '/views/main.html',
        controller: 'MainCtrl'
      })
      .when('/project', {
        templateUrl: '/views/projects.html',
        controller: 'ProjectsCtrl'
      })
      .when('/project/:nid', {
        templateUrl: '/views/project.html',
        controller: 'ProjectCtrl'
      })
      .when('/contact', {
        templateUrl: '/views/contact.html',
        controller: 'ContactCtrl'
      })
      .when('/blog/:nid', {
        templateUrl: '/views/article.html',
        controller: 'ArticleCtrl'
      })
      .when('/blog', {
        templateUrl: '/views/articles.html',
        controller: 'ArticlesCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  }]);

/** Ajax Spinner **/
angular.module('services.SharedServices', []).config(function ($httpProvider) {
  $httpProvider.responseInterceptors.push('myHttpInterceptor');
  var spinnerFunction = function (data) {
    angular.element('#loading').show();
    angular.element('#hide-while-loading').hide();
    return data;
  };
  $httpProvider.defaults.transformRequest.push(spinnerFunction);
}).factory('myHttpInterceptor', function ($q) {
  return function (promise) {
    return promise.then(function (response) {
      angular.element('#loading').hide();
      angular.element('#hide-while-loading').show();
      return response;
    }, function (response) {
      angular.element('#loading').hide();
      angular.element('#hide-while-loading').show();
      return $q.reject(response);
    });
  };
});
/** Ajax Spinner **/

app.factory('articleService', ['$http', function ($http) {
  return {
    getArticles: function (url) {
      return $http.get(url);
    }
  };
}]);

app.factory('FeedService', ['$http', function($http) {
  return {
    parseFeed : function(url){
      return $http.jsonp('//ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=50&callback=JSON_CALLBACK&q=' + encodeURIComponent(url));
    }
  };
}]);

// Define a constant for the Drupal installation location.
app.constant('drupalUri', 'http://d7.jooplaan.com');
