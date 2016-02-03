(function() {
  'use strict';
  
  var app = angular.module('invoice', []);
  
  app.factory('sampleSvc', sampleSvc);
  function sampleSvc() {
    var svc = {
      doSomething: doSomething
    };
    
    return svc;
    
    function doSomething() {
      alert('I am doing something... go away...');
    }
  }

  
  app.controller('pageCtrl', pageCtrl);    
  function pageCtrl($log, $scope) {
    var self = this;
    self.lineItems = [];
    
    //This method will be called from ko side....
    self.loadLineItems = loadLineItems;
    
    function loadLineItems(lineItems) {
      $log.info('in ng land: loadLineItems', lineItems);
      
      self.lineItems = lineItems.map(function(l) {
        return { 
          description: l.description(), 
          qty: l.qty(),
          uom: l.unit(),
          unitPrice: l.unitPrice(),
          total: l.total()
        };
      });
      
      $scope.$digest();
    }
  }
  
  
  app.controller('lineItemEditorCtrl', lineItemEditorCtrl);    
  function lineItemEditorCtrl($log) {
    var self = this;
    
    self.showSupplier = showSupplier;
    
    function showSupplier() {
      $log.info('Reaching out and touching ko...');
      
      //reach out from ng land and grab the supplier...
      var supplier = window.viewBag.vm.supplier();
      
      alert(supplier);
    }
  }
  
  
  app.directive('lineItemEditor', lineItemEditor);
  function lineItemEditor($log) {
    return {
      restrict: 'E',
      scope: {
        'lineItems': '=src'
      },
      bindToController: true,
      templateUrl: 'app/lineItemEditorTpl.html',
      controller: 'lineItemEditorCtrl',
      controllerAs: 'vm'
    };
  }
    
  angular.bootstrap(document.querySelector('#ngLand'), ['invoice']);
}());