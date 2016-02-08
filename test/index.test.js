import scrollto from './../src/index'

const TO = 0
const DURATION = 100
const TRANSITION_OK = 'easeInOutQuad'
const TRANSITION_KO = 'flowInOutFly'
const CB = function () {}

describe('#findAnimation', function () {
  it(`to throw an exception when transition isn't correct`, function () {
    const func = () => scrollto(document, TO, DURATION, TRANSITION_KO)
    expect(func).toThrow()
  })

  it(`to not throw an exception when transition is correct`, function () {
    const func = () => scrollto(document, TO, DURATION, TRANSITION_OK)
    expect(func).not.toThrow()
  })
})
