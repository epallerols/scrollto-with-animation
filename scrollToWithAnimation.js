;(function (window) {
  var requestAnimFrame = (function () {
    return window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    function (callback) {
      window.setTimeout(callback, 1000 / 60)
    }
  })()

  var easings = {
    linearTween: function (t, b, c, d) {
      return c * t / d + b
    },
    easeInQuad: function (t, b, c, d) {
      t /= d
      return c * t * t + b
    },
    easeOutQuad: function (t, b, c, d) {
      t /= d
      return -c * t * (t - 2) + b
    },
    easeInOutQuad: function (t, b, c, d) {
      t /= d / 2
      if (t < 1) return c / 2 * t * t + b
      t--
      return -c / 2 * (t * (t - 2) - 1) + b
    },
    easeInCubic: function (t, b, c, d) {
      t /= d
      return c * t * t * t + b
    },
    easeOutCubic: function (t, b, c, d) {
      t /= d
      t--
      return c * (t * t * t + 1) + b
    },
    easeInOutCubic: function (t, b, c, d) {
      t /= d / 2
      if (t < 1) return c / 2 * t * t * t + b
      t -= 2
      return c / 2 * (t * t * t + 2) + b
    },
    easeInQuart: function (t, b, c, d) {
      t /= d
      return c * t * t * t * t + b
    },
    easeOutQuart: function (t, b, c, d) {
      t /= d
      t--
      return -c * (t * t * t * t - 1) + b
    },
    easeInOutQuart: function (t, b, c, d) {
      t /= d / 2
      if (t < 1) return c / 2 * t * t * t * t + b
      t -= 2
      return -c / 2 * (t * t * t * t - 2) + b
    },
    easeInQuint: function (t, b, c, d) {
      t /= d
      return c * t * t * t * t * t + b
    },
    easeOutQuint: function (t, b, c, d) {
      t /= d
      t--
      return c * (t * t * t * t * t + 1) + b
    },
    easeInOutQuint: function (t, b, c, d) {
      t /= d / 2
      if (t < 1) return c / 2 * t * t * t * t * t + b
      t -= 2
      return c / 2 * (t * t * t * t * t + 2) + b
    },
    easeInSine: function (t, b, c, d) {
      return -c * Math.cos(t / d * (Math.PI / 2)) + c + b
    },
    easeOutSine: function (t, b, c, d) {
      return c * Math.sin(t / d * (Math.PI / 2)) + b
    },
    easeInOutSine: function (t, b, c, d) {
      return -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b
    },
    easeInExpo: function (t, b, c, d) {
      return c * Math.pow(2, 10 * (t / d - 1)) + b
    },
    easeOutExpo: function (t, b, c, d) {
      return c * (-Math.pow(2, -10 * t / d) + 1) + b
    },
    easeInOutExpo: function (t, b, c, d) {
      t /= d / 2
      if (t < 1) return c / 2 * Math.pow(2, 10 * (t - 1)) + b
      t--
      return c / 2 * (-Math.pow(2, -10 * t) + 2) + b
    },
    easeInCirc: function (t, b, c, d) {
      t /= d
      return -c * (Math.sqrt(1 - t * t) - 1) + b
    },
    easeOutCirc: function (t, b, c, d) {
      t /= d
      t--
      return c * Math.sqrt(1 - t * t) + b
    },
    easeInOutCirc: function (t, b, c, d) {
      t /= d / 2
      if (t < 1) return -c / 2 * (Math.sqrt(1 - t * t) - 1) + b
      t -= 2
      return c / 2 * (Math.sqrt(1 - t * t) + 1) + b
    }
  }

  var findAnimation = function (transition) {
    var animation = easings[transition]
    if (animation === undefined) {
      throw new Error('scrollToWithAnimation: Transition not found - https://github.com/davesnx/scrollToWithAnimation')
    } else {
      return animation
    }
  }

  var defineAnimation = function (transition) {
    if (transition.length !== 4) {
      throw new TypeError('scrollToWithAnimation: callback transition don\'t look like a valid equation - https://github.com/davesnx/scrollToWithAnimation')
    } else {
      return transition
    }
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
    } else {
      throw new TypeError('scrollToWithAnimation: Transition isn\'t string or Function - https://github.com/davesnx/scrollToWithAnimation')
    }

    var animateScroll = function () {
      if (!animating) {
        return
      }
      requestAnimFrame(animateScroll)
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
    requestAnimFrame(animateScroll)
  }

  if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = scrollToWithAnimation
  } else {
    window.scrollToWithAnimation = scrollToWithAnimation
  }
})(window)
