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
    this.$('.spotlight-subject-collection__subject:not(:eq(0))')
      .addClass('inactive');
    this._rendered = true;
    this._activeSubjectIdx = 0;
  }
};

proto.render = function() {
  _.invoke(this.subjectViews, 'render');
  return this;
};

proto.showSubject = function(cID) {
  this.showSubjectByIdx(this.idxFromCID(cID));
};

proto.showSubjectByIdx = function(idx) {
  if (!this.$subjects[idx]) {
    throw 'No content slide at index: ' + idx;
  }
  if (this._activeSlideIdx == idx) { return; }
  this.$subjects.addClass('inactive');
  this.$subjects.eq(idx).removeClass('inactive');
  this._activeSubjectIdx = idx;
};

proto.next = function() {
  this.showSubjectByIdx(this._activeSubjectIdx + 1);
};

proto.prev = function() {
  this.showSubjectByIdx(this._activeSubjectIdx - 1);
};

proto.idxFromCID = function(cID) {
  var idx = this.$subjects.filter('[data-cid="' + cID + '"]').index();
  if (idx === -1) { throw 'Invalid slide cID: ' + cID; }
  return idx;
};

//==============================================================================
// Private functions
//==============================================================================

proto._bindMethodContexts = function() {
  this._initSubjectView  = _.bind(this._initSubjectView, this);
  this._initSubjectViews = _.bind(this._initSubjectViews, this);
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


//==============================================================================
// Export
//==============================================================================

module.exports = SpotlightSubjectCollectionView;

