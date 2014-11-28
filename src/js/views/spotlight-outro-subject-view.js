//==============================================================================
// Dependencies
//==============================================================================

var Backbone = require('backbone');
var $        = require('jquery');
var _        = require('underscore');
var fs       = require('fs');
var template = _.template(
  fs.readFileSync(__dirname + '/../templates/spotlight-outro-subject.tpl', 'utf8')
);

var SpotlightSubjectView = require('./spotlight-subject-view');


//==============================================================================
// Constructor
//==============================================================================

var SpotlightOutroSubjectView = function() {
  SpotlightSubjectView.apply(this, arguments);
};
var proto = SpotlightOutroSubjectView.prototype;
$.extend(proto, SpotlightSubjectView.prototype, {
  className: 'spotlight-subject-collection__outro-subject',
  template: template
});


//==============================================================================
// Public functions
//==============================================================================

SpotlightOutroSubjectView.prototype.render = function() {
  this.$el.html(this.template(this.model.toJSON()));
  return SpotlightSubjectView.prototype.render.apply(this, arguments);
};


//==============================================================================
// Export
//==============================================================================

module.exports = SpotlightOutroSubjectView;

