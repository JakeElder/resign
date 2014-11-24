
//==============================================================================
// Dependencies
//==============================================================================

var Controller = require('controller');
var $          = require('jquery');
var _          = require('underscore');
var View       = require('../views/header-view');


//==============================================================================
// Constructor
//==============================================================================

var SlidesController = function() {
  Controller.apply(this, arguments);
  this.view = new View();
  this.$el = this.view.$el;
  this.trigger('init');
};
$.extend(SlidesController.prototype, Controller.prototype);


//==============================================================================
// Export
//==============================================================================

module.exports = SlidesController;


