//==============================================================================
// Dependencies
//==============================================================================

var _                     = require('underscore');
var $                     = require('jquery');
var viewModel             = require('view-model');
var Hammer                = require('hammerjs');

var HeaderController      = require('./controllers/header-controller');
var ContentAreaController = require('./controllers/content-area-controller');
var FooterController      = require('./controllers/footer-controller');

var addWheelListener      = require('./utils/add-wheel-listener');


//==============================================================================
// Setup
//==============================================================================

var hammer = new Hammer.Manager(window.document.body, {
  preventDefault: true
});
hammer.add(new Hammer.Swipe({ velocity: 0.5 }));


//==============================================================================
// App
//==============================================================================

var App = function() {
  this.headerController      = new HeaderController();
  this.contentAreaController = new ContentAreaController();
  this.footerController      = new FooterController();

  this._bindMethodContexts();

  this._throttledPrev = _.throttle(this.prev, 1000, { trailing: false });
  this._throttledNext = _.throttle(this.next, 1000, { trailing: false });

  var app = this;

  $.when(
    this.headerController.ready,
    this.contentAreaController.ready,
    this.footerController.ready
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
    this.contentAreaController.$el,
    this.footerController.$el
  );
};

App.prototype.prev = function() {
  viewModel.set('activeSlideIdx', viewModel.get('activeSlideIdx') - 1);
};

App.prototype.next = function() {
  viewModel.set('activeSlideIdx', viewModel.get('activeSlideIdx') + 1);
};


//==============================================================================
// Private functions
//==============================================================================

App.prototype._bindMethodContexts = function() {
  this.render            = _.bind(this.render, this);
  this.next              = _.bind(this.next, this);
  this._handleMousewheel = _.bind(this._handleMousewheel, this);
  this._handleSwipeUp    = _.bind(this._handleSwipeUp, this);
  this._handleSwipeDown  = _.bind(this._handleSwipeDown, this);
};

App.prototype._bindEventHandlers = function() {
  viewModel.on('change:activeSlideIdx', this._handleActiveSlideIdxChange, this);
  viewModel.on('change:activeContent', this._handleActiveContentChange, this);
  addWheelListener(window, this._handleMousewheel);
  hammer.on('swipeup', this._handleSwipeUp);
  hammer.on('swipedown', this._handleSwipeDown);
};

App.prototype._handleActiveSlideIdxChange = function() {
  this._showHideFooter();
};

App.prototype._handleActiveContentChange = function() {
  if (viewModel.get('activeContent') === 'slideshow') {
    hammer.get('swipe').set({ enable: true });
  } else {
    hammer.get('swipe').set({ enable: false });
  }
};

App.prototype._handleMousewheel = function(e) {
  if (viewModel.get('activeContent') === 't-and-c') { return true; }
  e.preventDefault();
  if (e.deltaY < 0) {
    this._throttledPrev();
  } else if (e.deltaY > 0) {
    this._throttledNext();
  }
};

App.prototype._handleSwipeUp = function(e) {
  if (viewModel.get('activeContent') === 't-and-c') { return true; }
  e.preventDefault();
  this._throttledNext();
};

App.prototype._handleSwipeDown = function(e) {
  if (viewModel.get('activeContent') === 't-and-c') { return true; }
  e.preventDefault();
  this._throttledPrev();
};

App.prototype._showHideFooter = function() {
  var idx = viewModel.get('activeSlideIdx');
  var numSlides = viewModel.get('slideCollection').length;
  this.footerController.view[idx + 1 === numSlides ? 'show' : 'hide']();
};


//==============================================================================
// Go
//==============================================================================

window.app = new App();

