angular.module('app', ['ngRoute'])

.run(function($rootScope) {
  $rootScope.followers = 0;
  $rootScope.following = 0;
})


.config(function($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: './app/search.html',
      controller: 'searchBarController'
    });
})
.controller('searchBarController', function($scope, Search) {
  console.log('hi');
  $scope.submitUsername = function() {
    // $rootScope.user = $scope.username;
    Search.submitUsername($scope.username);
  };
})

.controller('followController', function($scope, $rootScope) {
  // $scope.username = $rootScope.user;
  // $scope.username = 'dece';
  $scope.followers = $rootScope.followers;
  // $scope.followers = 13;
})

.factory('Search', function($http, $rootScope) {

  var submitUsername = function(user) {
    console.log(user);
    return $http({
      method: 'POST',
      url: '/',
      data: {username: user}
    })
    .then(function(followers) {
      $rootScope.followers = followers.data.ids.length;
      console.log($rootScope.followers);
    });
  };

  return {
    submitUsername: submitUsername
  };

});