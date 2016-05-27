import easings from './easings'
import AnimationFrame from 'animation-frame'
const animationFrame = new AnimationFrame()

const DEFAULT_ANIMATION = 'easeInQuad'
const LIB_NAME = 'scrollto-with-animation'
const URL_GITHUB = 'https://github.com/davesnx/scrollToWithAnimation'
const TRANSITION_NOT_FOUND = `${LIB_NAME}: Transition not found - ${URL_GITHUB}`
const ANIMATION_NOT_VALID = `${LIB_NAME}: callback transition don't look like a valid equation - ${URL_GITHUB}`
const TRANSITION_NOT_VALID = `${LIB_NAME}: Transition isn't string or Function - ${URL_GITHUB}`

const _document = typeof document !== 'undefined' ? document : {}
const _window = typeof window !== 'undefined' ? window : {}

const findAnimation = (transition = DEFAULT_ANIMATION) => {
  var animation = easings[transition]
  if (animation === undefined) {
    throw new Error(TRANSITION_NOT_FOUND)
  }
  return animation
}

const defineAnimation = (transition) => {
  if (transition.length !== 4) {
    throw new TypeError(ANIMATION_NOT_VALID)
  }
  return transition
}

const scrollToWithAnimation = (
  element = _document,
  direction = 'scrollTop',
  to = 0,
  duration = 100,
  transition = DEFAULT_ANIMATION,
  callback
) => {
  let start = direction === 'scrollTop' ? element.scrollTop : element.scrollLeft
  let change = to - start
  let animationStart = +new Date()
  let animating = true
  let lastpos = null
  let eq = null

  if (typeof transition === 'string' || transition === null) {
    eq = findAnimation(transition)
  } else if (typeof transition === 'function') {
    eq = defineAnimation(transition)
  } else {
    throw new TypeError(TRANSITION_NOT_VALID)
  }

  const animateScroll = () => {
    if (!animating) {
      return
    }
    animationFrame.request(animateScroll)
    const now = +new Date()
    const val = Math.floor(eq(now - animationStart, start, change, duration))
    if (lastpos) {
      if (lastpos === element[direction]) {
        lastpos = val
        element[direction] = val
      } else {
        animating = false
      }
    } else {
      lastpos = val
      element[direction] = val
    }
    if (now > animationStart + duration) {
      element[direction] = to
      animating = false
      if (callback) {
        callback()
      }
    }
  }
  animationFrame.request(animateScroll)
}

// Publish public method in window
_window.scrollToWithAnimation = scrollToWithAnimation

export default scrollToWithAnimation
export {animationFrame}
