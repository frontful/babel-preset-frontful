import PackageJSON from './utils/PackageJSON'
import chalk from 'chalk'
import deploy from './utils/deploy'
import path from 'path'

const sourcePath = process.cwd()
const targetPath = path.resolve(sourcePath, 'build')

require('./build')

deploy(targetPath)

const version = new PackageJSON(sourcePath).bump()

console.log(chalk.green.bold(`Package deployed as version ${version}`))
