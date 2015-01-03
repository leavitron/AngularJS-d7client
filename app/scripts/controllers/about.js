'use strict';

/**
 * @ngdoc function
 * @name D7clientApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the D7clientApp
 */
angular.module('D7clientApp')
  .controller('AboutCtrl', ['$scope', '$routeParams', '$http', 'drupalUri', function ($scope, $routeParams, $http, drupalUri) {

    $http.get(drupalUri + '/node/2').then(function(response) {
      var data = response.data;
      console.log('AboutCtrl GET data', data);
      $scope.data = data;
      $scope.type = data.type[0].target_id;
      $scope.title = data.title[0].value;
      $scope.body = data.body[0].value;
      console.log('AboutCtrl GET $scope', $scope);
    });
  }]);
