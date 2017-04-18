import PackageJSON from './utils/PackageJSON'
import deploy from './utils/deploy'
import path from 'path'

const sourcePath = process.cwd()
const targetPath = path.resolve(sourcePath, 'build')

require('./build')

deploy(targetPath)

new PackageJSON(sourcePath).bump()
