import easings from './easings'
import AnimationFrame from 'animation-frame'

const animationFrame = new AnimationFrame()
const DEFAULT_ANIMATION = 'easeInQuad'

const LIB_NAME = 'scrollto-with-animation'
const URL_GITHUB = 'https://github.com/davesnx/scrollToWithAnimation'
const TRANSITION_NOT_FOUND = `${LIB_NAME}: Transition not found - ${URL_GITHUB}`
const ANIMATION_NOT_VALID = `${LIB_NAME}: callback transition don't look like a valid equation - ${URL_GITHUB}`
const TRANSITION_NOT_VALID = `${LIB_NAME}: Transition isn't string or Function - ${URL_GITHUB}`

class scrollToWithAnimation {

  static findAnimation (transition = DEFAULT_ANIMATION) {
    var animation = easings[transition]
    if (animation === undefined) {
      throw new Error(TRANSITION_NOT_FOUND)
    }
    return animation
  }

  static defineAnimation (transition) {
    if (transition.length !== 4) {
      throw new TypeError(ANIMATION_NOT_VALID)
    }
    return transition
  }

  static do (element = document, to = 0, duration = 100, transition = DEFAULT_ANIMATION, callback) {
    let start = element.scrollTop
    let change = to - start
    let animationStart = +new Date()
    let animating = true
    let lastpos = null
    let eq = null

    if (typeof transition === 'string' || transition === null) {
      eq = scrollToWithAnimation.findAnimation(transition)
    } else if (typeof transition === 'function') {
      eq = scrollToWithAnimation.defineAnimation(transition)
    } else {
      throw new TypeError(TRANSITION_NOT_VALID)
    }

    const animateScroll = function () {
      if (!animating) {
        return
      }
      animationFrame.request(animateScroll)
      const now = +new Date()
      const val = Math.floor(eq(now - animationStart, start, change, duration))
      if (lastpos) {
        if (lastpos === element.scrollTop) {
          lastpos = val
          element.scrollTop = val
        } else {
          animating = false
        }
      } else {
        lastpos = val
        element.scrollTop = val
      }
      if (now > animationStart + duration) {
        element.scrollTop = to
        animating = false
        if (callback) {
          callback()
        }
      }
    }
    animationFrame.request(animateScroll)
  }

}

if (window) {
  window.scrollToWithAnimation = scrollToWithAnimation.do
}

export default scrollToWithAnimation.do

// Export this for unit testing purposes
export {
  animationFrame
}
