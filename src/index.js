import SVGO from 'svgo'
import { toJson, toXml } from 'xml2json'

export default class SvgSprite {
  static defaults = {
    fileName: 'sprite.svg',
    extensions: ['.svg'],
    svgoConfig: {}
  }

  constructor(options = {}) {
    this.options = { ...SvgSprite.defaults, ...options }
  }

  apply(compiler) {
    compiler.plugin('after-compile', (compilation, done) => {
      const opts = this.options
      const regx = new RegExp(`(?:${opts.extensions.join('|')})$`)
      const svgo = new SVGO(opts.svgoConfig)
      const svgs = {}

      Object.keys(compilation.assets).forEach(file => {
        if (!regx.test(file)) return
        svgs[file] = compilation.assets[file].source()
        delete compilation.assets[file]
      })

      const symbols = Object.keys(svgs).map(file => (
        new Promise(resolve => {
          const id = file.split('.').shift()
          const source = svgs[file].toString('utf-8')

          svgo.optimize(source, result => {
            const json = toJson(result.data, { object: true })
            resolve({ ...json.svg, id, xmlns: undefined })
          })
        })
      ))

      Promise.all(symbols).then(symbol => {
        const sprite = { svg: { symbol, xmlns: 'http://www.w3.org/2000/svg' } }
        const output = `<?xml version="1.0" encoding="utf-8"?>${toXml(sprite)}`

        compilation.assets[opts.fileName] = {
          size: () => output.length,
          source: () => output
        }

        done()
      })
    })
  }
}
