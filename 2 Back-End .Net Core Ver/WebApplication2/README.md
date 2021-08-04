# File structure 

- - - -

#### _This is almost purely for my own reference if I revisit this project in the future._ ####

- - - -

* The views are loaded by the controller - __Controllers/HomeController.cs__.

* The user interacts with the views - __View/Shared/\_Layout.cshtml__ and mainly __View/Home/Index.cshtml__.

* The view, __Index.cshtml__ interfaces with a controller, __wwwroot/js/Controller.js__.

* The controller, __Controller.js__ interfaces with the service, __wwwwroot/js/Service.js__.

* The service, __Service.js__ performs the API calls to the controller, __Controllers/ItemListAPIController.cs__.

* The controller, __ItemListAPIController.cs__ calls to the service, __ItemListService.cs__.

* The sevice, __ItemListService.cs__ performs validiation and logic, then calls to the repository, __ItemListRepository.cs__.

* The repository, __ItemListRepository.cs__ calls get; set; from file, and returns results to the service to manipulate.

* The chain then reverses, ie.
    * The service, __ItemListService.cs__ validates the response from the repository, processes and returns a response to the controller, __ItemListAPIController.cs__.
    * The controller, __ItemListAPIController.cs__ returns a response to the service, __Service.js__.
    * The service, __Service.js__ returns that response to the controller, __Controller.js__.
    * The controller, __Controller.js__ gives appropiate success/error response and updates the view, __Index.cshtml__.
    * The view, __Index.cshtml__ updates and the user can see the affect of their actions.

- - - -

> There are additonal files to note:
>> * __Models/Item.cs__ works as a custom object for the controller, __ItemListAPIController.cs__.
>> * __jsonfiles/[filename]__ is where the import/exports from the controller, __ItemListAPIController.cs__ are stored as .txt files.
>> * __wwwroot/css__ is where the global .css files are stored, imported in __View/Shared/\_Layout.cshtml__ for all views to use.
>> * __wwwwroot/lib__ is where additional modules, such as AngularJS, jQuery, etc are stored, imported in __View/Shared/\_Layout.cshtml__ for all views to use.

> 