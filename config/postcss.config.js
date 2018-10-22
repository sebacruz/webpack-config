const path = require('path')
const { existsSync } = require('fs')

module.exports = () => {
  const projectCssnanoConfigFile = path.resolve(
    process.cwd(),
    'cssnano.config.js'
  )
  const cssnanoConfig = {}

  if (!existsSync(projectCssnanoConfigFile)) {
    cssnanoConfig.configFile = path.resolve(__dirname, 'cssnano.config.js')
  }

  return {
    plugins: {
      'postcss-import': {},
      'postcss-preset-env': {},
      cssnano: cssnanoConfig
    }
  }
}
