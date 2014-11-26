//==============================================================================
// Dependencies
//==============================================================================

var Backbone = require('backbone');
var $        = require('jquery');
var _        = require('underscore');
var fs       = require('fs');
var template = _.template(
  fs.readFileSync(__dirname + '/../templates/spotlight-subject.tpl', 'utf8')
);


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
  var data = $.extend({}, this.model.attributes, {
    imageUrl: '/images/content/' + this.model.get('imageName')
  });
  this.$el.attr('data-cid', this.model.get('cID'));
  this.$el.html(template(data));
  return this;
};


//==============================================================================
// Export
//==============================================================================

module.exports = ContentSlideView;

