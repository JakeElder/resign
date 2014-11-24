//==============================================================================
// Dependencies
//==============================================================================

var Backbone = require('backbone');
var $        = require('jquery');
var _        = require('underscore');


//==============================================================================
// Constructor
//==============================================================================

var Controller = function() {
  this._deferred = $.Deferred();
  this.ready = this._deferred.promise();
  this._bindMethodContexts();
  this.on('init', this._handleInit);
};
$.extend(Controller.prototype, Backbone.Events);


//==============================================================================
// Private functions
//==============================================================================

Controller.prototype._bindMethodContexts = function() {
  this._handleInit = _.bind(this._handleInit, this);
};

Controller.prototype._handleInit = function() {
  this._deferred.resolve(this);
};


//==============================================================================
// Export
//==============================================================================

module.exports = Controller;

