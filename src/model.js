(function(win) {
  'use strict';

  function Model() {
    this.store = [];
  }

  Model.prototype.create = function(name, callback) {
    name = name || '';
    callback = callback || function () {};

    var todo = {
      id: new Date().getTime(),
      name: name.trim(),
      status: 'active'
    }

    this.store.push(todo);
    callback(this.store)
  }

  win.app = win.app || {};
  win.app.model = Model;
  
}(window));