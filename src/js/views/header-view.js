//==============================================================================
// Dependencies
//==============================================================================

var Backbone = require('backbone');
var $        = require('jquery');
var _        = require('underscore');
var fs       = require('fs');
var template = _.template(
  fs.readFileSync(__dirname + '/../templates/header.tpl', 'utf8')
);


//==============================================================================
// Constructor
//==============================================================================

var HeaderView = function(data) {
  Backbone.View.apply(this, arguments);
  this.setElement($(template(data)));
};

$.extend(HeaderView.prototype, Backbone.View.prototype);


//==============================================================================
// Export
//==============================================================================

module.exports = HeaderView;

