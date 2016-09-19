import easings from './easings'
import AnimationFrame from 'animation-frame'
const animationFrame = new AnimationFrame()

const DEBUG = process.env.NODE_ENV || true
const DEFAULT_ANIMATION = 'easeInQuad'
const LIB_NAME = 'scrollto-with-animation'
const GITHUB_URL = 'https://github.com/davesnx/scrollToWithAnimation'
const TRANSITION_NOT_FOUND = `${LIB_NAME}: Transition not found - ${GITHUB_URL}`
const ANIMATION_NOT_VALID = `${LIB_NAME}: callback transition don't look like a valid equation - ${GITHUB_URL}`
const TRANSITION_NOT_VALID = `${LIB_NAME}: Transition isn't string or Function - ${GITHUB_URL}`

const ANIMATION_CANCEL = 'animation-cancel'
const ANIMATION_END = 'animation-end'

const _document = typeof document !== 'undefined' ? document : {}
const _window = typeof window !== 'undefined' ? window : {}

const findAnimation = (transition = DEFAULT_ANIMATION) => {
  var animation = easings[transition]
  if (animation === undefined && DEBUG) {
    throw new Error(TRANSITION_NOT_FOUND)
  }
  return animation
}

const defineAnimation = (transition) => {
  if (transition.length !== 4 && DEBUG) {
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
  let distance = to - start
  let animationStartTime = +new Date()
  let isAnimating = true
  let lastScrolledPosition = null
  let transitionFunction = null

  if (typeof transition === 'string' || transition === null) {
    transitionFunction = findAnimation(transition)
  } else if (typeof transition === 'function') {
    transitionFunction = defineAnimation(transition)
  } else {
    throw new TypeError(TRANSITION_NOT_VALID)
  }

  const animateScroll = () => {
    const now = +new Date()
    const newScrollPosition = Math.floor(
      transitionFunction(now - animationStartTime, start, distance, duration)
    )

    if (!lastScrolledPosition || to !== element[direction]) {
      element[direction] = newScrollPosition
      lastScrolledPosition = newScrollPosition
    } else {
      isAnimating = false
      if (callback) {
        callback(ANIMATION_CANCEL)
      }
    }

    if (now > animationStartTime + duration) {
      element[direction] = to
      isAnimating = false
      if (callback) {
        callback(ANIMATION_END)
      }
    }

    if (isAnimating) {
      animationFrame.request(animateScroll)
    }
  }
  animationFrame.request(animateScroll)
}

// Publish public method in window
if (_window !== {}) {
  _window.scrollToWithAnimation = scrollToWithAnimation
}

export default scrollToWithAnimation
export {animationFrame}
