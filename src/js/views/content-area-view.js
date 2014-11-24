//==============================================================================
// Dependencies
//==============================================================================

var Backbone = require('backbone');
var $        = require('jquery');
var _        = require('underscore');
var fs       = require('fs');
var template = _.template(
  fs.readFileSync(__dirname + '/../templates/content-area.tpl', 'utf8')
);


//==============================================================================
// Constructor
//==============================================================================

var ContentAreaView = function() {
  Backbone.View.apply(this, arguments);
  this.setElement($(template()));
};
$.extend(ContentAreaView.prototype, Backbone.View.prototype);


//==============================================================================
// Export
//==============================================================================

module.exports = ContentAreaView;

