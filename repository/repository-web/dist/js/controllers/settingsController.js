/*
 * Copyright (c) 2020 Contributors to the Eclipse Foundation
 *
 * See the NOTICE file(s) distributed with this work for additional
 * information regarding copyright ownership.
 *
 * This program and the accompanying materials are made available under the
 * terms of the Eclipse Public License 2.0 which is available at
 * https://www.eclipse.org/legal/epl-2.0
 *
 * SPDX-License-Identifier: EPL-2.0
 */
define(["../init/appController"], function (repositoryControllers) {

  repositoryControllers.controller('SettingsController',
      ['$location', '$rootScope', '$scope', '$http', '$uibModal', '$timeout',
        '$window',
        function ($location, $rootScope, $scope, $http, $uibModal, $timeout,
            $window) {

          $scope.email = "";
          $scope.username = "";

          // HTML autofocus does not work well with angularJS it seems
          angular.element(document).ready(function () {
            let element = document.getElementById("email");
            if (element) {
              element.focus();
            }
          });

          $scope.reload = function () {
            $window.location.reload();
          }

          /*
            Retrieves username from root scope initially, in order to fetch
            settings (so far only e-mail) from back-end.
            Persists username to session storage.
           */
          if ($rootScope.user) {
            $scope.username = $rootScope.user;
            if (sessionStorage) {
              sessionStorage.username = JSON.stringify($scope.username);
            }
          } else if (sessionStorage && sessionStorage.username) {
            $scope.username = JSON.parse(sessionStorage.username);
          }

          $scope.toggleSaveButtonAvailability = function (value) {
            let saveButton = document.getElementById("submit");
            if (saveButton) {
              saveButton.disabled = !value;
            }
          }

          $scope.toggleCancelButtonAvailability = function (value) {
            let cancelButton = document.getElementById("cancel");
            if (cancelButton) {
              cancelButton.disabled = !value;
            }
          }

          $scope.saveSettings = function () {
            $http.put("./rest/accounts/" + $scope.username, $scope.email)
            .then(
                function (result) {
                  $scope.success = true;
                  $scope.errorMessage = null;
                  if (sessionStorage) {
                    sessionStorage.username = JSON.stringify($scope.username);
                  }
                  $scope.toggleSaveButtonAvailability(false);
                  $scope.toggleCancelButtonAvailability(false);
                },
                function (error) {
                  $scope.success = false;
                  $scope.errorMessage = error.data.msg;
                  $scope.toggleSaveButtonAvailability(true);
                  $scope.toggleCancelButtonAvailability(false);
                  $timeout(
                      function () {
                        $scope.errorMessage = "Saving the settings timed out. Please try again.";
                      },
                      2000
                  );
                }
            );
          };

          $scope.getSettings = function () {
            $http.get("./rest/accounts/" + $scope.username)
            .then(
                function (result) {
                  $scope.errorMessage = null;
                  $scope.username = result.data.username;
                  $scope.email = result.data.email;
                  if (sessionStorage) {
                    sessionStorage.username = JSON.stringify($scope.username);
                  }
                },
                function(error) {
                  $scope.success = false;
                  $scope.errorMessage = "There was an issue while retrieving user data. Please reload this page and try again.";
                  angular.element(document).ready(function () {
                    $scope.toggleSaveButtonAvailability(false);
                  });
                }
            );
          };

          $scope.getSettings();

          $scope.openRemoveAccount = function () {
            var modalInstance = $uibModal.open({
              animation: true,
              controller: "RemoveAccountModalController",
              templateUrl: "deleteAccount.html",
              size: "medium"
            });

            modalInstance.result.then(
                function () {
                  $location.path("/login");
                }
            );
          };

        }]);

});