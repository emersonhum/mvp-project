angular.module('app', ['ngRoute'])


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
    Search.submitUsername($scope.username);
  };
})

.factory('Search', function($http) {

  var submitUsername = function(user) {
    console.log(user);
    return $http({
      method: 'POST',
      url: '/',
      data: {username: user}
    })
    .then(function(data) {
      console.log(data);
    });
  };

  return {
    submitUsername: submitUsername
  };

});