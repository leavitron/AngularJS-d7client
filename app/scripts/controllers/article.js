'use strict';

/**
 * @ngdoc function
 * @name D7clientApp.controller:ArticleCtrl
 * @description
 * # ArticleCtrl
 * Controller of the D7clientApp
 */
angular.module('D7clientApp')
  .controller('ArticleCtrl', ['$scope', '$routeParams', '$http', 'drupalUri', function ($scope, $routeParams, $http, drupalUri) {

    var nid = $routeParams.nid;
    $scope.more = false;
    $scope.mainColumn = 'large-12';

    $http.get(drupalUri + '/api/article/' + nid).then(function(response) {
      var data = response.data.nodes[0].node;
      $scope.data = data;
      $scope.title = data.title;
      $scope.body = data.body;
      $scope.nodeID = data.nid;
    });

    $http.get(drupalUri + '/api/more-articles/' + nid).then(function(mresponse) {
      $scope.mdata = mresponse.data.nodes;
      if (mresponse.data.nodes.length > 0) {
        $scope.more = true;
        $scope.mainColumn = 'large-8';
      }
    });

    $scope.has_more = function () {
      return $scope.more;
    };


  }]);
