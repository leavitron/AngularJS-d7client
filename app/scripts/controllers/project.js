'use strict';

/**
 * @ngdoc function
 * @name D7clientApp.controller:ProjectCtrl
 * @description
 * # ProjectCtrl
 * Controller of the D7clientApp
 */
angular.module('D7clientApp')
  .controller('ProjectCtrl', ['$scope', '$routeParams', '$http', 'drupalUri', function ($scope, $routeParams, $http, drupalUri) {

    var nid = $routeParams.nid;

    $http.get(drupalUri + '/api/project/' + nid).then(function(response) {
      var data = response.data.nodes[0].node;
      $scope.data = data;
      $scope.title = data.title;
      $scope.body = data.body;
      $scope.nodeID = data.nid;

      // var regex = /<img.*?src="(.*?)"/;
      // $scope.callOutLarge = regex.exec(data.field_call_out_image_medium_jpg)[1];
      // $scope.callOutMedium = regex.exec(data.field_call_out_image_medium_jpg)[1];
      // $scope.callOutSmall = regex.exec(data.field_call_out_image_medium_jpg)[1];
      // $scope.callOutSquareLarge = regex.exec(data.field_call_out_image_square_larg)[1];
      // $scope.callOutSquareMedium = regex.exec(data.field_call_out_image_square_medi)[1];
      // $scope.callOutSquareSmall = regex.exec(data.field_call_out_image_square_smal)[1];

      console.log('ProjectCtrl GET $scope', $scope );
      console.log('ProjectCtrl GET data', data);

    });
  }]);
