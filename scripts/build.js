import chalk from 'chalk'
import fs from 'fs-extra'
import path from 'path'
import transpile from './utils/transpile'

const sourcePath = process.cwd()
const targetPath = path.resolve(sourcePath, 'build')

fs.removeSync(targetPath)

fs.copySync(sourcePath, targetPath, {
  filter: (filename) => {
    return /^((?!(\/(node_modules|build)(\/|$))).)*$/i.test(filename)
  }
})

transpile(targetPath)

console.log(chalk.green.bold('Package built'))
