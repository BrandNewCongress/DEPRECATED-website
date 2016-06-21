/**
 * @fileoverview Provides a backwards-compatible adapter for serving the pages which used to be on
 * brandnewcongress.github.io locally. Temporary solution until https://github.com/BrandNewCongress/website/issues/1
 * is complete.
 */

import fs from 'fs'
import path from 'path'

export const SITE_DIR = path.resolve(__dirname, '..', '..', 'static-site')
export default function (req, res, next) {
  const { name: pathname } = path.parse(req.originalUrl)
  const possibleStaticPath = path.join(SITE_DIR, `${pathname}.html`)
  fs.stat(possibleStaticPath, err => {
    const fileExists = !err
    if (fileExists) {
      // Make it more difficult for developers to create errors by putting the headers and footers in one place.

      var header_path = path.join(SITE_DIR, `header.html`)
      var footer_path = path.join(SITE_DIR, `footer.html`)
      var header = fs.readFileSync(header_path, 'utf8');
      var page = fs.readFileSync(possibleStaticPath, 'utf8');
      var footer = fs.readFileSync(footer_path, 'utf8');
      if (pathname == "home") { var header = ""; var footer = "";} // No custom header or footer for the homepage
      res.send(header + page + footer);
      //res.sendFile(possibleStaticPath)
    } else {
      // We simply continue and allow express's default 404 handler to kick in.
      next()
    }
  })
}
