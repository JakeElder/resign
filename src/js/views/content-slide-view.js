//==============================================================================
// Dependencies
//==============================================================================

var Backbone = require('backbone');
var $        = require('jquery');
var marked   = require('marked');
var _        = require('underscore');
var fs       = require('fs');
var template = _.template(
  fs.readFileSync(__dirname + '/../templates/content-slide.tpl', 'utf8')
);


//==============================================================================
// Constructor
//==============================================================================

var ContentSlideView = function() {
  Backbone.View.apply(this, arguments);
  this.$el.attr('data-cid', this.model.get('cID'));
};

$.extend(ContentSlideView.prototype, Backbone.View.prototype, {
  tagName: 'li',
  className: 'content-slide-collection__slide',
  template: template
});


//==============================================================================
// Public functions
//==============================================================================

ContentSlideView.prototype.render = function() {
  var data = this.model.toJSON();
  data.content = marked(data.content);
  this.$el.html(this.template(data));
  return this;
};


//==============================================================================
// Export
//==============================================================================

module.exports = ContentSlideView;

