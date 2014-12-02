//==============================================================================
// Dependencies
//==============================================================================

var Parse = require('parse');
var _     = require('underscore');

var Slide = require('../models/slide');


//==============================================================================
// Collection
//==============================================================================

var SlideCollection = Parse.Collection.extend({
  model: Slide,

  /**
   * Example options
   * {
   *   composition: ['INTRO', '4G', 'MS365'], // Dictates content to show, order
   *   prefer: 'CAM' // Where multiple versions exist, prefer this
   * }
   */
  process: function(o) {
    var models;

    // First remove any slides that don't have a cID matching one in the
    // o.composition array
    models = this.filter(function(model) {
      return o.composition.indexOf(model.get('cID')) !== -1;
    });

    // Prefer content with specfied target
    // First group content by cID
    var groups = _(models).groupBy(function(model) {
      return model.get('cID');
    });
    models = _.map(groups, function(models, cID) {
      // If there is only one slide with a given cID, return that
      if (models.length === 1) { return models[0]; }
      // If there are multiple versions (one CAM, one FRAN, one generic) then
      // sort so content with the correct target is first, followed by generic
      // content, then content with the wrong target
      models = models.sort(function(a, b) {
        if (
          (a.get('target') === o.prefer && b.get('target') !== o.prefer) ||
          (!a.get('target') && b.get('target') !== o.prefer)
        ) { return -1; }
        if (
          (b.get('target') === o.prefer && a.get('target') !== o.prefer) ||
          (!b.get('target') && a.get('target') !== o.prefer)
        ) { return 1; }
        return 0;
      });
      // Return the most suitable content
      return models[0];
    });

    // Sort by order in o.composition
    models.sort(function(a, b) {
      var aIndex = o.composition.indexOf(a.get('cID'));
      var bIndex = o.composition.indexOf(b.get('cID'));
      return aIndex - bIndex;
    });

    // Finally, reset to our list of processed models
    this.reset(models);
  }
});


//==============================================================================
// Export
//==============================================================================

module.exports = SlideCollection;

