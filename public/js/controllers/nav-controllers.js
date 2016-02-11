angular.module('app')
  .controller('NavController', ['$scope', 'UserService', '$location', function ($scope, UserService, $location) {
    $scope.logout = function(){
      UserService.logout()
        .then(function(response){
          if(response.data.success === true){
            $location.path('/login');
          }
        });
    };
  }]);