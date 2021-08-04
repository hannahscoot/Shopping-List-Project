'use strict';

describe('myApp.lists module', function() {

  beforeEach(module('myApp.lists'));

  describe('lists controller', function(){

    it('should ....', inject(function($controller) {
      //spec body
        var listsCtrl = $controller('listsCtrl');
        expect(listsCtrl).toBeDefined();
    }));

  });
});