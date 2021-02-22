var app = angular.module('myApp', []);
app.controller('adminpersonalcontroller', function($scope,$http) {

  $scope.user = {}
  $scope.personal = []
  $scope.getpersonaldata = function(user){
    $http({
      method:'post',
      url:'/gettingpersonal',
      data:user
    }).then(function(response){
      $scope.personal = response.data
    }, function(error){

    })
  }

});