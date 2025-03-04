//==============================================================================
// Dependencies
//==============================================================================

var Backbone = require('backbone');
var $        = require('jquery');


//==============================================================================
// Constructor
//==============================================================================

var SpotlightSubjectView = function() {
  Backbone.View.apply(this, arguments);
};

$.extend(SpotlightSubjectView.prototype, Backbone.View.prototype, {
  tagName: 'li',
  className: 'spotlight-subject-collection__subject'
});


//==============================================================================
// Public functions
//==============================================================================

SpotlightSubjectView.prototype.render = function() {
  this.$el.attr('data-cid', this.model.get('cID'));
  return this;
};


//==============================================================================
// Export
//==============================================================================

module.exports = SpotlightSubjectView;

