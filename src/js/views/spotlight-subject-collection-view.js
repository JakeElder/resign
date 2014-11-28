//==============================================================================
// Dependencies
//==============================================================================

var Backbone    = require('backbone');
var _           = require('underscore');
var $           = require('jquery');
var viewModel   = require('view-model');

var SubjectView = require('./spotlight-subject-view');


//==============================================================================
// Constructor
//==============================================================================

var SpotlightSubjectCollectionView = function() {
  Backbone.View.apply(this, arguments);
  this._bindMethodContexts();
  this._bindEventHandlers();
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
  this._setInitialState();
};

proto.render = function() {
  _.invoke(this.subjectViews, 'render');
  return this;
};

proto.showSubject = function(idx) {
  if (!this.$subjects[idx]) {
    throw 'No content slide at index: ' + idx;
  }
  this.$subjects.addClass('inactive');
  this.$subjects.eq(idx).removeClass('inactive');
};

proto.next = function() {
  viewModel.set('activeSlideIdx', viewModel.get('activeSlideIdx') + 1);
};

proto.prev = function() {
  viewModel.set('activeSlideIdx', viewModel.get('activeSlideIdx') - 1);
};


//==============================================================================
// Private functions
//==============================================================================

proto._bindMethodContexts = function() {
  this._initSubjectView  = _.bind(this._initSubjectView, this);
  this._initSubjectViews = _.bind(this._initSubjectViews, this);
};

proto._bindEventHandlers = function() {
  viewModel.on('change:activeSlideIdx', this._handleActiveSlideChange, this);
};

proto._initSubjectViews = function(collection) {
  var subjectViews = collection.map(this._initSubjectView);
  this.$subjects = this.$el.children();
  return subjectViews;
};

proto._initSubjectView = function(model) {
  var subjectView = new SubjectView({ model: model });
  subjectView.$el.appendTo(this.$el);
  return subjectView;
};

proto._setInitialState = function() {
  this.$('.spotlight-subject-collection__subject:not(:eq(0))')
    .addClass('inactive');
};

proto._handleActiveSlideChange = function() {
  this.showSubject(viewModel.get('activeSlideIdx'));
};

//==============================================================================
// Export
//==============================================================================

module.exports = SpotlightSubjectCollectionView;

