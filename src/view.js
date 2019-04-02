(function(win) {
  'use strict';

  function View(template) {
    this.template = template;
    this.ENTER_KEY = 13;
    this.ESCAPE_KEY = 27;
    this.$todoList = qs('.todo-list');
    this.$input = qs('.todo-input');
    this.$addButton = qs('.todo-add');
  }

  View.prototype._id = function(element) {
    var parent = $parent(element, 'li');
    return parseInt(parent.dataset.id, 10);
  }

  View.prototype._item = function(id) {
    return qs('[data-id="' + id + '"]');
  }

  View.prototype.remove = function(params) {
    var child = this._item(params);

    if (!child) {
      return;
    }

    this.$todoList.removeChild(child);
  } 

  View.prototype.edit = function(params) {
    var id = params.id;
    var name = params.name;
    var item = this._item(id);

    if (!item) {
      return;
    }

    item.classList.add('edit');
    var input = document.createElement('input');
    input.classList.add('todo-edit');
    input.value = name;
    item.appendChild(input);
    input.focus();
  } 

  View.prototype.save = function(params) {
    var id = params.id;
    var name = params.name;
    var item = this._item(id);

    if (!item) {
      return;
    }

    item.classList.remove('edit');
    item.removeChild(qs('.todo-edit', item));

    qs('.todo-name', item).textContent = name;
  } 

  View.prototype.bind = function(event, callback) {
    var self = this;
    if (event === 'addNew') {
      $on(self.$addButton, 'click', function() {
        callback(self.$input.value);
      });

      $on(self.$input, 'keypress', function(ev) {
        if (ev.keyCode === self.ENTER_KEY) {
          callback(self.$input.value);
        }
      });
    } else if (event === 'removeItem') {
      $delegate(self.$todoList, 'click', function(ev) {
        callback(self._id(this));
      }, '.todo-remove');
    } else if (event === 'editItem') {
      $delegate(self.$todoList, 'dblclick', function(ev) {
        callback(self._id(this));
      }, '.todo-name');
    } else if (event === 'editCancel') {
      $delegate(self.$todoList, 'keyup', function(ev) {
        if (ev.keyCode === self.ESCAPE_KEY) {
          this.dataset.isCancel = true;
          this.blur();
          callback(self._id(this));
        }
      }, 'li .todo-edit');
    } else if (event === 'editDone') {
      $delegate(self.$todoList, 'blur', function(ev) {
        if (!this.dataset.isCancel) {
          callback({
            id: self._id(this),
            name: this.value
          });
        }
      }, 'li .todo-edit');

      $delegate(self.$todoList, 'keypress', function(ev) {
        if (ev.keyCode === self.ENTER_KEY) {
          this.blur();
        }
      }, 'li .todo-edit');
    }
  }

  View.prototype.render = function(type, params) {
    var self = this;
    var renders = {
      showList: function() {
        self.$todoList.innerHTML = self.template.show(params);
      },
      cleanInput: function() {
        self.$input.value = '';
      },
      removeItem: function() {
        self.remove(params);
      },
      editItem: function() {
        self.edit(params);
      },
      editSave: function() {
        self.save(params);
      }
    }

    return renders[type]();
  }

  win.app = win.app || {};
  win.app.view = View;
  
}(window));