//==============================================================================
// Dependencies
//==============================================================================

var Controller = require('controller');
var $          = require('jquery');
var content    = require('content');
var _          = require('underscore');

var View       = require('../views/t-and-c-view');


//==============================================================================
// Constructor
//==============================================================================

var TermsAndConditionsController = function() {
  Controller.apply(this, arguments);
  this._bindMethodContexts();
  $.when(content.ready).then(this._handleContentReady);
};
var proto = TermsAndConditionsController.prototype;
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
    content: content.get('TERMS_AND_CONDITIONS')
  };
};


//==============================================================================
// Export
//==============================================================================

module.exports = TermsAndConditionsController;

