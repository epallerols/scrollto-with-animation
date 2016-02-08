import scrollto from './../src/index'

describe('#findAnimation', function () {
  beforeEach(function () {
    this.TO = 0
    this.DURATION = 100
    this.TRANSITION_OK = 'easeInOutQuad'
    this.TRANSITION_KO = 'flowInOutFly'
  })

  it(`to throw an exception when transition isn't correct`, function () {
    const func = () => scrollto(document, this.TO, this.DURATION, this.TRANSITION_KO)
    expect(func).toThrow()
  })

  it(`to not throw an exception when transition is correct`, function () {
    const func = () => scrollto(document, this.TO, this.DURATION, this.TRANSITION_OK)
    expect(func).not.toThrow()
  })
})
