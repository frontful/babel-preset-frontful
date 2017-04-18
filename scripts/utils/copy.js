import fs from 'fs'
import cpx from 'cpx'
import path from 'path'
import rimraf from 'rimraf'

export default function copy(sourcePath, targetPath) {
  rimraf.sync(targetPath)
  const items = fs.readdirSync(sourcePath)
  items.forEach((name) => {
    if (['node_modules', '.git', 'build'].indexOf(name) === -1) {
      const source = path.resolve(sourcePath, name)

      if (fs.statSync(source).isDirectory()) {
        cpx.copySync(source+'/**', path.resolve(targetPath, name))
      }
      else {
        cpx.copySync(source, targetPath)
      }
    }
  })
}
