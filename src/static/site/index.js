import path from 'path'
import fs from 'fs'

const staticSite = {}
const StaticDirectory = path.join(process.cwd(), 'src/static/site')
fs.readdirSync(StaticDirectory).forEach((file) => {
  const fileParts = file.split('.')
  if (fileParts.pop() === 'md') {
    const staticFileName = fileParts.join('.')
    staticSite[staticFileName] = fs.readFileSync(path.join(StaticDirectory, file), 'utf-8')
  }
})

export default staticSite
