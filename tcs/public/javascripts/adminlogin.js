var app = angular.module('myApp', []);
app.controller('adminlogincontroller', function($scope,$http) {

    $scope.admin = {} 

  	$scope.postdata = function(val){
  		$http({
  			method:'post',
  			url:'/login',
        data:val
  		}).then(function(success){
        // $location.url('/admin')
        window.location.href = '/admin' 
        // alert("success")
  			// $scope.users = success.data
  		}, function(error){
        alert("error")
  			// $scope.users = []
  		})
  	}
});