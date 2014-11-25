//==============================================================================
// Dependencies
//==============================================================================

var Backbone = require('backbone');
var $        = require('jquery');
var _        = require('underscore');
var fs       = require('fs');
var template = _.template(
  fs.readFileSync(__dirname + '/../templates/content-slide.tpl', 'utf8')
);
var $continuePrompt = $(fs.readFileSync(
  __dirname + '/../templates/continue-prompt.tpl', 'utf8'
));

//==============================================================================
// Constructor
//==============================================================================

var ContentSlideView = function() {
  Backbone.View.apply(this, arguments);
  this.$el.attr('data-cid', this.model.get('cID'));
};

$.extend(ContentSlideView.prototype, Backbone.View.prototype, {
  tagName: 'li',
  className: 'content-slide-collection__slide'
});


//==============================================================================
// Public functions
//==============================================================================

ContentSlideView.prototype.render = function() {
  this.$el.html(template(this.model.toJSON()));
  this.$el.append($continuePrompt.clone());
  return this;
};


//==============================================================================
// Export
//==============================================================================

module.exports = ContentSlideView;

