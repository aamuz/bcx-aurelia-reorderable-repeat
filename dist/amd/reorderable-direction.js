define(['exports', 'aurelia-templating'], function (exports, _aureliaTemplating) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.ReorderableDirection = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var ReorderableDirection = exports.ReorderableDirection = (_dec = (0, _aureliaTemplating.customAttribute)('reorderable-direction'), _dec(_class = function () {
    function ReorderableDirection() {
      _classCallCheck(this, ReorderableDirection);
    }

    ReorderableDirection.prototype.attached = function attached() {};

    ReorderableDirection.prototype.bind = function bind(bindingContext, overrideContext) {
      this.scope = { bindingContext: bindingContext, overrideContext: overrideContext };
    };

    return ReorderableDirection;
  }()) || _class);
});