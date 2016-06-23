/**
 * @fileoverview Provides a backwards-compatible adapter for serving the pages which used to be on
 * brandnewcongress.github.io locally. Temporary solution until https://github.com/BrandNewCongress/website/issues/1
 * is complete.
 */

import fs from 'fs'
import path from 'path'

export const SITE_DIR = path.resolve(process.cwd(), 'src/static-site')
export default function (req, res, next) {
  const { name: pathname } = path.parse(req.originalUrl)
  const possibleStaticPath = path.join(SITE_DIR, `${pathname}.html`)
  fs.stat(possibleStaticPath, err => {
    const fileExists = !err
    if (fileExists) {
      res.sendFile(possibleStaticPath)
    } else {
      // We simply continue and allow express's default 404 handler to kick in.
      next()
    }
  })
}
