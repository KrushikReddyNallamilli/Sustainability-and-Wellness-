var app = angular.module('myApp', []);
app.controller('userlogincontroller', function($scope,$http) {

    $scope.admin = {} 

  	$scope.postdata = function(val){
  		$http({
  			method:'post',
  			url:'/users/login',
        data:val
  		}).then(function(success){
        // alert("success")
        // $location.url('/admin')
        window.location.href = '/users/home' 
        // alert("success")
  			// $scope.users = success.data
  		}, function(error){
        alert("error")
  			// $scope.users = []
  		})
  	}
});