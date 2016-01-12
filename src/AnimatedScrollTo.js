import easings from './easings'
import animationFrame from 'animation-frame'

const DEFAULT_ANIMATION = 'easeInQuad'

class AnimatedScrollTo {
  static findAnimation (transition = DEFAULT_ANIMATION) {
    var animation = easings[transition]
    if (animation === undefined) {
      throw new Error('scrollToWithAnimation: Transition not found - https://github.com/davesnx/scrollToWithAnimation')
    }
    return animation
  }

  static defineAnimation (transition) {
    if (transition.length !== 4) {
      throw new TypeError("scrollToWithAnimation: callback transition don't look like a valid equation - https://github.com/davesnx/scrollToWithAnimation")
    }
    return transition
  }

  static scrollToWithAnimation (element, to, duration, transition, callback) {
    var start = element.scrollTop
    var change = to - start
    var animationStart = +new Date()
    var animating = true
    var lastpos = null
    var eq = null

    if (typeof transition === 'string' || transition === null) {
      eq = AnimatedScrollTo.findAnimation(transition)
    } else if (typeof transition === 'function') {
      eq = AnimatedScrollTo.defineAnimation(transition)
    } else {
      throw new TypeError("scrollToWithAnimation: Transition isn't string or Function - https://github.com/davesnx/scrollToWithAnimation")
    }

    var animateScroll = function () {
      if (!animating) {
        return
      }
      animationFrame(animateScroll)
      var now = +new Date()
      var val = Math.floor(eq(now - animationStart, start, change, duration))
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
    animationFrame(animateScroll)
  }
}

if (window) {
  window.AnimatedScrollTo = AnimatedScrollTo.scrollToWithAnimation
}

export default AnimatedScrollTo
