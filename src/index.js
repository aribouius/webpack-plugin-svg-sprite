import SVGO from 'svgo'
import { toJson, toXml } from 'xml2json'

export default class SvgSprite {
  static defaults = {
    fileName: 'sprite.svg',
    extensions: ['.svg'],
    svgoConfig: {},
    xmlDeclaration: true
  }

  constructor(options = {}) {
    this.options = { ...SvgSprite.defaults, ...options }
  }

  apply(compiler) {

    compiler.plugin('compile', (compilation) => {
      console.log('======> compile')
    })

    compiler.plugin('make', (compilation, callback) => {
      console.log('======> make')
      callback()
    })

    compiler.plugin('after-compile', (compilation, callback) => {
      console.log('======> after-compile')
      callback()
    })

    compiler.plugin('emit', (compilation, callback) => {
      console.log('======> emit')
      callback()
    })

    compiler.plugin('after-emit', (compilation, callback) => {
      console.log('======> after-emit')
      callback()
    })

    compiler.plugin('done', (compilation) => {
      console.log('======> done')
    })

    compiler.plugin('compilation', (compilation) => {
      console.log('======> compilation')

      compilation.plugin('seal', () => {
        console.log('======> seal')
        compilation.modules.forEach(module => {
          if (module.resource && module.resource.match(/\.svg$/)) {
            //console.log(module)
          }
        })
      })

      compilation.plugin('optimize', () => {
        console.log('======> optimize')
      })

      compilation.plugin('optimize-chunk-assets', (chunks, callback) => {
        console.log('======> optimize-chunk-assets')
        //console.log(compilation.assets)
        callback()
      })
    })

    compiler.plugin('this-compilation', (compilation) => {
      console.log('======> this-compilation')
      compilation.plugin('optimize-assets', (assets, callback) => {
        console.log('======> optimize-assets')
        callback()
      })
    })



    /*
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
        const sprite = toXml({ svg: { symbol, xmlns: 'http://www.w3.org/2000/svg' } })
        const output = opts.xmlDeclaration ? `<?xml version="1.0" encoding="utf-8"?>${sprite}` : sprite

        compilation.assets[opts.fileName] = {
          size: () => output.length,
          source: () => output
        }

        done()
      })
    })
    */
  }
}
