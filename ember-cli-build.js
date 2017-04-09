'use strict';

const GlimmerApp = require('@glimmer/application-pipeline').GlimmerApp;
const MergeTrees = require('broccoli-merge-trees');
const Concat = require('broccoli-concat');
const Funnel = require('broccoli-funnel');

class CustomApp extends GlimmerApp {
  cssTree() {
    const cssTree = super.cssTree();

    const styles = new Funnel('node_modules', {
      files: ['todomvc-app-css/index.css']
    });

    return Concat(new MergeTrees([cssTree, styles]), {
      outputFile: 'app.css'
    });
  }
}

module.exports = function(defaults) {
  const app = new CustomApp(defaults);

  const vendorScripts = Concat('node_modules', {
    inputFiles: ['todomvc-common/base.js'],
    outputFile: 'vendor.js',
  });

  return new MergeTrees([
    app.toTree(),
    vendorScripts
  ], { overwrite: true });
}
