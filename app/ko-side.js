(function() {
  'use strict';
  
  function LineItemVM(src) {
    var self = this;    
    self.description = ko.observable(src.description);
    self.qty         = ko.observable(src.qty);
    self.unit        = ko.observable(src.unit);
    self.unitPrice   = ko.observable(src.unitPrice);
    self.total       = ko.observable(src.total);
  }
  
  
  function InvoiceVM() {
    var self = this;
    self.invoiceNumber = ko.observable();
    self.supplier      = ko.observable();
    self.date          = ko.observable();
    self.due           = ko.observable();
    self.lineItems     = ko.observableArray();
    
    self.submit     = submit;
    self.getInvoice = getInvoice;
    self.callsvc    = callsvc;
    
    activate();
    
    function activate() {
      getInvoice(1000)
        .then(bindInvoice);
    }
    
    function bindInvoice(invoice) {
      self.invoiceNumber(invoice.number);
      self.supplier(invoice.supplier);
      self.date(invoice.date);
      self.due(invoice.due);
      
      var lvm = invoice.lines.map(function(l) {
        return new LineItemVM(l);
      });      
      self.lineItems(lvm);

      //reach into ng land to initialize the controller properties
      var pageCtrl = angular.element('#ngLand').scope().pg;
      pageCtrl.loadLineItems(self.lineItems());
    }
    
    function getInvoice(invoiceNumber) {
      //Pretend we did some AJAX to get data here...
      return Q.when({
        number:  '1000',
        supplier: 'Paper Unlimited P/L',
        date: '2016-02-03',
        due: '2016-02-28',
        lines: [
          { description: 'Light Blue Recycled Paper',   qty: 1, unit: 'ream', unitPrice: 7.0,   total: 7.0  },
          { description: 'Black Premium Paper',         qty: 5, unit: 'ream', unitPrice: 12.0,  total: 60.0 }
        ],
        totals: {
          subtotal : 67,
          tax      : 6.7,
          total    : 73.7
        }
      });
    }
    
    function submit() {
      console.log('Submitting...');
      
      //reach into ng land to initialize the controller properties
      var lineEditorCtrl = angular.element('#lineEditor').scope().vm;
      console.log('Line Items in ng', lineEditorCtrl.lineItems);
    }
    
    function callsvc() {
      //reach out and touch ng service...
      var di = angular.element('#ngLand').injector();      
      var svc = di .get('sampleSvc');
      svc.doSomething();
    }    
  }
  
  
  function main() {    
    window.viewBag = window.viewBag || {};
    window.viewBag.vm = new InvoiceVM();
    ko.applyBindings(window.viewBag.vm, document.body);  
  }
  
  main();
  
}());