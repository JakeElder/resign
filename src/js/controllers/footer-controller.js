
//==============================================================================
// Dependencies
//==============================================================================

var Controller = require('controller');
var $          = require('jquery');
var View       = require('../views/footer-view');


//==============================================================================
// Constructor
//==============================================================================

var FooterController = function() {
  Controller.apply(this, arguments);
  this.view = new View();
  this.$el = this.view.$el;
  this.trigger('init');
};
var proto = FooterController.prototype;
$.extend(proto, Controller.prototype);


//==============================================================================
// Export
//==============================================================================

module.exports = FooterController;

