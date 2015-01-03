'use strict';

/**
 * @ngdoc function
 * @name D7clientApp.controller:ContactCtrl
 * @description
 * # ContactCtrl
 * Controller of the D7clientApp
 */
angular.module('D7clientApp')
  .controller('ContactCtrl', ['$scope', 'articleService', 'drupalUri', function ($scope, nodes, drupalUri) {

    // Welcome info, page node/250.
    $scope.loadPageContact = function () {
      var url = drupalUri + '/api/page/250';
      nodes.getArticles(url).then(function (response) {
        $scope.title = response.data.nodes[0].node.title;
        $scope.body = response.data.nodes[0].node.body;
        $scope.side_text = response.data.nodes[0].node.side_text;
        $scope.img_src = response.data.nodes[0].node.featured_image.src;
        $scope.img_alt = response.data.nodes[0].node.featured_image.alt;
        console.log(response.data.nodes[0].node.featured_image.src);
      });
    };
    $scope.loadPageContact();
  }]);
