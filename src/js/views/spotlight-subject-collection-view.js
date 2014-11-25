//==============================================================================
// Dependencies
//==============================================================================

var Backbone             = require('backbone');
var _                    = require('underscore');
var $                    = require('jquery');

var SubjectView = require('./spotlight-subject-view');


//==============================================================================
// Constructor
//==============================================================================

var SpotlightSubjectCollectionView = function() {
  Backbone.View.apply(this, arguments);
  this._rendered = false;
  this._bindMethodContexts();
};
var proto = SpotlightSubjectCollectionView.prototype;
$.extend(proto, Backbone.View.prototype, {
  tagName: 'ul',
  className: 'spotlight-subject-collection'
});


//==============================================================================
// Public functions
//==============================================================================

proto.setCollection = function(collection) {
  this.subjectViews = this._initSubjectViews(collection);
  this.render();
  if (!this._rendered) {
    this.$('.spotlight-subject-collection__subject:not(:eq(0))').hide();
    this._rendered = true;
  }
};

proto.render = function() {
  _.invoke(this.subjectViews, 'render');
  return this;
};


//==============================================================================
// Private functions
//==============================================================================

proto._bindMethodContexts = function() {
  this._initSubjectView  = _.bind(this._initSubjectView, this);
  this._initSubjectViews = _.bind(this._initSubjectViews, this);
};

proto._initSubjectViews = function(collection) {
  return collection.map(this._initSubjectView);
};

proto._initSubjectView = function(model) {
  var subjectView = new SubjectView({ model: model });
  subjectView.$el.appendTo(this.$el);
  return subjectView;
};


//==============================================================================
// Export
//==============================================================================

module.exports = SpotlightSubjectCollectionView;

