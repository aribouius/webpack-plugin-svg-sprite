import path from 'path'
import webpack from 'webpack'

export default (plugin, done) => {
  const config = {
    entry: [
      path.join(__dirname, '..', 'files', 'icon.svg')
    ],
    output: {
      path: path.join(__dirname, '..', 'tmp'),
      filename: 'main.js'
    },
    plugins: [
      plugin
    ],
    module: {
      loaders: [
        {
          test: /\.svg$/,
          loader: 'file-loader?name=[name].svg'
        }
      ]
    }
  }
  return webpack(config, (error, stats) => {
    if (error) throw error
    const errors = stats.toJson().errors
    if (errors.length) throw new Error(errors[0])
    done()
  })
}
