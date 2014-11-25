//==============================================================================
// Dependencies
//==============================================================================

var _                     = require('underscore');
var $                     = require('jquery');

var HeaderController      = require('./controllers/header-controller');
var ContentAreaController = require('./controllers/content-area-controller');

var $window               = $(window);


//==============================================================================
// App
//==============================================================================

var App = function() {
  this.headerController      = new HeaderController();
  this.contentAreaController = new ContentAreaController();

  this._bindMethodContexts();

  this._throttledPrev = _.throttle(this.prev, 400, { trailing: false });
  this._throttledNext = _.throttle(this.next, 400, { trailing: false });

  var app = this;

  $.when(
    this.headerController.ready,
    this.contentAreaController.ready
  ).done(function() {
    app._bindEventHandlers();
    app.render();
  });
};


//==============================================================================
// Public functions
//==============================================================================

App.prototype.render = function(controllers) {
  $('body').append(
    this.headerController.$el,
    this.contentAreaController.$el
  );
};

App.prototype.setSlide = function(cID) {
  this.contentAreaController.contentSlidesController.collectionView.showSlide(cID);
};

App.prototype.prev = function() {
  this.contentAreaController.contentSlidesController.collectionView.prev();
  this.contentAreaController.spotlightController.subjectCollectionView.prev();
};

App.prototype.next = function() {
  this.contentAreaController.contentSlidesController.collectionView.next();
  this.contentAreaController.spotlightController.subjectCollectionView.next();
};


//==============================================================================
// Private functions
//==============================================================================

App.prototype._bindMethodContexts = function() {
  this.render            = _.bind(this.render, this);
  this.next              = _.bind(this.next, this);
  this._handleMousewheel = _.bind(this._handleMousewheel, this);
};

App.prototype._bindEventHandlers = function() {
  $window.on('mousewheel DOMMouseScroll', this._handleMousewheel);
};

App.prototype._handleMousewheel = function(e) {
  e.preventDefault();
  if (e.originalEvent.deltaY < 0) {
    this._throttledPrev();
  } else if (e.originalEvent.deltaY > 0) {
    this._throttledNext();
  }
};


//==============================================================================
// Go
//==============================================================================

window.app = new App();

