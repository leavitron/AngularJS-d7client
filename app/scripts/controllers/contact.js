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
        // console.log(response.data.nodes[0].node.featured_image.src);
      });
    };
    $scope.loadPageContact();

    $scope.has_jam = function() {
      return $scope.jammin;
    };
    $scope.loadMyJam = function() {
      var Jurl = 'http://api.thisismyjam.com/1/joop.json';
      nodes.getArticles(Jurl).then(function (response) {
        if (response.data.person.hasCurrentJam) {
          $scope.jammin = response.data.person.hasCurrentJam;
        }
        $scope.myjam = response.data.jam;
        // console.log(response.data.jam);
      });
    };
    $scope.jammin = false;
    $scope.loadMyJam();


    $scope.has_likes = function() {
      return $scope.likesFound;
    };
    $scope.loadLikedJams = function() {
      var lurl = 'http://api.thisismyjam.com/1/joop/likes.json?show=current';
      nodes.getArticles(lurl).then(function (response) {
        if (response.data.jams.length > 0) {
          $scope.likesFound = true;
          $scope.likes = response.data.jams;
        }
      });
    };
    $scope.likesFound = false;
    $scope.loadLikedJams();

    // console.log(tumblr_api_read.posts);
  }]);
