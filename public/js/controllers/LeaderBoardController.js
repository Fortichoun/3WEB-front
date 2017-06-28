angular.module('battleSup')
// This controller handle the user login/registration
  .controller('LeaderBoardController',
    ($scope) => {
      function calculateRank(wins, games, loses) {
        return Math.round((wins * games) / (loses + 1));
      }
      function calculateTie(user1, user2) {
        // These two calls to the API are fictive
        // It's just to show how we could do it
        $http.get(`http://${HOST_CONFIG.url}:${HOST_CONFIG.port}/api/rooms/roundsPlayed?user=${user1._id}`)
          .then((roundsPlayed) => {
            user1RoundsPlayed = roundsPlayed.data;
          });
        $http.get(`http://${HOST_CONFIG.url}:${HOST_CONFIG.port}/api/rooms/roundsPlayed?user=${user2._id}`)
          .then((roundsPlayed) => {
            user2RoundsPlayed = roundsPlayed.data;
          });
        // Example of values returned :
        //    user1RoundsPlayed : [7, 2, 15, 8, 19]
        //    user2RoundsPlayed : [2, 4, 15, 14, 6, 19]
        const user1AverageRounds = getAverage(user1RoundsPlayed);
        const user2AverageRounds = getAverage(user2RoundsPlayed);

        if (user1AverageRounds < user2AverageRounds) {
          return user2AverageRounds;
        } else if (user1AverageRounds > user2AverageRounds) {
          return user1AverageRounds;
        }

        // These two calls to the API are fictive
        // It's just to show how we could do it
        $http.get(`http://${HOST_CONFIG.url}:${HOST_CONFIG.port}/api/rooms/timeElapsed?user=${user1._id}`)
          .then((timeElapsed) => {
            user1TimeElapsed = timeElapsed.data;
          });
        $http.get(`http://${HOST_CONFIG.url}:${HOST_CONFIG.port}/api/rooms/timeElapsed?user=${user2._id}`)
          .then((timeElapsed) => {
            user2TimeElapsed = timeElapsed.data;
          });
        // Example of values returned (time is in seconds) :
        //    user1TimeElapsed : [253, 4360, 412, 1005, 1012]
        //    user2TimeElapsed : [239, 417, 1205, 1400, 423, 2036]
        const user1AverageTime = getAverage(user1TimeElapsed);
        const user2AverageTime = getAverage(user2TimeElapsed);
        if (user1AverageTime < user2AverageTime) {
          return user2AverageTime;
        } else if (user1AverageTime > user2AverageTime) {
          return user1AverageTime;
        }
      }
      function getAverage(array) {
        const sum = array.reduce((a, b) => a + b);
        return sum / array.length;
      }
    });
