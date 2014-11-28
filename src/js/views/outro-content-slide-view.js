//==============================================================================
// Dependencies
//==============================================================================

var $        = require('jquery');
var _        = require('underscore');
var fs       = require('fs');
var template = _.template(
  fs.readFileSync(__dirname + '/../templates/outro-content-slide.tpl', 'utf8')
);

var ContentSlideView = require('./content-slide-view');


//==============================================================================
// Constructor
//==============================================================================

var OutroContentSlideView = function() {
  ContentSlideView.apply(this, arguments);
};
$.extend(OutroContentSlideView.prototype, ContentSlideView.prototype, {
  template: template
});


//==============================================================================
// Export
//==============================================================================

module.exports = OutroContentSlideView;

