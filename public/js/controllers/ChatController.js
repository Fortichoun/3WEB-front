angular.module('battleSup')
// This controller handle the emission of a new message
// & retrieve the messages in your conversations from DB
  .controller('ChatController',
    ($scope, socket, $http, $rootScope, $state, $stateParams, HOST_CONFIG) => {
      $scope.room = {};

      $('#chat-zone').stop().animate({
        scrollTop: $('#chat-zone')[0].scrollHeight,
      }, 800);

      // After the DOM elements has been loaded, do the API call
      angular.element(() => {
        ($stateParams.room) ? $scope.room = $stateParams.room : $scope.room._id = HOST_CONFIG.defaultRoom;
        // Retrieve from the DB every messages in the conversation you've been through;
        $http.get(`http://${HOST_CONFIG.url}:${HOST_CONFIG.port}/api/rooms/messages?room=${$scope.room._id}`)
          .then((response) => {
            $scope.messages = response.data;
          });
        $http.get(`http://${HOST_CONFIG.url}:${HOST_CONFIG.port}/api/rooms/usersInRoom?room=${$scope.room._id}`)
          .then((response) => {
            $scope.room = response.data;
          });
        $http.get(`http://${HOST_CONFIG.url}:${HOST_CONFIG.port}/api/contacts/allContacts?user=${$scope.user._id}`)
          .then((user) => {
            $scope.user = user.data;
          });
      });
      // This function emit a new message using SocketIO
      $scope.sendMessage = (message) => {
        socket.emit('newMessage', {
          message,
          user: $scope.user,
          room: $scope.room,
          createdAt: new Date(),
        });
      };
      // At the reception of a new message
      socket.on('messageCreated', (message) => {
        $scope.messages.push(message);
        if (message.user._id === $scope.user._id) $scope.message = '';
        $('#chat-zone').stop().animate({
          scrollTop: $('#chat-zone')[0].scrollHeight,
        }, 800);
      });
      $scope.optionSelected = (selectOption) => {
        if (selectOption.selectOption === '1') {
          $http.post(`http://${HOST_CONFIG.url}:${HOST_CONFIG.port}/api/rooms`, {
            roomName: `Private conversation between ${$scope.user.userName} and ${selectOption.contact._id.userName}`,
            user: $scope.user._id,
            typeOfRoom: 'contacts',
            usersInRoom: [selectOption.contact._id._id],
          })
            .then((response) => {
              $scope.room = response.data;
              $state.go('contact', { roomId: response.data._id, room: response.data });
            });
        } else if (selectOption.selectOption === '2') {
          $scope.contactProfile = selectOption.contact._id;
          $('#myModal').modal();
        } else if (selectOption.selectOption === '3') {
          $http.post(`http://${HOST_CONFIG.url}:${HOST_CONFIG.port}/api/contacts/add`, {
            userId: $scope.user._id,
            contactId: selectOption.contact._id._id,
          })
            .then((response) => {
              $scope.user = response.data;
            });
        } else if (selectOption.selectOption === '4') {
          $http.post(`http://${HOST_CONFIG.url}:${HOST_CONFIG.port}/api/contacts/remove`, {
            userId: $scope.user._id,
            contactId: selectOption.contact._id._id,
          })
            .then((response) => {
              $scope.user = response.data;
            });
        }
        selectOption.selectOption = '';
      };
      $scope.isFriend = function (contactId) {
        let token = 0;
        $scope.user.contacts.map((c) => {
          if (c._id._id) {
            if (c._id._id === contactId) token = 1;
          }
        });
        if (token === 1) return true;
      };
    })
  .filter('enclosing', () => function (input) {
    const bold = {
      reg: /\*(.+?)\*/g,
      name: 'bold',
    };
    const underline = {
      reg: /(?!:[a-z]+?)_(.+?)_(?![a-z]+?:)/g,
      name: 'underline',
    };
    const strike = {
      reg: /~(.+?)~/g,
      name: 'strike',
    };
    const italic = {
      reg: /(?!(<a).*?)(\/(?!span|(.*?(<\/a>|a>)).*?).*?\/)(?!.*?(<\/a>|a>))/g,
      name: 'italic',
    };
    let result = setNewClass(italic, input);
    result = setNewClass(underline, result);
    result = setNewClass(bold, result);
    return setNewClass(strike, result);

    function setNewClass(style, input) {
      const result = input.replace(style.reg, `<span class="${style.name}">$&</span>`);
      return result.replace(style.reg, cropEncloser);
    }
    function cropEncloser(match) {
      return match.slice(1, -1);
    }
  });
