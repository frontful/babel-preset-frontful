import path from 'path'
import fs from 'fs-extra'
import find from 'find'
import crypto from 'crypto'

export default class Hash {
  constructor() {
    this.value = ''
    this.file = path.resolve(process.cwd(), '.hash')
    fs.ensureFileSync(this.file)
    this.read()
  }

  read() {
    this.value = fs.readFileSync(this.file, 'utf8')
    return this.value
  }

  changed() {
    return this.generate() !== this.value
  }

  generate() {
    const files = find.fileSync(/^((?!(\/(\.hash|npm-debug\.log|yarn-error\.log|\.git|node_modules|build|yarn\.lock)(\/|$))).)*$/i, process.cwd())
    const hash = crypto.createHash('sha1')

    files.forEach(function(file) {
      hash.write(file + fs.readFileSync(file, 'utf8'))
    })

    return hash.digest('base64')
  }

  update() {
    this.write(this.generate())
  }

  write(hash) {
    fs.writeFileSync(this.file, hash)
    this.value = hash
  }
}