//==============================================================================
// Dependencies
//==============================================================================

var SlideCollectionView = require('./views/slide-collection-view');
var SlideCollection     = require('./collections/slide-collection');
var $                   = require('jquery');


//==============================================================================
// App
//==============================================================================

var App = function() { this.init(); };


//==============================================================================
// Public functions
//==============================================================================

App.prototype.init = function() {
  this.slideCollectionView = new SlideCollectionView({
    collection: new SlideCollection()
  });
  this.slideCollectionView.on('init', function() {
    this.render().$el.appendTo($('body'));
  });
};


//==============================================================================
// Go
//==============================================================================

window.app = new App();

