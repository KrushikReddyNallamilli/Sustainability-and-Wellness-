var app = angular.module('myApp', ['datatables', 'datatables.buttons']);
app.controller('admincontroller', function($scope,$http,DTOptionsBuilder, DTColumnBuilder,DTColumnDefBuilder) {
  	
  $scope.vm = {};
      $scope.vm.dtInstance = {};
      $scope.vm.dtColumnDefs = [DTColumnDefBuilder.newColumnDef(2).notSortable()];
      $scope.vm.dtOptions = DTOptionsBuilder.newOptions()
      .withOption('paging', true)
      .withOption('searching', true)
      .withOption('info', true)
      .withButtons([
      {
      extend:    'copy',
      text:      '<i class="fa fa-files-o"></i> Copy',
      titleAttr: 'Copy'
      },
      {
      extend:    'print',
      text:      '<i class="fa fa-print" aria-hidden="true"></i> Print',
      titleAttr: 'Print'
      },
      {
      extend:    'csvHtml5',
      text:      '<i class="fa fa-file-text-o"></i> csv',
      titleAttr: 'csv'
      },
      {
      extend:    'pdfHtml5',
      text:      '<i class="fa fa-file-pdf-o"></i> pdf',
      titleAttr: 'print'
      },
      {
      extend:    'excel',
      text:      '<i class="fa fa-file-excel-o"></i> Excel',
      titleAttr: 'Excel'
      },
      ]
      )
      ;


    $scope.users = []

  	$scope.getdata = function(){
  		$http({
  			method:'get',
  			url:'/allusersdata'
  		}).then(function(success){
  			$scope.users = success.data
  		}, function(error){
  			$scope.users = []
  		})
  	}
});