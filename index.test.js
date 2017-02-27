import scrollTo from './index.js'

const D = document
const TO = 0
const DURATION = 100
const DIRECTION = 'scrollTop'
const TRANSITION_OK = 'easeInOutQuad'
const TRANSITION_KO = 'flowInOutFly'
const TRANSITION_EQ_OK = (a, b, c, d) => a + b + c + d
const TRANSITION_EQ_KO = () => {}

// const simulateScroll = (DOMNode) => {
//   var evt = window.document.createEvent('UIEvents')
//   evt.initUIEvent('scroll', true, true, window, 1)
//   DOMNode.dispatchEvent(evt)
// }

describe(`#findAnimation`, () => {
  it(`should throw an exception with an incorrect transition`, () => {
    const func = () => scrollTo(D, DIRECTION, TO, DURATION, TRANSITION_KO)
    expect(func).toThrow()
  })

  it(`shouldn't throw an exception with a correct transition `, () => {
    const func = () => scrollTo(D, DIRECTION, TO, DURATION, TRANSITION_OK)
    expect(func).not.toThrow()
  })
})

describe(`#defineAnimation`, () => {
  it(`should throw an exception with an easing is not correct`, () => {
    const func = () => scrollTo(D, DIRECTION, TO, DURATION, TRANSITION_EQ_KO)
    expect(func).toThrow()
  })

  it(`shouldn't throw an exception if easing is is correct `, () => {
    const func = () => scrollTo(D, DIRECTION, TO, DURATION, TRANSITION_EQ_OK)
    expect(func).not.toThrow()
  })
})

jest.mock('animation-frame')

rAF.request = () => jest.fn()
rAF.cancel = () => jest.fn()

describe(`#scrollToWithAnimation`, () => {
  it(`should call animationFrame.request`, () => {
    scrollTo()
    expect(rAF.request).toHaveBeenCalled()
  })

  it(`should call the callback at the end`, () => {
    scrollTo(D, TO, DURATION, TRANSITION_OK, cbSpy)
    expect(rAF.request).toHaveBeenCalled()
  })
})
