/**
 * @fileoverview Hacky script which can be used to rewrite asset paths from files brought over from
 * brandnewcongress.github.io in a way that makes them diffable. Useful for re-importing
 * changed/added files if need be. To run, ensure you're in the root project directory and run
 * `node tools/rewrite-static-asset-paths.js`.
 */

/* eslint-disable */
'use strict';

const glob = require('glob');
const fs = require('fs');
const url = require('url');
const path = require('path');

glob.sync('static-site/*.html').forEach(function(filename) {
  console.log(`Processing ${filename}...`);
  var text = fs.readFileSync(filename, 'utf8');
  text = rewrite(text);
  fs.writeFileSync(filename, text, 'utf8');
  console.log(`Done processing ${filename}`);
});

function rewrite(text) {
  var attrRegex = /(href|src)(\s*)\=(\s*)(['"])(\/?assets\S+)\4/g;
  return text.replace(attrRegex, function(full, attr, lspace, rspace, quoteMark, val) {
    var parts = url.parse(val);
    var isExternalResource = Boolean(parts.protocol || parts.slashes || parts.host)
    if (isExternalResource) {
      // Don't replace the string.
      return arguments[arguments.length-1];
    }

    var pathparts = path.parse(parts.path);
    var relpath = path.relative(pathparts.root, pathparts.dir);
    var relpathparts = relpath.split('/');

    relpathparts[0] = 'static-assets';
    pathparts.root = '/';
    pathparts.dir = path.resolve(pathparts.root, relpathparts.join('/'));
    var reppath = path.format(pathparts);
    var replacement = `${attr}${lspace}=${rspace}${quoteMark}${reppath}${quoteMark}`;
    console.log('--- rewriting with', replacement);

    return replacement;
  });
}
