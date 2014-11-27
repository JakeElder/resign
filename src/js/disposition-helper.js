/**
 * DispositionHelper
 * =================
 * Helper class for determining the disposition of the page
 *
 * Example usage:
 * var disposition = new DispositionHelper();
 * disposition.contentType;
 *  => 'CAM'
 * disposition.slideComposition;
 *  => ['INTRO', '4G', 'O2_GURU']
 *
 */

//==============================================================================
// Dependencies
//==============================================================================

var settings = require('settings');
var _        = require('underscore');
var $        = require('jquery');


//==============================================================================
// Constructor
//==============================================================================

var DispostionHelper = function() {
  this._deferred = $.Deferred();
  this.ready = this._deferred.promise();

  var dispositionHelper = this;

  $.when(settings.ready).then(function() {
    dispositionHelper._processQueryString();
    dispositionHelper._deferred.resolve();
  });
};
var proto = DispostionHelper.prototype;


//==============================================================================
// Private functions
//==============================================================================


/**
 * The page composition can be defined by a query string parameter.
 * A key of CM_53 is expected to contain a comma seperated list of values
 *
 * EG: ?CM_53=(CAM|FRAN),[SLIDE_1, ...]
 *
 * The first string is one of (CAM|FRAN) and relates to the type of content
 * to be shown:
 *
 * CAM: Existing customer content. CTA's will coax the user to call a number
 * to renew
 * FRAN: Prospective/unknown customer content. CTA's will coax the user to
 * visit a store
 *
 * The second and 2+nth strings specify which slides should be displayed, in
 * order. CM_53=CAM,INTRO,PRIORITY,4G will result in the page being rendered
 * aimed towards coaxing the user to call O2, and will show in order, the
 * respective content as attached to the cID in the 'slides' object store
 * in Parse
 *
 * The query string can be completely omitted. In this case, the content type
 * defaults to FRAN. The slides to be displayed are defined by the
 * DEFAULT_SLIDE_COMPOSITION setting in the 'settings' object store.
 *
 */
proto._processQueryString = function() {
  // Get query string, minus the question mark, with &amp; unescaped
  var string = window.location.search.substr(1).replace(/&amp;/g, '&');

  // Split string into an array of key=value strings, EG ['X=foo', 'Y=bar']
  var params = string.split('&');

  // Transform in to an array of key, value tuples EG
  // [['X', 'Foo'], ['Y', 'bar']]
  var tuples = _.invoke(params, 'split', '=');

  // Filter to the only tuple of interest, that with the key of 'CM_53'
  tuples = _.filter(tuples, function(tuple) { return tuple[0] === 'CM_53'; });

  // Set defaults if no CM_53 key is presetn
  if (!tuples.length) {
    this._setDefaults();
    return;
  }

  // Split value string in to array, EG ['CAM', 'INTRO', 'O2_LEASE']
  var parts = tuples[0][1].split(',');

  // First string should be content type
  var contentType = parts.shift();

  // If first string isn't CAM or FRAN, query string is malformed, set default
  // and return
  if (['CAM', 'FRAN'].indexOf(contentType) === -1) {
    this._setDefaults();
    return;
  }

  // First element is either 'CAM' or 'FRAN', set contentType to that
  this.contentType = contentType;

  // Set default slide composition if not composition is specified
  // in query string
  if (!parts.length) {
    this._setDefaultSlideComposition();
    return;
  }

  // If there are remaining elements, they're the cIDs assigned to the slides
  // that should be displayed
  this.slideComposition = parts;
};

proto._setDefaults = function() {
  this._setDefaultContentType();
  this._setDefaultSlideComposition();
};

proto._setDefaultContentType = function() {
  this.contentType = 'FRAN';
};

proto._setDefaultSlideComposition = function() {
  var slides = settings.get('DEFAULT_SLIDE_COMPOSITION');
  // Remove whitespace, and split comma seperated strings in to array
  slides = slides.replace(/\s+/g, '').split(',');
  this.slideComposition = slides;
};


//==============================================================================
// Export
//==============================================================================

module.exports = new DispostionHelper();

