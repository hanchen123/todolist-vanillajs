(function(win) {
  'use strict';

  function Model() {
    this.store = [];
    this.filter = 'All';
  }

  Model.prototype._find = function(query) {
    return this.store.filter(function(item) {
      for (var key in query) {
        if (query[key] !== item[key]) {
          return false;
        }
      }
      return true;
    });
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
    callback.call(this, this.store)
  }

  Model.prototype.remove = function(id, callback) {
    callback = callback || function () {};

    for (var i = 0; i < this.store.length; i++) {
      if (this.store[i].id === id) {
        this.store.splice(i, 1);
        break;
      }
    }

    callback.call(this, id)
  }

  Model.prototype.read = function(query, callback) {
    callback = callback || function () {};

    if (typeof query === 'function') {
      query.call(this, this.store);
    } else if (typeof query === 'number' || typeof query === 'string') {
      var id = parseInt(query, 10);
      query = {id: id};
    }

    var item = this._find(query);
    if (!item) return;

    callback.call(this, item[0]);
  }

  Model.prototype.update = function(id, updater, callback) {
    callback = callback || function () {};

    for (var i = 0; i < this.store.length; i++) {
      if (this.store[i].id === id) {
        for (var key in updater) {
          this.store[i][key] = updater[key];
        }
      }
    }

    callback.call(this, this.store);
  }

  Model.prototype.setFilter = function(filter, callback) {
    callback = callback || function () {};

    this.filter = filter;
    callback.call(this, this.store);
  };

  win.app = win.app || {};
  win.app.model = Model;
  
}(window));