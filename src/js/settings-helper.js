/**
 * SettingsHelper
 * ==============
 * Abstraction for retrieving values from the settings object store in Parse
 *
 * Example usage:
 * var settings = require('settings');
 * $.when(settings.ready).then(function() {
 *  settings.get('DEFAULT_SLIDE_COMPOSITION'); => 'INTRO, 4G, O2_GURU'
 * });
 *
 */


//==============================================================================
// Dependencies
//==============================================================================

var $          = require('jquery');
var Collection = require('./collections/settings-collection');


//==============================================================================
// Constructor
//==============================================================================

var SettingsHelper = function() {
  this._deferred = $.Deferred();
  this.ready = this._deferred.promise();
  this.collection = new Collection();
  var settings = this;
  this.collection.fetch({
    success: function(collection) { settings._deferred.resolve(); }
  });
};
var proto = SettingsHelper.prototype;


//==============================================================================
// Public functions
//==============================================================================

proto.get = function(key) {
  var setting = this.collection.filter(function(model) {
    return model.get('key') === key;
  });
  if (setting.length === 0) { return; }
  return setting[0].get('value');
};


//==============================================================================
// Export
//==============================================================================

// Singleton
module.exports = new SettingsHelper();

