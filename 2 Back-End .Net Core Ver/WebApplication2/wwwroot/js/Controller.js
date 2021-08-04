app.controller('itemListController', function ($scope, itemListService) {

    $scope.previousItemList = [];
    $scope.currentItemList = [];

    getItems();

    function getItems()  { // DONE
        var getItemsResponse = itemListService.get();
        getItemsResponse.then(function (response) {
            $scope.previousItemList = response.data[0];
            $scope.currentItemList = response.data[1];
        });
    }

    $scope.newItemName = '';

    $scope.addItem = function () { // DONE
        var newItem = $scope.newItemName;
        var returnedObject = itemListService.post(newItem);
        returnedObject.then(function (response) {
            $(document.getElementById('addNewItemModal')).modal('hide');
            getItems();
            $scope.newItemName = '';
            if (response.data === "success") {
                toastr.success('Item was successfully added to current list.');
            }
            else {
                toastr.warning(response.data);
            }
        })
    }

    $scope.editItem = function (itemIdToBeEdited, enteredNewName) { // DONE
        var returnedObject = itemListService.put(itemIdToBeEdited, enteredNewName);
        returnedObject.then(function (response) {
            $(document.getElementById('editItemModal' + itemIdToBeEdited)).modal('hide');
            getItems();
            $scope.newItemName = '';
            if (response.data === "success") {
                toastr.success('Item was successfully updated.');
            }
            else {
                toastr.warning(response.data);
            }
        })
    }

    $scope.deleteItem = function (itemIdToBeDeleted) { // DONE
        var returnedObject = itemListService.delete(itemIdToBeDeleted);
        returnedObject.then(function (response) {
            $(document.getElementById('deleteItemModal' + itemIdToBeDeleted)).modal('hide');
            getItems();
            if (response.data === "success") {
                toastr.success('Item was successfully deleted from the list.');
            }
            else {
                toastr.warning(response.data);
            }
        })
    }

    $scope.priorityToggle = function (itemthatNeedsPriorityToggled) { // DONE
        var returnedObject = itemListService.priority(itemthatNeedsPriorityToggled.itemId);
        returnedObject.then(function (response) {
            getItems();
            if (response.data === "success") {
                toastr.success('Item priority was successfully toggled.');
            }
            else {
                toastr.warning(response.data);
            }
        })
    }

    $('body').on('click', '.list-group .list-group-item', function () { // DONE
        if ($(this).hasClass("bg-primary")) {
            var activeElement = document.querySelectorAll(".bg-primary");
            [].forEach.call(activeElement, function (elementList) { elementList.classList.remove("bg-primary") });
        } else {
            var activeElement = document.querySelectorAll(".bg-primary");
            [].forEach.call(activeElement, function (elementList) { elementList.classList.remove("bg-primary") });
            $(this).addClass("bg-primary");
        }
    });

    $('.list-arrows button').click(function () { //DONE
        var activeElement = document.querySelector('.bg-primary')
        var activeElementName = activeElement.innerText.trim();
        document.querySelector('.bg-primary').classList.remove("bg-primary");
        var arrow = $(this);
        if (arrow.hasClass("previous-to-current")) {
            var returnedObject = itemListService.move("previousToCurrent", activeElementName);
            returnedObject.then(function (response) {
                getItems();
                if (response.data === "success") {
                    toastr.success('Item was successfully moved to the current list.');
                }
                else {
                    toastr.warning(response.data);
                }
            })
        }
        else if (arrow.hasClass("current-to-previous")) {
            var returnedObject = itemListService.move("currentToPrevious", activeElementName);
            returnedObject.then(function (response) {
                getItems();
                if (response.data === "success") {
                    toastr.success('Item was successfully moved to the previous list.');
                }
                else {
                    toastr.warning(response.data);
                }
            })
        }
        else if (arrow.hasClass("move-up")) {
            var returnedObject = itemListService.move("moveUp", activeElementName);
            returnedObject.then(function (response) {
                getItems();
                if (response.data === "success") {
                    toastr.success('Item was successfully moved up the list.');
                }
                else {
                    toastr.warning(response.data);
                }
            })
        }
        else if (arrow.hasClass("move-down")) {
            var returnedObject = itemListService.move("moveDown", activeElementName);
            returnedObject.then(function (response) {
                getItems();
                if (response.data === "success") {
                    toastr.success('Item was successfully moved down the list.');
                }
                else {
                    toastr.warning(response.data);
                }
            })
        }
    });

    ////////////////// TO - DO /////////////////////////////////////////
    $("#saveCurrentList").click(function () {
        var writeToFile = itemListService.write("currentItemList","previous_item_list");
        writeToFile.then(function (response) {
            getItems();
            if (response.data === "success") {
                toastr.success('List was successfully saved to file.');
            }
            else if (response.data === "not valid list") {
                toastr.warning('List doesn\'t exist, please try again.');
            }
            else {
                toastr.warning('Something went wrong, please try again.');
            }
        });
        
    });

    $("#clearCurrentList").click(function () {
        var clearList = itemListService.clearList("currentItemList");
        clearList.then(function (response) {
            getItems();
            if (response.data === "success") {
                toastr.success('List was successfully cleared.');
            }
            else if (response.data === "not valid list") {
                toastr.warning('List doesn\'t exist, please try again.');
            }
            else {
                toastr.warning('Something went wrong, please try again.');
            }
        });
    });

    $("#loadPreviousList").click(function () {
        var getPreviousFromFile = itemListService.read("currentItemList","previous_item_list");
        getPreviousFromFile.then(function (response) {
            getItems();
            if (response.data === "success") {
                toastr.success('List was successfully imported.');
            }
            else if (response.data === "not valid list") {
                toastr.warning('List doesn\'t exist, please try again.');
            }
            else {
                toastr.warning('Something went wrong, please try again.');
            }
        });
    });
})