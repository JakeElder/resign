//==============================================================================
// Dependencies
//==============================================================================

var Backbone = require('backbone');
var $        = require('jquery');


//==============================================================================
// Constructor
//==============================================================================

var ViewModel = function() {
  Backbone.Model.apply(this, arguments);
};
var proto = ViewModel.prototype;
$.extend(proto, Backbone.Model.prototype, {
  defaults: {
    activeSlideIdx: 0,
    slideColection: {}
  }
});


//==============================================================================
// Public functions
//==============================================================================

proto.set = function(property, value) {
  if (property === 'activeSlideIdx') {
    if(value < 0 || value >= this.get('slideCollection').length) {
      return false;
    }
  }
  Backbone.Model.prototype.set.apply(this, arguments);
};


//==============================================================================
// Export
//==============================================================================

// Singleton
module.exports = new ViewModel();

