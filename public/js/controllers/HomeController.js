angular.module('covargoApp')
  .controller('HomeController',
    ($scope, $http, HOST_CONFIG) => {
      $scope.propertyName = '-vote';
      angular.element(() => {
        $http({
          method: 'GET',
          url: `http://${HOST_CONFIG.url}:3000/api/articles`,
        },
        )
          .then((articles) => {
            $scope.dataArray = Object.keys(articles.data)
              .map(key => articles.data[key]);
          });
      });
      $scope.vote = (article, vote) => {
        $http.post(`http://${HOST_CONFIG.url}:3000/api/articles/patchVote`, {
          articleId: article._id,
          vote,
        })
          .then((articles) => {
            $scope.dataArray = Object.keys(articles.data)
              .map(key => articles.data[key]);
          });
      };
      $scope.changeFilter = (property) => {
        $scope.propertyName = property;
      };
    });
