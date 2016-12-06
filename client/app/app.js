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
  $scope.submitUsername = function() {
    // $rootScope.user = $scope.username;
    Search.submitUsername($scope.username);
  };
})

.controller('followController', function($scope, Search) {

  $scope.username = Search.currentSearch.username;
  $scope.username = 'hello';
  $scope.followers = Search.currentSearch.followers;
  $scope.following = Search.currentSearch.following;

})

.factory('Search', function($http) {
  var currentSearch = {
    'username': null,
    'followers': null,
    'following': null,
    'followRatio': null
  };


  var submitUsername = function(user) {
    console.log(user);
    return $http({
      method: 'POST',
      url: '/',
      data: {username: user}
    })
    .then(function(info) {
      // $rootScope.followers = followers.data.ids.length;
      console.log(info);
      currentSearch.username = info.data.username;
      currentSearch.followers = info.data.followerCount;
      currentSearch.following = info.data.followingCount;
      followRatio = info.data.followRatio;
    });
  };

  return {
    submitUsername: submitUsername,
    currentSearch: currentSearch
  };

});