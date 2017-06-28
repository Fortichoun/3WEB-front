angular
  .module('battleSup', ['ui.router', 'ngSanitize', 'vkEmojiPicker', 'angular.filter'])
  .constant('HOST_CONFIG', {
    url: 'localhost',
    port: '3000',
    defaultRoom: '594eeac398890b1db050aa6d',
  })
  .config(($locationProvider, $stateProvider) => {
    // UI-Router, defines the routes
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'html/home.html',
      })
      .state('lobby', {
        url: '/lobby',
        templateUrl: 'html/lobby.html',
      })
      .state('contact', {
        url: '/lobby/{roomId}',
        templateUrl: 'html/lobby/contact.html',
        params: { room: null },
      })
      .state('login', {
        url: '/login',
        templateUrl: 'html/login.html',
      })
      .state('settings', {
        url: '/settings',
        templateUrl: 'html/settings.html',
      })
      .state('leaderBoard', {
        url: '/leaderBoard',
        templateUrl: 'html/leaderBoard.html',
      })
      .state('game', {
        url: '/game/{roomId}',
        templateUrl: 'html/game.html',
        params: { room: null },
      })
      .state('otherwise', {
        url: '*path',
        templateUrl: 'html/home.html',
      });

    $locationProvider.html5Mode(true).hashPrefix('');
  })
  // SocketIO initialization
  .factory('socket', ($rootScope, HOST_CONFIG) => {
    const socket = io.connect(`http://${HOST_CONFIG.url}:3000`);
    return {
      on(eventName, callback) {
        socket.on(eventName, (...args) => {
          $rootScope.$apply(() => {
            callback.apply(socket, args);
          });
        });
      },
      emit(eventName, data, callback) {
        socket.emit(eventName, data, (...args) => {
          $rootScope.$apply(() => {
            if (callback) {
              callback.apply(socket, args);
            }
          });
        });
      },
    };
  });

