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
  afterEach(done => {
    del([tmpDir]).then(() => done())
  })

  it('Creates a sprite file', done => {
    compile(new Plugin(), () => {
      expect(spritePath()).to.be.a.file()
      done()
    })
  })
})
