//==============================================================================
// Dependencies
//==============================================================================

var Backbone = require('backbone');
var $        = require('jquery');


//==============================================================================
// Constructor
//==============================================================================

var ContentSlideView = function() {
  Backbone.View.apply(this, arguments);
};

$.extend(ContentSlideView.prototype, Backbone.View.prototype, {
  tagName: 'li',
  className: 'spotlight-subject-collection__subject'
});


//==============================================================================
// Public functions
//==============================================================================

ContentSlideView.prototype.render = function() {
  this.$el.attr('data-cid', this.model.get('cID'));
  return this;
};


//==============================================================================
// Export
//==============================================================================

module.exports = ContentSlideView;

