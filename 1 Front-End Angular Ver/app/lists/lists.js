'use strict';

angular.module('myApp.lists', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/lists', {
            templateUrl: 'lists/lists.html',
            controller: 'listsCtrl'
        });
    }])

    .controller('listsCtrl', ['$scope', function ($scope) {
        $scope.currentItemList = [
            {
                id: 2,
                name: 'Toast',
                priority: false
            }
        ];
        $scope.previousItemList = [
            {
                id: 3,
                name: 'Bananas',
                priority: false
            },
            {
                id: 4,
                name: 'Biscuits',
                priority: false
            },
            {
                id: 5,
                name: 'Bread',
                priority: false
            },
            {
                id: 6,
                name: 'Cereal',
                priority: false
            },
            {
                id: 7,
                name: 'Milk',
                priority: false
            },
            {
                id: 8,
                name: 'Sugar',
                priority: false
            },
            {
                id: 9,
                name: 'Tea bags',
                priority: false
            }
        ];

        $scope.newItem = {
            id: 0,
            name: '',
            priority: false
        };

        $('body').on('click', '.list-group .list-group-item', function () {
            if ($(this).hasClass("bg-primary")) {
                var activeElement = document.querySelectorAll(".bg-primary");
                [].forEach.call(activeElement, function (elementList) { elementList.classList.remove("bg-primary") });
            } else {
                var activeElement = document.querySelectorAll(".bg-primary");
                [].forEach.call(activeElement, function (elementList) { elementList.classList.remove("bg-primary") });
                $(this).addClass("bg-primary");
            }
        });

        $('.list-arrows button').click(function () {
            var activeElement = document.querySelector('.bg-primary')
            var activeElementName = activeElement.innerText.trim();
            document.querySelector('.bg-primary').classList.remove("bg-primary");
            var arrow = $(this);
            if (arrow.hasClass("previous-to-current")) {
                //HTTP Request Here >>
                var isNotPartOfCurrentList = true;
                $scope.currentItemList.forEach(function (currentIteration) {
                    if (currentIteration.name.toLowerCase() === activeElementName.toLowerCase()) {
                        isNotPartOfCurrentList = false;
                    }
                });
                if (isNotPartOfCurrentList) {
                    $scope.previousItemList.forEach(function (currentIteration) {
                        if (currentIteration.name.toLowerCase() === activeElementName.toLowerCase()) {
                            currentIteration.priority = false;
                            $scope.currentItemList.push(currentIteration);
                            $scope.previousItemList.splice($scope.previousItemList.indexOf(currentIteration), 1);
                            $scope.$apply();
                            $scope.showSuccessToast('Item was successfully moved to the current list.');
                        }
                    })
                } else {
                    $scope.showErrorToast('An item with the same name already exists in the current list.');
                }
            }
            else if (arrow.hasClass("current-to-previous")) {
                //HTTP Request Here >>
                var isNotPartOfPreviousList = true;
                $scope.previousItemList.forEach(function (currentIteration) {
                    if (currentIteration.name.toLowerCase() === activeElementName.toLowerCase()) {
                        isNotPartOfPreviousList = false;
                    }
                });
                if (isNotPartOfPreviousList) {
                    $scope.currentItemList.forEach(function (currentIteration) {
                        if (currentIteration.name.toLowerCase() === activeElementName.toLowerCase()) {
                            currentIteration.priority = false;
                            $scope.previousItemList.push(currentIteration);
                            $scope.currentItemList.splice($scope.currentItemList.indexOf(currentIteration), 1);
                            $scope.$apply();
                            $scope.showSuccessToast('Item was successfully moved to the previous list.');
                        }
                    })
                } else {
                    $scope.showErrorToast('An item with the same name already exists in the previous list.');
                }
            }
            else if (arrow.hasClass("move-up")) {
                var activeListName = activeElement.closest("ul").id;
                //HTTP Request Here >>
                var indexOfActiveElement = 0;
                if (activeListName === "previousItemList") {
                    $scope.previousItemList.forEach(function (currentIteration) {
                        if (currentIteration.name.toLowerCase() === activeElementName.toLowerCase()) {
                            indexOfActiveElement = $scope.previousItemList.indexOf(currentIteration);
                        }
                    })
                    if (indexOfActiveElement > 0) {
                        var tempObjectStorage = $scope.previousItemList[indexOfActiveElement];
                        $scope.previousItemList[indexOfActiveElement] = $scope.previousItemList[indexOfActiveElement - 1];
                        $scope.previousItemList[indexOfActiveElement - 1] = tempObjectStorage;
                        $scope.$apply();
                    }
                    else {
                        $scope.showErrorToast('The item is already at the top of the list.');
                    }
                }
                else if (activeListName === "currentItemList") {
                    $scope.currentItemList.forEach(function (currentIteration) {
                        if (currentIteration.name.toLowerCase() === activeElementName.toLowerCase()) {
                            indexOfActiveElement = $scope.currentItemList.indexOf(currentIteration);
                        }
                    })
                    //Checks that the item is not at the top of the list and then whether it has a priority flag and if it doesn't, it then ensures that it can't move above a priority item
                    if (indexOfActiveElement > 0) {
                        if ($scope.currentItemList[indexOfActiveElement].priority || !$scope.currentItemList[indexOfActiveElement - 1].priority) {
                            var tempObjectStorage = $scope.currentItemList[indexOfActiveElement];
                            $scope.currentItemList[indexOfActiveElement] = $scope.currentItemList[indexOfActiveElement - 1];
                            $scope.currentItemList[indexOfActiveElement - 1] = tempObjectStorage;
                            $scope.$apply();
                        } else {
                            $scope.showErrorToast('The item can\'t be moved above a priority item.');
                        }
                    } else {
                        $scope.showErrorToast('The item is already at the top of the list.');
                    }
                }
            }
            else if (arrow.hasClass("move-down")) {
                var activeListName = activeElement.closest("ul").id;
                //HTTP Request Here >>
                var indexOfActiveElement = 0;
                if (activeListName === "previousItemList") {
                    $scope.previousItemList.forEach(function (currentIteration) {
                        if (currentIteration.name.toLowerCase() === activeElementName.toLowerCase()) {
                            indexOfActiveElement = $scope.previousItemList.indexOf(currentIteration);
                        }
                    })
                    if (indexOfActiveElement < $scope.previousItemList.length - 1) {
                        var tempObjectStorage = $scope.previousItemList[indexOfActiveElement];
                        $scope.previousItemList[indexOfActiveElement] = $scope.previousItemList[indexOfActiveElement + 1];
                        $scope.previousItemList[indexOfActiveElement + 1] = tempObjectStorage;
                        $scope.$apply();
                    } else {
                        $scope.showErrorToast('The item is already at the bottom of the list.');
                    }
                }
                else if (activeListName === "currentItemList") {
                    $scope.currentItemList.forEach(function (currentIteration) {
                        if (currentIteration.name.toLowerCase() === activeElementName.toLowerCase()) {
                            indexOfActiveElement = $scope.currentItemList.indexOf(currentIteration);
                        }
                    })
                    //Checks that the item is not at the bottom of the list and then whether it hasn't got a priority flag and if it does have a flag, it then ensures that it can't move below a non-priority item
                    if (indexOfActiveElement < $scope.currentItemList.length - 1) {
                        if (!$scope.currentItemList[indexOfActiveElement].priority || $scope.currentItemList[indexOfActiveElement + 1].priority) {
                            var tempObjectStorage = $scope.currentItemList[indexOfActiveElement];
                            $scope.currentItemList[indexOfActiveElement] = $scope.currentItemList[indexOfActiveElement + 1];
                            $scope.currentItemList[indexOfActiveElement + 1] = tempObjectStorage;
                            $scope.$apply();
                        } else {
                            $scope.showErrorToast('The item can\'t be moved below a non-priority item.');
                        }
                    } else {
                        $scope.showErrorToast('The item is already at the bottom of the list.');
                    }
                }
            }
        });

        $scope.deleteItem = function (itemIdToBeDeleted) {
            var activeElement = document.getElementById('deleteItemModal' + itemIdToBeDeleted);
            var activeListName = activeElement.closest("ul").id;
            $(activeElement).modal('hide');
            //HTTP Request Here >>
            var indexOfActiveElement = 0;
            if (activeListName === "previousItemList") {
                $scope.previousItemList.forEach(function (currentIteration) {
                    if (currentIteration.id === itemIdToBeDeleted) {
                        indexOfActiveElement = $scope.previousItemList.indexOf(currentIteration);
                    }
                })
                $scope.previousItemList.splice(indexOfActiveElement, 1);
                $scope.showSuccessToast('Item was successfully deleted from the list.');
            }
            else if (activeListName === "currentItemList") {
                $scope.currentItemList.forEach(function (currentIteration) {
                    if (currentIteration.id === itemIdToBeDeleted) {
                        indexOfActiveElement = $scope.currentItemList.indexOf(currentIteration);
                    }
                })
                $scope.currentItemList.splice(indexOfActiveElement, 1);
                $scope.showSuccessToast('Item was successfully deleted from the list.');
            }
        }

        $scope.addNewItem = function () {
            //HTTP Request Here >>
            var arrayOfNumbers = [...Array($scope.currentItemList.length + $scope.previousItemList.length + 2).keys()].slice(1);
            $scope.currentItemList.forEach(function (currentIteration) {
                arrayOfNumbers.splice(arrayOfNumbers.indexOf(currentIteration), 1);
            })
            $scope.previousItemList.forEach(function (currentIteration) {
                arrayOfNumbers.splice(arrayOfNumbers.indexOf(currentIteration), 1);
            })
            var newItem = {
                id: arrayOfNumbers[0],
                name: $scope.newItem.name,
                priority: false
            }
            console.log($scope.checkItemDoesNotExist(newItem.name));
            if ($scope.checkItemDoesNotExist(newItem.name)) {
                $(document.getElementById('addNewItemModal')).modal('hide');
                $scope.currentItemList.push(newItem);
                $scope.resetForm();
                $scope.showSuccessToast('Item was successfully added to current list.');
            } else {
                $scope.showErrorToast('An item with the same name already exists.');
                $(document.getElementById('addNewItemModal')).modal('hide');
                $scope.resetForm();
            }
        }

        $scope.editItem = function (itemIdToBeEdited) {
            var activeElement = document.getElementById('editItemModal' + itemIdToBeEdited);
            var activeListName = activeElement.closest("ul").id;
            var enteredNewName = $scope.newItem.name;
            //HTTP Request Here >>
            if (activeListName === "previousItemList") {
                var indexOfItemToBeUpdated = 0;
                if ($scope.checkItemDoesNotExist(enteredNewName)) {
                    $scope.previousItemList.forEach(function (currentIteration) {
                        if (currentIteration.id === itemIdToBeEdited) {
                            indexOfItemToBeUpdated = $scope.previousItemList.indexOf(currentIteration);
                            $scope.previousItemList[indexOfItemToBeUpdated].name = enteredNewName;
                            $(activeElement).modal('hide');
                            $scope.resetForm();
                            $scope.showSuccessToast('Item was successfully renamed to ' + enteredNewName + '.');
                        }
                    })
                } else {
                    $(activeElement).modal('hide');
                    $scope.resetForm();
                    $scope.showErrorToast('An item with the same name already exists.');
                }
            }
            else if (activeListName === "currentItemList") {
                var indexOfItemToBeUpdated = 0;
                if ($scope.checkItemDoesNotExist(enteredNewName)) {
                    $scope.currentItemList.forEach(function (currentIteration) {
                        if (currentIteration.id === itemIdToBeEdited) {
                            indexOfItemToBeUpdated = $scope.currentItemList.indexOf(currentIteration);
                            $scope.currentItemList[indexOfItemToBeUpdated].name = enteredNewName;
                            $(activeElement).modal('hide');
                            $scope.resetForm();
                            $scope.showSuccessToast('Item was successfully renamed to ' + enteredNewName + '.');
                        }
                    })
                } else {
                    $(activeElement).modal('hide');
                    $scope.resetForm();
                    $scope.showErrorToast('An item with the same name already exists.');
                }
            }
        }

        $scope.resetForm = function () {
            $scope.newItem.id = 0;
            $scope.newItem.name = '';
        }

        $scope.checkItemDoesNotExist = function (itemName) {
            //HTTP Request Here (maybe embedded in other requests) >>
            var itemNameDoesNotExist = true;
            $scope.currentItemList.forEach(function (currentIteration) {
                if (currentIteration.name.toLowerCase() === itemName.toLowerCase()) {
                    itemNameDoesNotExist = false;
                }
            })
            $scope.previousItemList.forEach(function (currentIteration) {
                if (currentIteration.name.toLowerCase() === itemName.toLowerCase()) {
                    itemNameDoesNotExist = false;
                }
            })
            return itemNameDoesNotExist;
        }

        $("#saveCurrentList").click(function () {
            //HTTP Request Here >>
            $scope.previousItemList = $scope.currentItemList;
            $scope.currentItemList = [];
            $scope.$apply();
            $scope.showSuccessToast('Saved the current list as the previous list.');
        });

        $("#clearCurrentList").click(function () {
            //HTTP Request Here >>
            $scope.currentItemList = [];
            $scope.$apply();
            $scope.showSuccessToast('Cleared all items from current list.');
        });

        $("#loadPreviousList").click(function () {
            //HTTP Request Here >>
            $scope.currentItemList.push.apply($scope.currentItemList, $scope.previousItemList);
            $scope.previousItemList = [];
            $scope.$apply();
            $scope.showSuccessToast('Added the previous list as the current list.');
        });

        $scope.prioritySwitch = function (itemthatNeedsPriorityToggled) {
            //HTTP Request Here >>
            itemthatNeedsPriorityToggled.priority = !itemthatNeedsPriorityToggled.priority;
            if (itemthatNeedsPriorityToggled.priority === true) {
                var temporaryItemToggled = itemthatNeedsPriorityToggled
                $scope.currentItemList.splice($scope.currentItemList.indexOf(itemthatNeedsPriorityToggled), 1);
                var temporaryCurrentItemList = $scope.currentItemList;
                $scope.currentItemList = [temporaryItemToggled];
                $scope.currentItemList.push.apply($scope.currentItemList, temporaryCurrentItemList);
                $scope.apply();
            }
            else {
                var temporaryItemToggled = [itemthatNeedsPriorityToggled];
                $scope.currentItemList.splice($scope.currentItemList.indexOf(itemthatNeedsPriorityToggled), 1);
                $scope.currentItemList.push.apply($scope.currentItemList, temporaryItemToggled);
                $scope.apply();
            }
        }

        $scope.showErrorToast = function (errorMessage) {
            document.getElementById('errorToastBody').innerHTML = errorMessage;
            $('#errorToast').toast('show');
        }

        $scope.showSuccessToast = function (errorMessage) {
            document.getElementById('successToastBody').innerHTML = errorMessage;
            $('#successToast').toast('show');
        }
    }])