'use strict';

/**
 * @ngdoc function
 * @name D7clientApp.controller:ArticlesCtrl
 * @description
 * # ArticlesCtrl
 * Controller of the D7clientApp
 */
angular.module('D7clientApp')
  .controller('ArticlesCtrl', ['$scope', '$filter', 'articleService', 'drupalUri', function ($scope, $filter, article, drupalUri) {
    $scope.loadData = function () {
      var url = drupalUri + '/api/article?page=' + $scope.page;
      article.getArticles(url).then(function (response) {
        $scope.more = response.data.nodes.length === $scope.per_page;
        $scope.nodes = $scope.nodes.concat(response.data.nodes);
        // console.log($scope.nodes);
      });
    };

    $scope.show_more = function () {
      $scope.page += 1;
      $scope.loadData();
    };

    $scope.has_more = function () {
      return $scope.more;
    };

    $scope.per_page = 10;
    $scope.page = 0;
    $scope.nodes = [];
    $scope.more = false;
    $scope.loadData();

  }]);
