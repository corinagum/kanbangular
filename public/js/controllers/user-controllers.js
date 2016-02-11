angular.module('app')
  .controller('UserController', ['$scope', 'UserService', function ($scope, UserService) {
    $scope.login = function(auth) {
      UserService.login(auth)
        .then(function(response) {
          if(response.data.success === true) {
            $scope.firstName = response.data.firstName;
            $scope.username = response.data.username;
          }
        });
    };
    $scope.signUp = function(register) {
      UserService.signUp(register)
        .success(function(response) {
        });
    };

    $scope.logout = function(){
      UserService.logout()
        .then(function(response){
          if(response.data.success === true){
            $location.path('/login');
          }
        });
    };

}]);