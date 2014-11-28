//==============================================================================
// Dependencies
//==============================================================================

var Controller  = require('controller');
var $           = require('jquery');
var content     = require('content');
var disposition = require('disposition');
var settings    = require('settings');
var _           = require('underscore');

var View        = require('../views/header-view');


//==============================================================================
// Constructor
//==============================================================================

var HeaderController = function() {
  Controller.apply(this, arguments);
  this._bindMethodContexts();
  $.when(
    settings.ready,
    content.ready,
    disposition.ready
  ).then(this._handleHelpersReady);
};
var proto = HeaderController.prototype;
$.extend(proto, Controller.prototype);


//==============================================================================
// Private functions
//==============================================================================

proto._bindMethodContexts = function() {
  this._handleHelpersReady = _.bind(this._handleHelpersReady, this);
};

proto._handleHelpersReady = function() {
  this._initView();
};

proto._initView = function() {
  this.view = new View(this._getData());
  this.$el = this.view.$el;
  this.trigger('init');
};

proto._getData = function() {
  return {
    ctaText: content.get('HEADER_CTA_COPY_' + disposition.contentType),
    ctaLink: settings.get('HEADER_CTA_LINK_' + disposition.contentType)
  };
};

//==============================================================================
// Export
//==============================================================================

module.exports = HeaderController;

