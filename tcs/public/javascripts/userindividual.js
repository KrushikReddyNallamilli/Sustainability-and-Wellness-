var app = angular.module('myApp', []);
app.controller('userindividualcontroller', function($scope,$http) {

    $scope.user = {} 

  	$scope.postdata = function(val){
  		$http({
  			method:'post',
  			url:'/users/postindividualdata',
        data:val
  		}).then(function(success){
        var a = success.data
        console.log(a)
        alert("Diabetis: " + a.Diabetis+"\n Bronchie: "+a.Bronchie+"\n Hypoxemia: "+a.Hypoxemia+"\n Coronary heart disease: "+a.CHD+"\n Asthma: "+a.Asthma)
        
  		}, function(error){
        alert("error")
  		})
  	}
});