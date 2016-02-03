# ng-interops
Sample of how to call into angular from non angular and vice versa

##Key Takeaways

Interops points when calling into angular land:
- controller
- service
- etc.

To interact with controller, you can do:

1. If you are placing your properties and methods in scope
```javascript
var ctrlScope = angular.element('[query selector here]').scope();
ctrlScope.methodCall(/* params here */);    //call scope method
var localPropRef = ctrlScope.propertyName;  //access scope property
```
2. If you are using controller as (for example: as vm)
```javascript
var ctrl = angular.element('[query selector here]').scope().vm;
ctrl.methodCall(/* params here */);    //call controller method
var localPropRef = ctrl.propertyName;  //access controller property
```

To interact with service, you can do:
```javascript
var di = angular.element('[query selector here]').injector();    //access the ng injector for that element  
var svc = di .get('[service name here]');   //ask the injector for the service
svc.methodNameHere(/* params here */);  //call the service method.
```

To reach outside from angular, you can cache the JavaScript object inside global variable and access it like so:
```javascript
//outside angular land...
window.viewBag = window.viewBag || {};  //prepare a property bag
window.viewBag.something = {
    doSomething: function() {
        console.log('Hello');
    }
};
```
and
```javascript
//somewhere inside angular...
window.viewBag.something.doSomething();
```