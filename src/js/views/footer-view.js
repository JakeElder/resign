//==============================================================================
// Dependencies
//==============================================================================

var Backbone = require('backbone');
var $        = require('jquery');
var _        = require('underscore');
var fs       = require('fs');
var template = _.template(
  fs.readFileSync(__dirname + '/../templates/footer.tpl', 'utf8')
);


//==============================================================================
// Constructor
//==============================================================================

var FooterView = function(data) {
  Backbone.View.apply(this, arguments);
  this.setElement($(template(data)));
};
var proto = FooterView.prototype;
$.extend(FooterView.prototype, Backbone.View.prototype);


//==============================================================================
// Public functions
//==============================================================================

proto.show = function() {
  this.$el.addClass('site-footer--visible');
};

proto.hide = function() {
  this.$el.removeClass('site-footer--visible');
};


//==============================================================================
// Export
//==============================================================================

module.exports = FooterView;

