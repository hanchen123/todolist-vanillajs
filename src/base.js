(function(win) {
  'use strict';

  NodeList.prototype.forEach = Array.prototype.forEach;
  NodeList.prototype.indexOf = Array.prototype.indexOf;

  win.qs = function (selector, context) {
    return (context || document).querySelector(selector);
  };

  win.qsa = function (selector, context) {
    return (context || document).querySelectorAll(selector);
  };

  win.$on = function (element, event, callback, capture) {
    element.addEventListener(event, callback, !!capture);
  }

  // window.$delegate(qs('section'), 'click', function(){}, 'input')
  win.$delegate = function (element, event, callback, target) {
    function customEvent(ev) {
      var currentElement = ev.target;
      var targetElement = win.qsa(target, element);
      var hasMatch = targetElement.indexOf(currentElement) > -1;
      if (hasMatch) {
        callback.call(currentElement, ev);
      }
    };
    
    window.$on(element, event, customEvent, event === 'focus' || event === 'blur');
  }

  win.$parent = function (element, selector) {
    if (!element.parentNode) return;
    try {
      if (element.parentNode.tagName.toLowerCase() === selector.toLowerCase()) {
        return element.parentNode;
      } else if (element.parentNode.classList.contains(selector)) {
        return element.parentNode;
      }
    } catch(e) {
      console.warn('cannot find element\'s parent');
      return;
    }
    return win.$parent(element.parentNode, selector);
  }
  
}(window));