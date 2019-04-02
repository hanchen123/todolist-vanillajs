(function(win) {
  'use strict';

  function Controller(model, view) {
    var self = this;
    self.model = model;
    self.view = view;

    self.view.bind('addNew', function (name) {
      self.addNew(name);
    });
    self.view.bind('removeItem', function (id) {
      self.removeItem(id);
    });
    self.view.bind('editItem', function (id) {
      self.editItem(id);
    });
    self.view.bind('editCancel', function (id) {
      self.editCancel(id);
    });
    self.view.bind('editDone', function (id) {
      self.editDone(id);
    });
  }

  Controller.prototype.addNew = function (name) {
    var self = this;

    if (name.trim() === '') {
      return;
    }

    self.model.create(name, function (todos) {
      self.view.render('cleanInput');
      self.view.render('showList', todos);
    });
  };

  Controller.prototype.removeItem = function (id) {
    var self = this;

    self.model.remove(id, function (id) {
      self.view.render('removeItem', id);
    });
  };

  Controller.prototype.editItem = function (id) {
    var self = this;

    self.model.read(id, function (item) {
      self.view.render('editItem', item);
    });
  };

  Controller.prototype.editCancel = function (id) {
    var self = this;

    self.model.read(id, function (item) {
      self.view.render('editSave', item);
    });
  };

  Controller.prototype.editDone = function (param) {
    var self = this;
    var name = param.name;

    if (name.length > 0) {
      self.model.update(param.id, {name: name}, function () {
        self.view.render('editSave', param);
      }); 
    } else {
      self.removeItem(param.id);
    }
  };
  
  win.app = win.app || {};
  win.app.controller = Controller;
  
}(window));