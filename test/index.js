import del from 'del'
import path from 'path'
import chai, { expect } from 'chai'
import chaiFs from 'chai-fs'
import compile from './utils/compile'
import Plugin from '../src'

chai.use(chaiFs)

const tmpDir = path.join(__dirname, 'tmp')
const spritePath = (filename = 'sprite.svg') => (
  path.join(tmpDir, filename)
)

describe('SvgSprite', () => {
  const xmlRgx = /\<\?xml version="1.0" encoding="utf-8"\?\>/

  afterEach(done => {
    del([tmpDir]).then(() => done())
  })

  it('Generates a svg sprite', done => {
    compile(new Plugin(), () => {
      expect(spritePath()).to.be.a.file()
      done()
    })
  })

  it('Adds a xml declaration by default', done => {
    compile(new Plugin(), () => {
      expect(spritePath()).to.have.content.that.match(xmlRgx)
      done()
    })
  })

  it('Can be configured to not add a xml declaration', done => {
    compile(new Plugin({ xmlDeclaration: false }), () => {
      expect(spritePath()).to.not.have.content.that.match(xmlRgx)
      done()
    })
  })
})
