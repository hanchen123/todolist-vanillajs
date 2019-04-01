(function(win) {
  'use strict';

  function View(template) {
    this.template = template;
    this.$todoList = qs('.todo-list');
    this.$input = qs('.todo-input');
    this.$addButton = qs('.todo-add');
  }

  View.prototype.bind = function(event, callback) {
    var self = this;
    if (event === 'addNew') {
      $on(self.$addButton, 'click', function() {
        callback(self.$input.value);
      });
    }
  }

  View.prototype.render = function(type, params) {
    var self = this;
    var renders = {
      showList: function () {
        self.$todoList.innerHTML = self.template.show(params);
      },
      cleanInput: function() {
        self.$input.value = '';
      }
    }

    return renders[type]();
  }

  win.app = win.app || {};
  win.app.view = View;
  
}(window));