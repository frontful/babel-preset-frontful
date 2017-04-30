#!/usr/bin/env node
process.env.NODE_ENV = 'production'

require('babel-register')(require('../config/package'))

const command = process.argv[2]

switch(command) {
  case 'build': {
    require('../scripts/build')
    break
  }
  case 'deploy': {
    require('../scripts/deploy')
    break
  }
  default: {
  }
}
