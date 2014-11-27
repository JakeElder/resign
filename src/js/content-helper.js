/**
 * ContentHelper
 * ==============
 * Abstraction for retrieving values from the content object store in Parse
 *
 * Example usage:
 * var content = require('content');
 * $.when(content.ready).then(function() {
 *  content.get('HEADER_CTA_TEXT_CAM');
 *    => 'Call 0800 977 7337 or 8002 to get our best offer'
 * });
 *
 */


//==============================================================================
// Dependencies
//==============================================================================

var $          = require('jquery');
var marked     = require('marked');
var Collection = require('./collections/content-collection');


//==============================================================================
// Config
//==============================================================================

var MARKDOWN_CIDS = [
  'FOOTER_LIST_LEFT',
  'FOOTER_LIST_RIGHT'
];


//==============================================================================
// Constructor
//==============================================================================

var ContentHelper = function() {
  this._deferred = $.Deferred();
  this.ready = this._deferred.promise();
  this.collection = new Collection();
  var settings = this;
  this.collection.fetch({
    success: function(collection) { settings._deferred.resolve(); }
  });
};
var proto = ContentHelper.prototype;


//==============================================================================
// Public functions
//==============================================================================

proto.get = function(cID) {
  var setting = this.collection.filter(function(model) {
    return model.get('cID') === cID;
  });
  if (setting.length === 0) { return; }
  var value = setting[0].get('value');
  if(MARKDOWN_CIDS.indexOf(cID) !== -1) { value = marked(value); }
  return value;
};


//==============================================================================
// Export
//==============================================================================

// Singleton
module.exports = new ContentHelper();

