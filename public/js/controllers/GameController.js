angular.module('battleSup')
// This controller handle the user login/registration
  .controller('GameController',
    ($scope) => {
      const shipsSize = [5, 4, 4, 3, 2, 2, 2];
      const shipCoordinates = [];
      let numberOfClick = 0;
      const shipNumber = 0;
      $scope.range = function (n) {
        return new Array(n);
      };
      $scope.clickField = function (row, column) {
        console.log(`row : ${row}`);
        console.log(`column : ${column}`);
        numberOfClick += 1;
        shipCoordinates.push([row, column]);

        if (numberOfClick === shipsSize[shipNumber]) {
          const rowsAndColumns = createCoordinateArray(shipCoordinates);
          const rows = rowsAndColumns[0];
          const columns = rowsAndColumns[1];
          if (valuesEqualInArray(rows) || valuesEqualInArray(columns)) {
            if (valuesFollowingInArray(rows) || valuesFollowingInArray(columns)) {
              console.log('le ship est bien placé c est cool !');
            }
          }
        }
      };

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
