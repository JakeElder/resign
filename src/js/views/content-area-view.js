//==============================================================================
// Dependencies
//==============================================================================

var viewModel = require('view-model');
var Backbone  = require('backbone');
var $         = require('jquery');
var _         = require('underscore');
var fs        = require('fs');
var template = _.template(
  fs.readFileSync(__dirname + '/../templates/content-area.tpl', 'utf8')
);


//==============================================================================
// Constructor
//==============================================================================

var ContentAreaView = function() {
  Backbone.View.apply(this, arguments);
  this.setElement($(template()));
  this._bindEventHandlers();
};
var proto = ContentAreaView.prototype;
$.extend(proto, Backbone.View.prototype, {
  events: {
    'click .outro__t-and-c-link': '_handleTAndCLinkClick',
    'click .t-and-c__back-link': '_handleBackLinkClick'
  }
});


//==============================================================================
// Private functions
//==============================================================================

proto._handleTAndCLinkClick = function(e) {
  viewModel.set('activeContent', 't-and-c');
};

proto._handleBackLinkClick = function(e) {
  viewModel.set('activeContent', 'slideshow');
};

proto._bindEventHandlers = function() {
  viewModel.on('change:activeContent', this._handleActiveContentChange, this);
};

proto._handleActiveContentChange = function() {
  var $sectionContainer = this.$el.find('.content-area__section-container');
  if (viewModel.get('activeContent') === 't-and-c') {
    $sectionContainer.css('transform', 'translateZ(0) translateX(-100%)');
  } else {
    $sectionContainer.css('transform', 'translateZ(0) translateX(0)');
  }
};


//==============================================================================
// Export
//==============================================================================

module.exports = ContentAreaView;

