//==============================================================================
// Dependencies
//==============================================================================

var Controller = require('controller');
var $          = require('jquery');
var _          = require('underscore');

var View       = require('../views/spotlight-view');


//==============================================================================
// Constructor
//==============================================================================

var SpotlightController = function() {
  Controller.apply(this, arguments);
  this.view = new View();
  this.$el = this.view.$el;
  this.trigger('init');
};
$.extend(SpotlightController.prototype, Controller.prototype);


//==============================================================================
// Export
//==============================================================================

module.exports = SpotlightController;

