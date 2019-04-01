(function(win) {
  'use strict';

  function Controller(model, view) {
    var self = this;
    self.model = model;
    self.view = view;

    self.view.bind('addNew', function (name) {
      self.addNew(name);
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

  win.app = win.app || {};
  win.app.controller = Controller;
  
}(window));