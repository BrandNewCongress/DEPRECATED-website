/* ~/www/project-x/version.js */
var fs = require('fs')
var Version = require("node-version-assets");
var mapReplacer = new Version({
    assets: ['build/frontend/assets/js/app.js.map'],
    grepFiles: ['build/frontend/assets/js/app.js']
})

mapReplacer.run(function() {
  // For some reason the map replacer doesn't work
  var newAppJsMapFile = null;
  var assets = fs.readdirSync('build/frontend/assets/js')
  assets.forEach(function(assetName) {
    if (assetName.match(/^app\.js\..*\.map$/))
      newAppJsMapFile = assetName
  })
  var appJsContents = fs.readFileSync('build/frontend/assets/js/app.js', 'utf8')

  var results = appJsContents.replace('app.js.map', newAppJsMapFile)
  fs.writeFileSync('build/frontend/assets/js/app.js', results, 'utf8')

  var assetReplacer = new Version({
    assets: ['build/frontend/assets/js/app.js'],
    grepFiles: ['build/frontend/index.html']
  });
  assetReplacer.run()
})
