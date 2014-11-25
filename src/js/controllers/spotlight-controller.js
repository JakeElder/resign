//==============================================================================
// Dependencies
//==============================================================================

var Controller = require('controller');
var $          = require('jquery');
var _          = require('underscore');

var View                  = require('../views/spotlight-view');
var SubjectCollectionView = require('../views/spotlight-subject-collection-view');


//==============================================================================
// Constructor
//==============================================================================

var SpotlightController = function() {
  Controller.apply(this, arguments);

  this.view = new View();
  this.$el = this.view.$el;

  this.subjectCollectionView = new SubjectCollectionView();
};
var proto = SpotlightController.prototype;
$.extend(proto, Controller.prototype);


//==============================================================================
// Public functions
//==============================================================================

proto.setCollection = function(collection) {
  this.subjectCollectionView.setCollection(collection);
  this.subjectCollectionView.$el.appendTo(this.$el);
  this.trigger('init');
};


//==============================================================================
// Export
//==============================================================================

module.exports = SpotlightController;

