'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ReorderableRepeat = undefined;

var _dec, _dec2, _class, _desc, _value, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4;

var _aureliaDependencyInjection = require('aurelia-dependency-injection');

var _aureliaBinding = require('aurelia-binding');

var _aureliaTemplating = require('aurelia-templating');

var _aureliaTemplatingResources = require('aurelia-templating-resources');

var _reorderableRepeatStrategyLocator = require('./reorderable-repeat-strategy-locator');

var _bcxAureliaDnd = require('bcx-aurelia-dnd');

var _aureliaEventAggregator = require('aurelia-event-aggregator');

var _aureliaTaskQueue = require('aurelia-task-queue');

function _initDefineProp(target, property, descriptor, context) {
  if (!descriptor) return;
  Object.defineProperty(target, property, {
    enumerable: descriptor.enumerable,
    configurable: descriptor.configurable,
    writable: descriptor.writable,
    value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
  });
}

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
  var desc = {};
  Object['ke' + 'ys'](descriptor).forEach(function (key) {
    desc[key] = descriptor[key];
  });
  desc.enumerable = !!desc.enumerable;
  desc.configurable = !!desc.configurable;

  if ('value' in desc || desc.initializer) {
    desc.writable = true;
  }

  desc = decorators.slice().reverse().reduce(function (desc, decorator) {
    return decorator(target, property, desc) || desc;
  }, desc);

  if (context && desc.initializer !== void 0) {
    desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
    desc.initializer = undefined;
  }

  if (desc.initializer === void 0) {
    Object['define' + 'Property'](target, property, desc);
    desc = null;
  }

  return desc;
}

function _initializerWarningHelper(descriptor, context) {
  throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
}

var seed = 0;

var classes = function () {
  var cache = {};
  var start = '(?:^|\\s)';
  var end = '(?:\\s|$)';

  function lookupClass(className) {
    var cached = cache[className];
    if (cached) {
      cached.lastIndex = 0;
    } else {
      cache[className] = cached = new RegExp(start + className + end, 'g');
    }
    return cached;
  }

  function addClass(el, className) {
    var current = el.className;
    if (!current.length) {
      el.className = className;
    } else if (!lookupClass(className).test(current)) {
      el.className += ' ' + className;
    }
  }

  function rmClass(el, className) {
    el.className = el.className.replace(lookupClass(className), ' ').trim();
  }
  return { add: addClass, rm: rmClass };
}();

var ReorderableRepeat = exports.ReorderableRepeat = (_dec = (0, _aureliaTemplating.customAttribute)('reorderable-repeat'), _dec2 = (0, _aureliaDependencyInjection.inject)(_aureliaEventAggregator.EventAggregator, _aureliaTaskQueue.TaskQueue, _aureliaBinding.BindingEngine, _bcxAureliaDnd.DndService, _aureliaTemplating.BoundViewFactory, _aureliaTemplating.TargetInstruction, _aureliaTemplating.ViewSlot, _aureliaTemplating.ViewResources, _aureliaBinding.ObserverLocator, _reorderableRepeatStrategyLocator.ReorderableRepeatStrategyLocator), _dec(_class = (0, _aureliaTemplating.templateController)(_class = _dec2(_class = (_class2 = function (_AbstractRepeater) {
  _inherits(ReorderableRepeat, _AbstractRepeater);

  function ReorderableRepeat(ea, taskQueue, bindingEngine, dndService, viewFactory, instruction, viewSlot, viewResources, observerLocator, strategyLocator) {
    _classCallCheck(this, ReorderableRepeat);

    var _this = _possibleConstructorReturn(this, _AbstractRepeater.call(this, {
      local: 'item',
      viewsRequireLifecycle: (0, _aureliaTemplatingResources.viewsRequireLifecycle)(viewFactory)
    }));

    _initDefineProp(_this, 'items', _descriptor, _this);

    _initDefineProp(_this, 'local', _descriptor2, _this);

    _initDefineProp(_this, 'intention', _descriptor3, _this);

    _initDefineProp(_this, 'patchedItems', _descriptor4, _this);

    _this.type = 'reorder-' + seed;
    seed += 1;

    _this.ea = ea;
    _this.taskQueue = taskQueue;
    _this.bindingEngine = bindingEngine;
    _this.dndService = dndService;
    _this.viewFactory = viewFactory;
    _this.instruction = instruction;
    _this.viewSlot = viewSlot;
    _this.lookupFunctions = viewResources.lookupFunctions;
    _this.observerLocator = observerLocator;
    _this.strategyLocator = strategyLocator;
    _this.ignoreMutation = false;
    _this.sourceExpression = (0, _aureliaTemplatingResources.getItemsSourceExpression)(_this.instruction, 'reorderable-repeat.for');
    if (_this.sourceExpression instanceof _aureliaBinding.BindingBehavior) {
      throw new Error('BindingBehavior is not supported in reorderable-repeat');
    }
    if (_this.sourceExpression instanceof _aureliaBinding.ValueConverter) {
      throw new Error('ValueConverter is not supported in reorderable-repeat');
    }
    if ((0, _aureliaTemplatingResources.isOneTime)(_this.sourceExpression)) {
      throw new Error('oneTime binding is not supported in reorderable-repeat');
    }
    _this.viewsRequireLifecycle = (0, _aureliaTemplatingResources.viewsRequireLifecycle)(viewFactory);
    return _this;
  }

  ReorderableRepeat.prototype.call = function call(context, changes) {
    this[context](this.items, changes);
  };

  ReorderableRepeat.prototype.bind = function bind(bindingContext, overrideContext) {
    var _this2 = this;

    this.scope = { bindingContext: bindingContext, overrideContext: overrideContext };
    this.matcherBinding = this._captureAndRemoveMatcherBinding();
    this._subsribers = [this.bindingEngine.collectionObserver(this.items).subscribe(this._itemsMutated.bind(this)), this.ea.subscribe('dnd:willStart', function () {
      _this2.intention = null;
      _this2.views().forEach(function (v) {
        return classes.rm(v.firstChild, 'reorderable-repeat-dragging-me');
      });
    }), this.ea.subscribe('dnd:didEnd', function () {
      _this2.views().forEach(function (v) {
        return classes.rm(v.firstChild, 'reorderable-repeat-dragging-me');
      });

      if (!_this2.intention) return;
      var _intention = _this2.intention,
          fromIndex = _intention.fromIndex,
          toIndex = _intention.toIndex;

      _this2.intention = null;

      if (fromIndex === toIndex) return;

      var item = _this2.items[fromIndex];
      _this2.items.splice(fromIndex, 1);
      _this2.items.splice(toIndex, 0, item);

      var afterReordering = _this2._reorderableAfterReorderingFunc();
      if (afterReordering) afterReordering(_this2.items);
    })];
    this.patchedItems = [].concat(this.items);
    this.patchedItemsChanged();
  };

  ReorderableRepeat.prototype.unbind = function unbind() {
    this.scope = null;
    this.items = null;
    this.matcherBinding = null;
    this.viewSlot.removeAll(true);
    this._subsribers.forEach(function (s) {
      return s.dispose();
    });
  };

  ReorderableRepeat.prototype.intentionChanged = function intentionChanged(newIntention) {
    if (newIntention) {
      var fromIndex = newIntention.fromIndex,
          toIndex = newIntention.toIndex;

      var patched = [].concat(this.items);
      var item = this.items[fromIndex];
      patched.splice(fromIndex, 1);
      patched.splice(toIndex, 0, item);
      this.patchedItems = patched;
    }
  };

  ReorderableRepeat.prototype.itemsChanged = function itemsChanged() {
    if (!this.scope) {
      return;
    }

    if (this.intention === null) {
      this.patchedItems = [].concat(this.items);
    } else {
      this.intention = null;
    }
  };

  ReorderableRepeat.prototype._itemsMutated = function _itemsMutated() {
    if (this.intention === null) {
      this.patchedItems = [].concat(this.items);
    } else {
      this.intention = null;
    }
  };

  ReorderableRepeat.prototype.patchedItemsChanged = function patchedItemsChanged() {
    if (!this.scope) {
      return;
    }

    this.strategy = this.strategyLocator.getStrategy(this.patchedItems);
    if (!this.strategy) {
      throw new Error('Value for \'' + this.sourceExpression + '\' is non-repeatable');
    }

    this.strategy.instanceChanged(this, this.patchedItems);
  };

  ReorderableRepeat.prototype._captureAndRemoveMatcherBinding = function _captureAndRemoveMatcherBinding() {
    if (this.viewFactory.viewFactory) {
      var instructions = this.viewFactory.viewFactory.instructions;
      var instructionIds = Object.keys(instructions);
      for (var i = 0; i < instructionIds.length; i++) {
        var expressions = instructions[instructionIds[i]].expressions;
        if (expressions) {
          for (var ii = 0; i < expressions.length; i++) {
            if (expressions[ii].targetProperty === 'matcher') {
              var matcherBinding = expressions[ii];
              expressions.splice(ii, 1);
              return matcherBinding;
            }
          }
        }
      }
    }

    return undefined;
  };

  ReorderableRepeat.prototype.viewCount = function viewCount() {
    return this.viewSlot.children.length;
  };

  ReorderableRepeat.prototype.views = function views() {
    return this.viewSlot.children;
  };

  ReorderableRepeat.prototype.view = function view(index) {
    return this.viewSlot.children[index];
  };

  ReorderableRepeat.prototype.matcher = function matcher() {
    return this.matcherBinding ? this.matcherBinding.sourceExpression.evaluate(this.scope, this.matcherBinding.lookupFunctions) : null;
  };

  ReorderableRepeat.prototype.addView = function addView(bindingContext, overrideContext) {
    var view = this.viewFactory.create();
    window.ttview = view;
    view.bind(bindingContext, overrideContext);
    this.viewSlot.add(view);
    window.ttview = view;
    this._registerDnd(view);
  };

  ReorderableRepeat.prototype.insertView = function insertView(index, bindingContext, overrideContext) {
    var view = this.viewFactory.create();
    view.bind(bindingContext, overrideContext);
    this.viewSlot.insert(index, view);
    this._registerDnd(view);
  };

  ReorderableRepeat.prototype.moveView = function moveView(sourceIndex, targetIndex) {
    this.viewSlot.move(sourceIndex, targetIndex);
  };

  ReorderableRepeat.prototype.removeAllViews = function removeAllViews(returnToCache, skipAnimation) {
    var _this3 = this;

    this.views().forEach(function (view) {
      return _this3._unRegisterDnd(view);
    });
    return this.viewSlot.removeAll(returnToCache, skipAnimation);
  };

  ReorderableRepeat.prototype.removeViews = function removeViews(viewsToRemove, returnToCache, skipAnimation) {
    var _this4 = this;

    viewsToRemove.forEach(function (view) {
      return _this4._unRegisterDnd(view);
    });
    return this.viewSlot.removeMany(viewsToRemove, returnToCache, skipAnimation);
  };

  ReorderableRepeat.prototype.removeView = function removeView(index, returnToCache, skipAnimation) {
    this._unRegisterDnd(this.view(index));
    return this.viewSlot.removeAt(index, returnToCache, skipAnimation);
  };

  ReorderableRepeat.prototype.updateBindings = function updateBindings(view) {
    this._unRegisterDnd(view);

    var j = view.bindings.length;
    while (j--) {
      (0, _aureliaTemplatingResources.updateOneTimeBinding)(view.bindings[j]);
    }
    j = view.controllers.length;
    while (j--) {
      var k = view.controllers[j].boundProperties.length;
      while (k--) {
        var binding = view.controllers[j].boundProperties[k].binding;
        (0, _aureliaTemplatingResources.updateOneTimeBinding)(binding);
      }
    }

    this._registerDnd(view);
  };

  ReorderableRepeat.prototype._additionalAttribute = function _additionalAttribute(view, attribute) {
    return view && view.firstChild && view.firstChild.au && view.firstChild.au[attribute] ? view.firstChild.au[attribute].instruction.attributes[attribute] : undefined;
  };

  ReorderableRepeat.prototype._reorderableDirection = function _reorderableDirection(view) {
    var attr = this._additionalAttribute(view, 'reorderable-direction');
    if (attr && attr.sourceExpression) {
      attr = attr.sourceExpression.evaluate(this.scope);
    }

    if (typeof attr === 'string') {
      return attr.toLowerCase() || 'down';
    }
    return 'down';
  };

  ReorderableRepeat.prototype._dndHandlerSelector = function _dndHandlerSelector(view) {
    var attr = this._additionalAttribute(view, 'reorderable-dnd-handler-selector');
    if (attr && attr.sourceExpression) {
      attr = attr.sourceExpression.evaluate(this.scope);
    }

    if (typeof attr === 'string') {
      return attr;
    }
  };

  ReorderableRepeat.prototype._dndPreviewFunc = function _dndPreviewFunc(view) {
    var func = this._additionalAttribute(view, 'reorderable-dnd-preview');

    if (!func) {
      return null;
    } else if (typeof func === 'string') {
      var funcCall = this.scope.overrideContext.bindingContext[func];

      if (typeof funcCall === 'function') {
        return funcCall.bind(this.scope.overrideContext.bindingContext);
      }
      throw new Error("'reorderable-dnd-preview' must be a function or evaluate to one");
    } else if (func.sourceExpression) {
      return function (item, scope) {
        return func.sourceExpression.evaluate(scope);
      };
    } else {
      throw new Error("'reorderable-dnd-preview' must be a function or evaluate to one");
    }
  };

  ReorderableRepeat.prototype._reorderableAfterReorderingFunc = function _reorderableAfterReorderingFunc() {
    var _this5 = this;

    var func = this._additionalAttribute(this.view(0), 'reorderable-after-reordering');

    if (!func) {
      return null;
    } else if (typeof func === 'string') {
      var funcCall = this.scope.overrideContext.bindingContext[func];

      if (typeof funcCall === 'function') {
        return funcCall.bind(this.scope.overrideContext.bindingContext);
      }
      throw new Error("'reorderable-after-reordering' must be a function or evaluate to one");
    } else if (func.sourceExpression) {
      return function () {
        return func.sourceExpression.evaluate(_this5.scope);
      };
    } else {
      throw new Error("'reorderable-after-reordering' must be a function or evaluate to one");
    }
  };

  ReorderableRepeat.prototype._dndHover = function _dndHover(location, index, direction) {
    var mouseEndAt = location.mouseEndAt,
        targetElementRect = location.targetElementRect;

    var x = mouseEndAt.x - targetElementRect.x;
    var y = mouseEndAt.y - targetElementRect.y;

    var inLeastHalf = void 0;

    if (direction === 'left') {
      inLeastHalf = x > targetElementRect.width / 2;
    } else if (direction === 'right') {
      inLeastHalf = x < targetElementRect.width / 2;
    } else if (direction === 'up') {
      inLeastHalf = y > targetElementRect.height / 2;
    } else {
        inLeastHalf = y < targetElementRect.height / 2;
      }

    if (inLeastHalf) {
      this._updateIntention(index, true);
    } else {
      this._updateIntention(index, false);
    }
  };

  ReorderableRepeat.prototype._registerDnd = function _registerDnd(view) {
    var _this6 = this;

    var local = this.local;

    var el = view.firstChild;
    var item = view.bindingContext[local];
    var index = view.overrideContext.$index;
    var handlerSelector = this._dndHandlerSelector(view);
    var handler = void 0;
    if (handlerSelector) {
      handler = view.firstChild.querySelector(handlerSelector);
    }
    var direction = this._reorderableDirection(view);
    var _previewFunc = this._dndPreviewFunc(view);

    this.dndService.addSource({
      dndModel: function dndModel() {
        return { type: _this6.type, index: index };
      },
      dndPreview: _previewFunc && function () {
        return _previewFunc(item, view);
      },
      dndElement: el
    }, handler && { handler: handler });

    this.dndService.addTarget({
      dndElement: el,
      dndCanDrop: function dndCanDrop(model) {
        var canDrop = model.type === _this6.type && (_this6.intention ? _this6.intention.toIndex !== index : model.index !== index);

        if (model.type === _this6.type && !canDrop) {
          _this6.taskQueue.queueMicroTask(function () {
            classes.add(el, 'reorderable-repeat-dragging-me');
          });
        }
        return canDrop;
      },
      dndHover: function dndHover(location) {
        _this6._dndHover(location, index, direction);
      },
      dndDrop: function dndDrop() {}
    });
  };

  ReorderableRepeat.prototype._unRegisterDnd = function _unRegisterDnd(view) {
    classes.rm(view.firstChild, 'reorderable-repeat-dragging-me');
    this.dndService.removeSource(view.firstChild);
    this.dndService.removeTarget(view.firstChild);
  };

  ReorderableRepeat.prototype._updateIntention = function _updateIntention(targetIndex, beforeTarget) {
    var _dndService = this.dndService,
        isProcessing = _dndService.isProcessing,
        model = _dndService.model;

    if (!isProcessing) return;
    if (model.type !== this.type) return;

    if (targetIndex < 0) return;

    var originalIndex = void 0;
    var currentIndex = void 0;
    var nextIndex = void 0;
    if (this.intention) {
      originalIndex = this.intention.fromIndex;
      currentIndex = this.intention.toIndex;
    } else {
      originalIndex = model.index;
      if (originalIndex < 0) return;
      currentIndex = originalIndex;
    }

    if (currentIndex < targetIndex) {
      if (beforeTarget) {
        nextIndex = targetIndex - 1;
      } else {
        nextIndex = targetIndex;
      }
    } else {
        if (beforeTarget) {
          nextIndex = targetIndex;
        } else {
          nextIndex = targetIndex + 1;
        }
      }

    if (!this.intention || this.intention.fromIndex !== originalIndex || this.intention.toIndex !== nextIndex) {
      this.intention = {
        fromIndex: originalIndex,
        toIndex: nextIndex
      };
    }
  };

  return ReorderableRepeat;
}(_aureliaTemplatingResources.AbstractRepeater), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'items', [_aureliaTemplating.bindable], {
  enumerable: true,
  initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, 'local', [_aureliaTemplating.bindable], {
  enumerable: true,
  initializer: null
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, 'intention', [_aureliaBinding.observable], {
  enumerable: true,
  initializer: function initializer() {
    return null;
  }
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, 'patchedItems', [_aureliaBinding.observable], {
  enumerable: true,
  initializer: null
})), _class2)) || _class) || _class) || _class);