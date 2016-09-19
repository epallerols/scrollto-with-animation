'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.animationFrame = undefined;

var _easings = require('./easings');

var _easings2 = _interopRequireDefault(_easings);

var _animationFrame = require('animation-frame');

var _animationFrame2 = _interopRequireDefault(_animationFrame);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var animationFrame = new _animationFrame2.default();

var DEBUG = process.env.NODE_ENV || true;
var DEFAULT_ANIMATION = 'easeInQuad';
var LIB_NAME = 'scrollto-with-animation';
var GITHUB_URL = 'https://github.com/davesnx/scrollToWithAnimation';
var TRANSITION_NOT_FOUND = LIB_NAME + ': Transition not found - ' + GITHUB_URL;
var ANIMATION_NOT_VALID = LIB_NAME + ': callback transition don\'t look like a valid equation - ' + GITHUB_URL;
var TRANSITION_NOT_VALID = LIB_NAME + ': Transition isn\'t string or Function - ' + GITHUB_URL;

var ANIMATION_CANCEL = 'animation-cancel';
var ANIMATION_END = 'animation-end';

var _document = typeof document !== 'undefined' ? document : {};
var _window = typeof window !== 'undefined' ? window : {};

var findAnimation = function findAnimation() {
  var transition = arguments.length <= 0 || arguments[0] === undefined ? DEFAULT_ANIMATION : arguments[0];

  var animation = _easings2.default[transition];
  if (animation === undefined && DEBUG) {
    throw new Error(TRANSITION_NOT_FOUND);
  }
  return animation;
};

var defineAnimation = function defineAnimation(transition) {
  if (transition.length !== 4 && DEBUG) {
    throw new TypeError(ANIMATION_NOT_VALID);
  }
  return transition;
};

var scrollToWithAnimation = function scrollToWithAnimation() {
  var element = arguments.length <= 0 || arguments[0] === undefined ? _document : arguments[0];
  var direction = arguments.length <= 1 || arguments[1] === undefined ? 'scrollTop' : arguments[1];
  var to = arguments.length <= 2 || arguments[2] === undefined ? 0 : arguments[2];
  var duration = arguments.length <= 3 || arguments[3] === undefined ? 100 : arguments[3];
  var transition = arguments.length <= 4 || arguments[4] === undefined ? DEFAULT_ANIMATION : arguments[4];
  var callback = arguments[5];

  var start = direction === 'scrollTop' ? element.scrollTop : element.scrollLeft;
  var distance = to - start;
  var animationStartTime = +new Date();
  var isAnimating = true;
  var lastScrolledPosition = null;
  var transitionFunction = null;

  if (typeof transition === 'string' || transition === null) {
    transitionFunction = findAnimation(transition);
  } else if (typeof transition === 'function') {
    transitionFunction = defineAnimation(transition);
  } else {
    throw new TypeError(TRANSITION_NOT_VALID);
  }

  var animateScroll = function animateScroll() {
    var now = +new Date();
    var newScrollPosition = Math.floor(transitionFunction(now - animationStartTime, start, distance, duration));

    if (!lastScrolledPosition || to !== element[direction]) {
      element[direction] = newScrollPosition;
      lastScrolledPosition = newScrollPosition;
    } else {
      isAnimating = false;
      if (callback) {
        callback(ANIMATION_CANCEL);
      }
    }

    if (now > animationStartTime + duration) {
      element[direction] = to;
      isAnimating = false;
      if (callback) {
        callback(ANIMATION_END);
      }
    }

    if (isAnimating) {
      animationFrame.request(animateScroll);
    }
  };
  animationFrame.request(animateScroll);
};

// Publish public method in window
window.scrollToWithAnimation = scrollToWithAnimation;

exports.default = scrollToWithAnimation;
exports.animationFrame = animationFrame;
