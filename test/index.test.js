import scrollto, {animationFrame} from './../src/index'

const D = document
const TO = 0
const DURATION = 100
const TRANSITION_OK = 'easeInOutQuad'
const TRANSITION_KO = 'flowInOutFly'
const TRANSITION_EQ_OK = (a, b, c, d) => a + b + c + d
const TRANSITION_EQ_KO = () => {}

// const simulateScroll = (DOMNode) => {
//   var evt = window.document.createEvent('UIEvents')
//   evt.initUIEvent('scroll', true, true, window, 1)
//   DOMNode.dispatchEvent(evt)
// }

describe(`#findAnimation when you pass`, function () {
  it(`an incorrect transition should throw an exception`, function () {
    const func = () => scrollto(D, TO, DURATION, TRANSITION_KO)
    expect(func).toThrow()
  })

  it(`a correct transition shouldn't throw an exception`, function () {
    const func = () => scrollto(D, TO, DURATION, TRANSITION_OK)
    expect(func).not.toThrow()
  })
})

describe(`#defineAnimation when you pass an easing function`, function () {
  it(`that isn't correct should throw an exception`, function () {
    const func = () => scrollto(D, TO, DURATION, TRANSITION_EQ_KO)
    expect(func).toThrow()
  })

  it(`that is correct shouldn't throw an exception`, function () {
    const func = () => scrollto(D, TO, DURATION, TRANSITION_EQ_OK)
    expect(func).not.toThrow()
  })
})

describe(`#do the scrollto with animation`, function () {
  it(`should call animationFrame.request`, function () {
    animationFrame.request = jasmine.createSpy('animationFrameSpy')
    scrollto()
    expect(animationFrame.request).toHaveBeenCalled()
  })

//   it(`should call the callback at the end`, function () {
//     const cbSpy = jasmine.createSpy('cbSpy')
//     scrollto(D, TO, DURATION, TRANSITION_OK, cbSpy)
//     expect(cbSpy).toHaveBeenCalled()
//   })
})
