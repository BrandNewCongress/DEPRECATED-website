import path from 'path'
import fs from 'fs'

const TemplateDirectory = path.join(process.cwd(), 'src/templates/email')
const templates = {}
fs.readdirSync(TemplateDirectory).forEach((file) => {
  let fileParts = file.split('.')
  if (fileParts.pop() === 'mustache') {
    const templateName = fileParts.join('.')
    templates[templateName] = fs.readFileSync(path.join(TemplateDirectory, file), 'utf-8')
  }
})

export default templates