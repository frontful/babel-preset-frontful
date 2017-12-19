import PackageJSON from './utils/PackageJSON'
import chalk from 'chalk'
import deploy from './utils/deploy'
import Hash from './utils/Hash'
import path from 'path'

require('./build')

const hash = new Hash('build')

if (hash.changed()) {
  const sourcePath = process.cwd()
  const targetPath = path.resolve(sourcePath, 'build')

  deploy(targetPath)

  const version = new PackageJSON(sourcePath).bump()

  hash.update()

  console.log(chalk.green.bold(`Package deployed as version ${version}`))
}
else {
  console.log(chalk.yellow.bold(`Content not changed, deployment canceled`))
}
