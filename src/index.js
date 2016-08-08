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

  if (callback) {
    const timeout = setTimeout(() => {
      callbackWrapper()
    }, duration + 1)

    const callbackWrapper = () => {
      clearTimeout(timeout)
      callback()
    }
  }

  const animateScroll = () => {
    if (!isAnimating) {
      return
    }

    animationFrame.request(animateScroll)
    const now = +new Date()
    const newScrollPosition = Math.floor(eq(now - animationStartTime, start, distance, duration))

    if (lastScrolledPosition) {
      if (lastScrolledPosition === element[direction]) {
        lastScrolledPosition = newScrollPosition
        element[direction] = newScrollPosition
      } else {
        isAnimating = false
      }
    } else {
      lastScrolledPosition = newScrollPosition
      element[direction] = newScrollPosition
    }

    if (now > animationStartTime + duration) {
      element[direction] = to
      isAnimating = false
      if (callback) {
        callbackWrapper()
      }
    }
  }
  animationFrame.request(animateScroll)
}

// Publish public method in window
_window.scrollToWithAnimation = scrollToWithAnimation

export default scrollToWithAnimation
export {animationFrame}
