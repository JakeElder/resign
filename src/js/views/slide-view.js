//==============================================================================
// Dependencies
//==============================================================================

var Backbone = require('backbone');
var extend   = require('util')._extend;
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
};
extend(SlideView.prototype, Backbone.View.prototype);
SlideView.prototype.tagName = 'li';


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

