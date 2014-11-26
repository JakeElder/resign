
//==============================================================================
// Dependencies
//==============================================================================

var Controller = require('controller');
var $          = require('jquery');
var View       = require('../views/header-view');


//==============================================================================
// Constructor
//==============================================================================

var HeaderController = function() {
  Controller.apply(this, arguments);
  this.view = new View();
  this.$el = this.view.$el;
  this.trigger('init');
};
$.extend(HeaderController.prototype, Controller.prototype);


//==============================================================================
// Export
//==============================================================================

module.exports = HeaderController;


