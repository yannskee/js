function EventEmitter(){
 // HashMap [ event -> [fn1, fn2, ...] ]
 this.callbacks = {};

}

EventEmitter.prototype = {
  
  on: function(event, fn){

    if (!(this.callbacks.hasOwnProperty(event))) {
    this.callbacks[event] = [];
    }    
    this.callbacks[event].push(fn);
    return this;
  },
  
  once: function(event, fn) {
    counter = 0;
    onceFn = function () {
      counter++;
      if (counter == 1){
        indexFn = this.indexOf(fn);
        this.splice(indexFn, 2);
      }
    }
    if (!(this.callbacks.hasOwnProperty(event))) {
    this.callbacks[event] = [];
    }    
    newOnceFn = onceFn.bind(this.callbacks[event]);
    this.callbacks[event].push(fn, newOnceFn);
    return this;
  },
  
  times: function(event, time, fn) {
    counter = 0;
    onceFn = function () {
      counter++;
      if (counter == time){
        indexFn = this.indexOf(fn);
        this.splice(indexFn, 2);
      }
    }
    if (!(this.callbacks.hasOwnProperty(event))) {
    this.callbacks[event] = [];
    }
    newOnceFn = onceFn.bind(this.callbacks[event]);
    this.callbacks[event].push(fn,newOnceFn);
    return this;
  },
  
  off: function(event, fn){
    if(!event && !fn){
      for (var key in this.callbacks) {
         delete this.callbacks[key];
      }
      // i can also do this : this.callbacks = {};
    }
    else if (!fn) {
        delete this.callbacks[event];
    }
    else {
      var myArray = this.callbacks[event];
      var eventFn = this.callbacks[event].indexOf(fn);
      //console.log(eventFn);
      this.callbacks[event].splice(eventFn, 1);
    }
    return this;
  },
  
  emit: function(event){
    var tab = Array.prototype.slice.call(arguments);
    tab.shift();
    if (this.callbacks.hasOwnProperty(event)) {
      this.callbacks[event].forEach(function(f) {
        f.apply(this, tab);
      })
    }
    return this;
  }
};


var julien = new EventEmitter();

var myFunction = function printSome(a) {
  console.log(a);
}

julien.once("hey", function() {
  console.log('hey');
});

julien.once("oh", function() {
  console.log('oh');
});
julien.emit('hey').emit('hey');
julien.emit('oh').emit('oh');



