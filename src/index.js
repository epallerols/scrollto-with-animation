import easings from './easings'
import AnimationFrame from 'animation-frame'

const animationFrame = new AnimationFrame()
const DEFAULT_ANIMATION = 'easeInQuad'

class scrollToWithAnimation {

  static findAnimation (transition = DEFAULT_ANIMATION) {
    var animation = easings[transition]
    if (animation === undefined) {
      throw new Error('scrollTo-with-animation: Transition not found - https://github.com/davesnx/scrollToWithAnimation')
    }
    return animation
  }

  static defineAnimation (transition) {
    if (transition.length !== 4) {
      throw new TypeError('scrollTo-with-animation: callback transition don\'t look like a valid equation - https://github.com/davesnx/scrollToWithAnimation')
    }
    return transition
  }

  static do (element, to, duration, transition, callback) {
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
      throw new TypeError('scrollTo-with-animation: Transition isn\'t string or Function - https://github.com/davesnx/scrollToWithAnimation')
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

export default scrollToWithAnimation
