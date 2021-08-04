app.service('itemListService', function ($http) {

    this.get = function () {
        var request = $http({
            method: "get",
            url: "/itemlistapi",
        });
        return request;
    }

    this.post = function (itemName) {
        var request = $http({
            method: "post",
            url: "/itemlistapi",
            data: itemName
        });
        return request;
    }

    this.put = function (itemId, newItemName) {
        var request = $http({
            method: "put",
            url: "/itemlistapi/" + itemId + "/" + newItemName
        });
        return request;
    }

    this.delete = function (itemid) {
        var request = $http({
            method: "delete",
            url: "/itemlistapi/" + itemid
        });
        return request;
    }

    this.priority = function (itemId) {
        var request = $http({
            method: "put",
            url: "/itemlistapi/priority/" + itemId,
        });
        return request;
    }

    this.move = function (arrowDirection, itemName) {
        var request = $http({
            method: "put",
            url: "/itemlistapi/move/" + arrowDirection + "/" + itemName
        });
        return request;
    }

    /////////// JSON .txt File Call ////////////////////////////////////////////////////
    this.write = function (fromItemListName, toItemListName) {
        return $http.post("/itemlistapi/tojson/" + fromItemListName + "/" + toItemListName);
    }

    this.read = function (fromItemListName, toItemListName) {
        return $http.get("/itemlistapi/fromjson/" + fromItemListName + "/" + toItemListName);
    }
})