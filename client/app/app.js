angular.module('app', ['ngRoute', 'ngTable'])

.run(function($rootScope) {

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
    Search.submitUsername($scope.username);
    $scope.username = '';
  };
})

.controller('followController', function($scope, Search, $rootScope) {
  $rootScope.$on('newUserData', function() {
    $scope.username = 'hello';
    $scope.username = Search.currentSearch.username;
    $scope.followers = Search.currentSearch.followers;
    $scope.following = Search.currentSearch.following;
    $scope.followRatio = (Search.currentSearch.followRatio).toFixed(2);
    $scope.bot = Search.currentSearch.bot;
  });

})

.controller('previousSearchController', function($scope, Search, $rootScope) {
  $rootScope.$on('newUserData', function() {
    $scope.data = Search.previousSearches.data;
    console.log($scope.data);
  });

})

.factory('Search', function($http, $rootScope) {
  var currentSearch = {
    'username': null,
    'followers': null,
    'following': null,
    'followRatio': null,
    'bot': null
  };

  var previousSearches = {
    'data': null
  };


  var submitUsername = function(user) {
    console.log(user);
    return $http({
      method: 'POST',
      url: '/',
      data: {username: user}
    })
    .then(function(info) {
      currentSearch.username = info.data.username;
      currentSearch.followers = info.data.followerCount;
      currentSearch.following = info.data.followingCount;
      currentSearch.followRatio = info.data.followRatio;
      currentSearch.bot = info.data.bot;
      return new Promise(function(resolve, reject) {
        resolve('Success!');
        });
    })
    .then(function() {
      console.log('gonna get');
      queryDatabase();
    });

  };

  var queryDatabase = function() {
    console.log('getting got');
    return $http({
      method: 'GET',
      url: 'http://localhost:3000/yo'
    })
    .then(function(database) {
      previousSearches.data = database.data;
      $rootScope.$emit('newUserData');
    });
        
  };

  return {
    submitUsername: submitUsername,
    currentSearch: currentSearch,
    queryDatabase: queryDatabase,
    previousSearches: previousSearches
  };


});