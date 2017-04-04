'use strict';

const GlimmerApp = require('@glimmer/application-pipeline').GlimmerApp;
const Funnel = require('broccoli-funnel');
const MergeTrees = require('broccoli-merge-trees');

module.exports = function(defaults) {
  const app = new GlimmerApp(defaults, {
    // Add options here
  });

  const todoMVCStyles = new Funnel('node_modules', {
    files: [
      'todomvc-app-css/index.css',
      'todomvc-common/base.css',
    ],
  });

  return  new MergeTrees([app.toTree(), todoMVCStyles]);
};
