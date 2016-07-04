import path from 'path'
import fs from 'fs'

const StaticDirectory = path.join(process.cwd(), 'src/static/email')
const statics = {}
fs.readdirSync(StaticDirectory).forEach((file) => {
  const fileParts = file.split('.')
  if (fileParts.pop() === 'mustache') {
    const staticFileName = fileParts.join('.')
    statics[staticFileName] = fs.readFileSync(path.join(StaticDirectory, file), 'utf-8')
  }
})

export default statics
