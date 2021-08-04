var app = angular.module('app', ['ui.bootstrap']);

app.controller("MainController", ['$scope', '$uibModal', '$http', function($scope, $uibModal, $http){
    var vm = this;
    vm.items = [];
    vm.currentItemList = [];
    vm.previousItemList = [];

    init = function() {
        vm.loading = true;
        $http.get("/api/queries/get-items?listid=" + 1).then (function (resp) {
            vm.currentItemList = resp.data[0];
            vm.items = vm.currentItemList;
            $http.get("/api/queries/get-items", { params: { listid: 2 } }).then (function (resp) {
                vm.previousItemList = resp.data[0];
                vm.items = vm.items.concat(vm.previousItemList);
            });                
        });            
        vm.loading = false;
    };

    $('body').on('click', '.list-group .list-group-item', function () {
        var activeElement = document.querySelectorAll(".bg-primary");
        if ($(this).hasClass("bg-primary")) {
            [].forEach.call(activeElement, function (elementList) { elementList.classList.remove("bg-primary") });
        } else {
            [].forEach.call(activeElement, function (elementList) { elementList.classList.remove("bg-primary") });
            $(this).addClass("bg-primary");
        }
    });

    vm.left = function() {
        var activeElement = document.querySelector('.bg-primary');
        var activeElementName = activeElement.innerText.trim();
        document.querySelector('.bg-primary').classList.remove("bg-primary");
        if (activeElementName !== null) {
            var result = vm.items.find(x => x.name.toLowerCase() == activeElementName.toLowerCase());
            if (result.listId != 1 && result.listId != 2) {
                toastr.warning("This item doesn't exist");
            } else {
                if (result.listId == 2) {
                    result.listId = 1;
                    $http.get("/api/queries/update-item",{params:{name : result.name, priority : result.priority, listId : result.listId, id : result.id}}).then (function () {
                        init();
                        toastr.success("Successful Post");
                    });
                } else {
                    toastr.warning("Item already in the current list.");
                }
            }
        } else {
            toastr.warning("No item was selected");
        }
    };

    vm.right = function() {
        var activeElement = document.querySelector('.bg-primary');
        var activeElementName = activeElement.innerText.trim();
        document.querySelector('.bg-primary').classList.remove("bg-primary");
        if (activeElementName !== null) {
            var result = vm.items.find(x => x.name.toLowerCase() == activeElementName.toLowerCase());
            if (result.listId != 1 && result.listId != 2) {
                toastr.warning("This item doesn't exist");
            } else {
                if (result.listId == 1) {
                    result.listId = 2;
                    result.priority = false;
                    $http.get("/api/queries/update-item",{params:{name : result.name, priority : result.priority, listId : result.listId, id : result.id}}).then (function () {
                        init();
                        toastr.success("Successful Post");
                    });
                } else {
                    toastr.warning("Item already in the previous list.");
                }
            }
        } else {
            toastr.warning("No item was selected");
        }
    };

    vm.up = function() {
        var activeElement = document.querySelector('.bg-primary');
        var activeElementName = activeElement.innerText.trim();
        document.querySelector('.bg-primary').classList.remove("bg-primary");
        if (activeElementName !== null) {
            var result = vm.items.find(x => x.name.toLowerCase() == activeElementName.toLowerCase());
            if (result.listId != 1 && result.listId != 2) {
                toastr.warning("This item doesn't exist");
            } else {
                if (result.listId == 1) {
                    var indexOfActiveElement = vm.currentItemList.indexOf(result);
                    if (indexOfActiveElement!==0) {
                        if (vm.currentItemList[indexOfActiveElement-1].priority === false || result.priority === true) {
                            vm.currentItemList[indexOfActiveElement] = vm.currentItemList[indexOfActiveElement-1];
                            vm.currentItemList[indexOfActiveElement-1] = result;
                        } else {
                            toastr.warning("Item can't be moved above than priority items.");
                        }
                    } else {
                        toastr.warning("Item at top of list.");
                    }
                } else {
                    var indexOfActiveElement = vm.previousItemList.indexOf(result);
                    if (indexOfActiveElement!==0) {
                        vm.previousItemList[indexOfActiveElement] = vm.previousItemList[indexOfActiveElement-1];
                        vm.previousItemList[indexOfActiveElement-1] = result;
                    } else {
                        toastr.warning("Item at top of list.");
                    }
                }
            }
        } else {
            toastr.warning("No item was selected");
        }
    };

    vm.down = function() {
        var activeElement = document.querySelector('.bg-primary');
        var activeElementName = activeElement.innerText.trim();
        document.querySelector('.bg-primary').classList.remove("bg-primary");
        if (activeElementName !== null) {
            var result = vm.items.find(x => x.name.toLowerCase() == activeElementName.toLowerCase());
            if (result.listId != 1 && result.listId != 2) {
                toastr.warning("This item doesn't exist");
            } else {
                if (result.listId == 1) {
                    var indexOfActiveElement = vm.currentItemList.indexOf(result);
                    if (indexOfActiveElement!==vm.currentItemList.length-1) {
                        if (vm.currentItemList[indexOfActiveElement+1].priority === true || result.priority === false) {
                            vm.currentItemList[indexOfActiveElement] = vm.currentItemList[indexOfActiveElement+1];
                            vm.currentItemList[indexOfActiveElement+1] = result;
                        } else {
                            toastr.warning("Item can't be moved below than non-priority items.");
                        }
                    } else {
                        toastr.warning("Item at bottom of list.");
                    }
                } else {
                    var indexOfActiveElement = vm.previousItemList.indexOf(result);
                    if (indexOfActiveElement!==vm.previousItemList.length-1) {
                        vm.previousItemList[indexOfActiveElement] = vm.previousItemList[indexOfActiveElement+1];
                        vm.previousItemList[indexOfActiveElement+1] = result;
                    } else {
                        toastr.warning("Item at bottom of list.");
                    }
                }
            }
        } else {
            toastr.warning("No item was selected");
        }
    };

    vm.priority = function(item) {
        if (item.listId != 1 && item.listId != 2) {
            toastr.warning("This item doesn't exist");
        } else {
            item.priority = !item.priority;
            $http.get("/api/queries/update-item",{params:{name : item.name, priority : item.priority, listId : item.listId, id : item.id}}).then (function () {
                init();
                toastr.success("Successful Post");
            });
        }
    };

    vm.checkItemDoesNotExist = function (itemName) {
        var itemNameDoesNotExist = true;
        var result = vm.items.find(x => x.name.toLowerCase() == itemName.toLowerCase());
        if (typeof result !== 'undefined') {
            itemNameDoesNotExist = false;
        }
        return itemNameDoesNotExist;
    };

    vm.addItem = function() {
        var item = {
            id: 0,
            name: '',
            priority: false,
            listId: 1
        };
        var modalInstance = $uibModal.open({
            animation: false,
            templateUrl : "addModalTemplate.html",
            controller : 'ItemController as vm',
            size: 'md',
            backdrop: 'static',
            backdropClass: 'transparent',
            resolve: {
                item: function() {
                    return angular.copy(item);
                }
            }
        });
        modalInstance.result.then(function (item) {
            if (vm.checkItemDoesNotExist(item.name) || vm.items.length === 0){
                $http.get("/api/queries/add-item",{params:{name : item.name, priority : item.priority, listId : item.listId}}).then (function () {
                    init();
                    toastr.success("Successful Post");
                });
            } else {
                toastr.warning("An item currently has that name");
            }
        });
    };

    vm.editItem = function(item) {
        var modalInstance = $uibModal.open({
            animation: false,
            templateUrl : "addModalTemplate.html",
            controller : 'ItemController as vm',
            size: 'md',
            backdrop: 'static',
            backdropClass: 'transparent',
            resolve: {
                item: function() {
                    return angular.copy(item);
                }
            }
        });
        modalInstance.result.then(function (item) {
            console.log(vm.checkItemDoesNotExist(item.name));
            if (vm.checkItemDoesNotExist(item.name)) {
                if (item.listId != 1 && item.listId != 2) {
                    toastr.warning("This item doesn't exist");
                } else {
                    $http.get("/api/queries/update-item",{params:{name : item.name, priority : item.priority, listId : item.listId, id : item.id}}).then (function () {
                        init();
                        toastr.success("Successful Post");
                    });
                }
            } else {
                toastr.warning("An item currently has that name");
            }
        });
    };

    vm.deleteItem = function(item) {
        var modalInstance = $uibModal.open({
            animation: false,
            templateUrl : "deleteModalTemplate.html",
            controller : 'ItemController as vm',
            size: 'md',
            backdrop: 'static',
            backdropClass: 'transparent',
            resolve: {
                item: function() {
                    return angular.copy(item);
                }
            }
        });
        modalInstance.result.then(function (item) {
            if (item.listId != 1 && item.listId != 2) {
                toastr.warning("This item doesn't exist");
            } else {
                $http.get("/api/queries/delete-item",{params:{id : item.id}}).then (function () {
                    init();
                    toastr.success("Successful Delete");
                });
            }
        })
    };

    init();

}]);

app.controller('ItemController', ['$uibModalInstance', 'item', function ($uibModalInstance, item) {
    var vm = this;
    function init() {
        vm.loading = true;
        vm.item = item;
        vm.loading = false;
    }
    vm.close = function () {
        $uibModalInstance.close();
    };
    vm.save = function () {
        $uibModalInstance.close(vm.item);
    }
    init();
}]);