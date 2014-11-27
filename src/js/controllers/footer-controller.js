
//==============================================================================
// Dependencies
//==============================================================================

var Controller = require('controller');
var $          = require('jquery');
var content    = require('content');
var _          = require('underscore');

var View       = require('../views/footer-view');


//==============================================================================
// Constructor
//==============================================================================

var FooterController = function() {
  Controller.apply(this, arguments);
  this._bindMethodContexts();
  $.when(content.ready).then(this._handleContentReady);
};
var proto = FooterController.prototype;
$.extend(proto, Controller.prototype);


//==============================================================================
// Private functions
//==============================================================================

proto._bindMethodContexts = function() {
  this._handleContentReady = _.bind(this._handleContentReady, this);
};

proto._handleContentReady = function() {
  this._initView();
};

proto._initView = function() {
  this.view = new View(this._getData());
  this.$el = this.view.$el;
  this.trigger('init');
};

proto._getData = function() {
  return {
    leftList: content.get('FOOTER_LIST_LEFT'),
    rightList: content.get('FOOTER_LIST_RIGHT'),
  };
};


//==============================================================================
// Export
//==============================================================================

module.exports = FooterController;

