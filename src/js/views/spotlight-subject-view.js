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
  this.$el.css('background-image', 'url("/images/content/' + this.model.get('imageName') + '")' );
  return this;
};


//==============================================================================
// Export
//==============================================================================

module.exports = ContentSlideView;

