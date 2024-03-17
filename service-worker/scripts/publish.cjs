const { execSync } = require("child_process")

execSync('rm -rf dist')
execSync('pnpm build')

const fs = require('fs')
const data = require('../package.json')

data.scripts = undefined
data.devDependencies = undefined
data.version = '0.0.1'

fs.writeFileSync('dist/package.json', JSON.stringify(data))
fs.copyFileSync('.npmrc', 'dist/.npmrc')

execSync('pnpm publish --no-git-checks', {
  cwd: 'dist',
})