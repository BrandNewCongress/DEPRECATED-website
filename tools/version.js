/* ~/www/project-x/version.js */
var fs = require('fs')
var Version = require("node-version-assets");
var mapReplacer = new Version({
  assets: ['build/assets/js/bundle.js.map'],
  grepFiles: ['build/assets/js/bundle.js']
})

mapReplacer.run(function() {
  // For some reason the map replacer doesn't work
  var newAppJsMapFile = null;
  var assets = fs.readdirSync('build/assets/js')
  assets.forEach(function(assetName) {
    if (assetName.match(/^bundle\.js\..*\.map$/))
      newAppJsMapFile = assetName
  })
  var appJsContents = fs.readFileSync('build/assets/js/bundle.js', 'utf8')

  var results = appJsContents.replace('bundle.js.map', newAppJsMapFile)
  fs.writeFileSync('build/assets/js/bundle.js', results, 'utf8')

  var assetReplacer = new Version({
    assets: ['build/assets/js/bundle.js']  });
  assetReplacer.run()
})
