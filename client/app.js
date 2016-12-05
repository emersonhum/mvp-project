angular.module('app', [])

.factory('InstaAPI', function($http) {

  var searchUsername = function() {
    return $http({
      method: 'GET'
    });
  };
})

.controller('searchBarController', function($scope, InstaAPI) {
  //$scope.search = InstaAPI.searchUsername;
  console.log($scope.username);
})