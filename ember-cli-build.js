'use strict';

const GlimmerApp = require('@glimmer/application-pipeline').GlimmerApp;
const MergeTrees = require('broccoli-merge-trees');
const Concat = require('broccoli-concat');

module.exports = function(defaults) {
  const app = new GlimmerApp(defaults, {
    // Add options here
  });

  const styles = Concat('node_modules', {
    inputFiles: [
      'todomvc-app-css/index.css',
      'todomvc-common/base.css',
    ],
    outputFile: 'app.css',
  });

  return new MergeTrees([app.toTree(), styles], { overwrite: true });
};
