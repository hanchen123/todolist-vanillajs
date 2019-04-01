(function(win) {
  'use strict';

  function Template() {
    this.todoTemplate
    = '<li data-id="{{id}}" class="{{status}}">'
    +   '<div class="todo-view">'
    +     '<label>{{name}}</label>'
    +     '<button class="todo-remove">remove</button>'
    +   '</div>'
    + '</li>';
  }

  Template.prototype.show = function (data) {
    var i, l;
    var view = '';

    for (i = 0, l = data.length; i < l; i++) {
      var template = this.todoTemplate;

      template = template.replace('{{id}}', data[i].id);
      template = template.replace('{{name}}', data[i].name);
      template = template.replace('{{status}}', data[i].status);

      view = view + template;
    }

    return view;
  };

  win.app = win.app || {};
  win.app.template = Template;
  
}(window));