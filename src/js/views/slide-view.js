//==============================================================================
// Dependencies
//==============================================================================

var Backbone = require('backbone');
var $        = require('jquery');
var _        = require('underscore');
var fs       = require('fs');
var template = _.template(
  fs.readFileSync(__dirname + '/../templates/slide.tpl', 'utf8')
);


//==============================================================================
// Constructor
//==============================================================================

var SlideView = function() {
  Backbone.View.apply(this, arguments);
  this.$el.attr('data-cid', this.model.get('cID'));
};

$.extend(SlideView.prototype, Backbone.View.prototype, {
  tagName: 'li'
});


//==============================================================================
// Public functions
//==============================================================================

SlideView.prototype.render = function() {
  this.$el.html(template(this.model.toJSON()));
  return this;
};


//==============================================================================
// Export
//==============================================================================

module.exports = SlideView;

