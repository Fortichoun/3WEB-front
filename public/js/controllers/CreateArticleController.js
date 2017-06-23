angular.module('covargoApp')
  .controller('CreateArticleController',
    ($scope, $http, $state, HOST_CONFIG) => {
      $scope.information = {};

      // This function is called when the user create a new article
      $scope.create = (createForm) => {
        if (createForm.$valid) {
          $http.post(`http://${HOST_CONFIG.url}:3000/api/articles`, {
            title: $scope.information.title,
            url: $scope.information.url,
            user: $scope.information.user,
          })
            .then(() => {
              $scope.information = {};
              $state.go('home');
            });
        }
      };
    });
