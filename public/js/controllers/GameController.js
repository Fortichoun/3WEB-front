angular.module('battleSup')
// This controller handle the user login/registration
  .controller('GameController',
    ($scope) => {
      const shipsSize = [5, 4, 4, 3, 2, 2, 2];
      let shipCoordinates = [];
      const shipTotalCoordinates = [];
      let numberOfClick = 0;
      let shipNumber = 0;
      let gameMode = 'placeShips';
      $scope.fieldMessage = 'Put your ships on the board cap\'tain !';
      $scope.shipLengthMessage = `Please put a ship of ${shipsSize[shipNumber]} field length`;

      $scope.range = function (n) {
        return new Array(n);
      };
      $scope.clickField = function (row, column) {
        if (gameMode === 'placeShips') {
          numberOfClick += 1;
          shipCoordinates.push([row, column]);
          shipTotalCoordinates.push([row, column]);

          document.getElementById(`button${row}${column}`).innerHTML = '<img src=".\\img\\ship_icon.png" />';
          document.getElementById(`button${row}${column}`).disabled = true;

          if (numberOfClick === shipsSize[shipNumber]) {
            const rowsAndColumns = createCoordinateArray(shipCoordinates);
            const rows = rowsAndColumns[0];
            const columns = rowsAndColumns[1];
            if ((valuesEqualInArray(rows) || valuesEqualInArray(columns)) &&
                      (valuesFollowingInArray(rows) || valuesFollowingInArray(columns))) {
              console.log('le ship est bien placé c est cool !');
              shipNumber++;
              numberOfClick = 0;
              shipCoordinates = [];
              if (shipNumber === shipsSize.length) {
                resetButtons(shipTotalCoordinates);
                $scope.fieldMessage = 'Well done cap\'tain, let\s sink our ennemies !';
                $scope.shipLengthMessage = '(Coming Soon)';
                gameMode = 'battle';
              } else {
                $scope.shipLengthMessage = `Please put a ship of ${shipsSize[shipNumber]} field length`;
              }
            } else {
              shipCoordinates = resetButtons(shipCoordinates);
              numberOfClick = 0;
            }
          }
        } else if (gameMode === 'battle') {

        }
      };

      function resetButtons(array) {
        array.forEach((element) => {
          row = element[0];
          column = element[1];
          document.getElementById(`button${row}${column}`).innerText = '';
          document.getElementById(`button${row}${column}`).disabled = false;
        });
        return [];
      }

      function valuesEqualInArray(array) {
        const first = array[0];
        return array.every(element => element === first);
      }
      function checkNextElement(array) {
        let result = true;
        for (let i = 0; i < array.length - 1; i++) {
          if (array[i] + 1 !== array[i + 1]) {
            result = false;
          }
        }
        return result;
      }

      function valuesFollowingInArray(array) {
        array = array.sort();
        return checkNextElement(array);
      }

      function createCoordinateArray(array) {
        const rows = [];
        const columns = [];
        array.forEach((element) => {
          rows.push(element[0]);
          columns.push(element[1]);
        });
        return [rows, columns];
      }
    });
