import copy from './utils/copy'
import path from 'path'
import transpile from './utils/transpile'

const sourcePath = process.cwd()
const targetPath = path.resolve(sourcePath, 'build')

copy(sourcePath, targetPath)
transpile(targetPath)
