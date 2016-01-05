var easings = require('./easing')
var animationFrame = require('animation-frame')

;(function (window, easings, animationFrame) {
  var findAnimation = function (transition) {
    var animation = easings[transition]
    if (animation === undefined) {
      throw new Error('scrollToWithAnimation: Transition not found - https://github.com/davesnx/scrollToWithAnimation')
    }
    return animation
  }

  var defineAnimation = function (transition) {
    if (transition.length !== 4) {
      throw new TypeError("scrollToWithAnimation: callback transition don't look like a valid equation - https://github.com/davesnx/scrollToWithAnimation")
    }
    return transition
  }

  var scrollToWithAnimation = function (element, to, duration, transition, callback) {
    var start = element.scrollTop
    var change = to - start
    var animationStart = +new Date()
    var animating = true
    var lastpos = null
    var eq = null

    if (typeof transition === 'string') {
      eq = findAnimation(transition)
    } else if (typeof transition === 'function') {
      eq = defineAnimation(transition)
    } else if (transition === null) {
      eq = findAnimation('easeInQuad')
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

  if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = scrollToWithAnimation
  } else {
    window.scrollToWithAnimation = scrollToWithAnimation
  }
}(window, easings, animationFrame))
