import easings from './easings'
import AnimationFrame from 'animation-frame'

const animationFrame = new AnimationFrame()
const DEFAULT_ANIMATION = 'easeInQuad'

class scrollerto {

  static findAnimation (transition = DEFAULT_ANIMATION) {
    var animation = easings[transition]
    if (animation === undefined) {
      throw new Error('scrollerto: Transition not found - https://github.com/davesnx/scrollToWithAnimation')
    }
    return animation
  }

  static defineAnimation (transition) {
    if (transition.length !== 4) {
      throw new TypeError('scrollerto: callback transition don\'t look like a valid equation - https://github.com/davesnx/scrollToWithAnimation')
    }
    return transition
  }

  static scrollToWithAnimation (element, to, duration, transition, callback) {
    let start = element.scrollTop
    let change = to - start
    let animationStart = +new Date()
    let animating = true
    let lastpos = null
    let eq = null

    if (typeof transition === 'string' || transition === null) {
      eq = scrollerto.findAnimation(transition)
    } else if (typeof transition === 'function') {
      eq = scrollerto.defineAnimation(transition)
    } else {
      throw new TypeError('scrollerto: Transition isn\'t string or Function - https://github.com/davesnx/scrollToWithAnimation')
    }

    const animateScroll = function () {
      if (!animating) {
        return
      }
      animationFrame.request(animateScroll)
      let now = +new Date()
      let val = Math.floor(eq(now - animationStart, start, change, duration))
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
  window.scrollerto = scrollerto.scrollToWithAnimation
}

export default scrollerto
