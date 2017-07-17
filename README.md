# <a href="https://github.com/frontful/babel-preset-frontful"><img heigth="75" src="http://www.frontful.com/assets/packages/babel-preset.png" alt="Babel Preset Frontful" /></a>

[`babel-preset-frontful`](https://github.com/frontful/babel-preset-frontful) is packaged provider of [Babel](https://babeljs.io/) setup and package build and deployment utilities. It is default transpiler setup and build instrument for [Frontful](https://github.com/frontful) infrastructure

### Installation

```shell
# Using yarn
yarn add babel-preset-frontful
# or npm
npm install -s babel-preset-frontful
```

### Integration

#### Package build and deployment

`babel-preset-frontful` is part of [_Package development helper_](https://github.com/frontful/frontful-common#package-development-helper) and apart from Babel preset it provides basic build and deployment instrumentation for packages.

When installed `babel-preset-frontful` add script to package projects `node_modules/.bin` witch can be used from `scripts` section of `package.json`

```javascript
// package.json
{
  "scripts": {
    "build": "babel-preset-frontful build",
    "deploy": "babel-preset-frontful deploy"
  }
}
```
##### Build
```shell
# Using yarn
yarn build
# or npm
npm run build
```
`babel-preset-frontful build` script has no opinions about your packages structure. It takes all files and folders excluding `/node_modules` and copies all files to `/build` folder and transpiles eatch suported file e.g `.js` and `.jsx` usgin its configuration.

##### Deploy
```shell
# Using yarn
yarn deploy
# or npm
npm run deploy
```
`babel-preset-frontful deploy` scripts builds packages using `babel-preset-frontful build` and deploys `/build` folders content to [Npm registry](https://www.npmjs.com/).  
`deploy` script does not handle authentification to npm, you should sign in and have permission to deploy prior using `deploy` script e.g. using `npm login` command or `.npmrc` file.  
`deploy` script gives few extra features
  - Package version will be automaticaly incremented
  - Package won't be deployed if files have not changed. This is ensured by generating and checniing packages content sha1 hash in `.hash` file
  - Package is locked by automaticaly setting property `private` to `true|false`, this is to prevent accidental deployment of package using default `npm publish` or `yarn publish` scripts.

#### Instructions for editor and IDE

`babel-preset-frontful` returns preconfigured Babel setup and can be used as any other preset in `.babelrc`. Keep in mind that Frontful infrastructure does not use `.babelrc`, but it can be useful to for example instruct [Atom](https://atom.io/)'s [source-preview](https://atom.io/packages/source-preview) plugin.

#### Configuration
`babel-preset-frontful` uses [`frontful-config`](https://github.com/frontful/frontful-config) as configuration provider, read [`frontful-config` readme](https://github.com/frontful/frontful-config) for more details on configuration approach in Frontful infrastructure

`babel-preset-frontful` can be configured by setting properties from [schema](https://github.com/frontful/babel-preset-frontful/blob/master/config/index.default.js) to `frontful.babel` in `package.json`. Bellow are two configuration examples

  - Add `frontful.babel.server.options` object to `package.json`. Keep in mind that these options are not Babel options but ones accepted by [babel-preset-frontful/provider/server](https://github.com/frontful/babel-preset-frontful/blob/master/provider/server/config.development.js) in this case
  ```javascript
  // package.json
  {
    "frontful": {
      "babel": {
        "server": {
          "options": {
            ...
          }
        }
      }
    }
  }
  ```
  - Create ES5 `config.babel.js` file, and reference this file in `frontful.babel` in `package.json`
  ```javascript
  // config.eslint.js
  const provider = require('babel-preset-frontful/provider/server')
  module.exports = {
    server: {
      config: provider({
        ...
      })
    }
  }
  ```
  ```javascript
  // package.json
  {
    "frontful": {
      "babel": "./config.babel.js"
    }
  }
  ```
