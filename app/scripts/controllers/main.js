'use strict';

/**
 * @ngdoc function
 * @name D7clientApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the D7clientApp
 */
angular.module('D7clientApp')
  .controller('MainCtrl', ['$scope', 'articleService', 'drupalUri', function ($scope, nodes, drupalUri) {
    // Page title.
    $scope.viewTitle = 'Joop Laan - Web development';
    // Banner image, random image per time of day.
    var hr = new Date().getHours();
    // Get time of day part.
    var data = [
      [0, 6, '15'],   // tag 18: nightlife
      [6, 17, '4'],   // tag 4: people
      [18, 24, '16']  // tag 16: nature
    ];
    for(var i=0; i<data.length;i++){
      if(hr >= data[i][0] && hr <= data[i][1]){
        var banner_img_tag = data[i][2];
        break;
      }
    }

    // Get json for images with tag.
    $scope.loadBannerImages = function () {
      var url = drupalUri + '/api/banner/' + banner_img_tag;
      nodes.getArticles(url).then(function (response) {
        var items = response.data.nodes;
        // Pick a rondom image.
        var item = items[Math.floor(Math.random()*items.length)];
        // Use smaller image on small devices.
        if(window.innerWidth < 500) {
          $scope.banner_src = item.node.photo_small.src;
        }
        else {
          $scope.banner_src = item.node.photo.src;
        }
        $scope.banner_src_small = item.node.photo_small.src;
        $scope.banner_src_large = item.node.photo_small.src;

        $scope.banner_alt = item.node.title;
        $scope.banner_photo_credit_name = item.node.photo_credit_name;
        $scope.banner_photo_credit_url = item.node.photo_credit_url;
        // picturefill();
      });
    };
    $scope.loadBannerImages();

    // Welcome messages.
    var messages = [
      [0, 5, 'Hi, Night Owl!'],
      [6, 11, 'Good morning!'],
      [12, 17, 'Good afternoon'],
      [18, 24, 'A very good evening.. :)']
    ];
    // Pick message for time of day.
    for(var x=0; x<messages.length;x++){
      if(hr >= messages[x][0] && hr <= messages[x][1]){
        $scope.greeting = messages[x][2];
        break;
      }
    }

    // Welcome info, page node/226.
    $scope.loadPageWelcome = function () {
      var url = drupalUri + '/api/page/226';
      nodes.getArticles(url).then(function (response) {
        $scope.welcome_title = response.data.nodes[0].node.title;
        $scope.welcome_body = response.data.nodes[0].node.body;
        $scope.welcome_side_text = response.data.nodes[0].node.side_text;
      });
    };
    $scope.loadPageWelcome();

    // Current project list. http://d7.jooplaan.com/api/project
    $scope.loadCurrentProjects = function () {
      var url = drupalUri + '/api/project';
      nodes.getArticles(url).then(function (response) {
        var projects = response.data.nodes;
        for (var y = 0; y < projects.length; y++) {
          var project = projects[y].node;
          if(project.project_in_progress === '1') {
            $scope.currentProjects = $scope.currentProjects.concat(project);
          }
        }
      });

    };

    $scope.currentProjects = [];
    $scope.loadCurrentProjects();

    // http://d7.jooplaan.com/api/article-latest
    $scope.loadHomeBlogPost = function () {
      var url = drupalUri + '/api/article-latest';
      nodes.getArticles(url).then(function (response) {
        $scope.blogpost_nid = response.data.nodes[0].node.nid;
        $scope.blogpost_title = response.data.nodes[0].node.title;
        $scope.blogpost_body = response.data.nodes[0].node.body;
        $scope.blogpost_img_src = response.data.nodes[0].node.featured_image.src;
        $scope.blogpost_img_alt = response.data.nodes[0].node.featured_image.alt;
      });
    };
    $scope.loadHomeBlogPost();
  }]);
