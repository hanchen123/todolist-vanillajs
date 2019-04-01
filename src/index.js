require('./index.scss');
require('./base.js');
require('./template.js');
require('./controller.js');
require('./view.js');
require('./model.js');

(function () {
  'use strict';

  function Todo(name) {
    this.model = new app.model();
    this.template = new app.template();
    this.view = new app.view(this.template);
    this.controller = new app.controller(this.model, this.view);
  }

  var todo = new Todo('todos-vanillajs');
}());