import chalk from 'chalk'
import fs from 'fs-extra'
import path from 'path'
import tmp from 'tmp'
import transpile from './utils/transpile'

const temp = tmp.dirSync({
  unsafeCleanup: true,
})

const sourcePath = process.cwd()
const tempPath = temp.name
const targetPath = path.resolve(sourcePath, 'build')

fs.removeSync(targetPath)

fs.copySync(sourcePath, tempPath, {
  filter: (filename) => {
    return /^((?!(\/(node_modules|build)(\/|$))).)*$/i.test(filename)
  },
})

fs.copySync(tempPath, targetPath)

temp.removeCallback()

transpile(targetPath)

console.log(chalk.green.bold('Package built'))
