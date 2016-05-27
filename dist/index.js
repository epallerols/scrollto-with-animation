'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.animationFrame = undefined;

var _easings = require('./easings');

var _easings2 = _interopRequireDefault(_easings);

var _animationFrame = require('animation-frame');

var _animationFrame2 = _interopRequireDefault(_animationFrame);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var animationFrame = new _animationFrame2.default();
var DEFAULT_ANIMATION = 'easeInQuad';
var LIB_NAME = 'scrollto-with-animation';
var URL_GITHUB = 'https://github.com/davesnx/scrollToWithAnimation';
var TRANSITION_NOT_FOUND = LIB_NAME + ': Transition not found - ' + URL_GITHUB;
var ANIMATION_NOT_VALID = LIB_NAME + ': callback transition don\'t look like a valid equation - ' + URL_GITHUB;
var TRANSITION_NOT_VALID = LIB_NAME + ': Transition isn\'t string or Function - ' + URL_GITHUB;

var _document = typeof document !== 'undefined' ? document : {};
var _window = typeof window !== 'undefined' ? window : {};

var scrollToWithAnimation = function () {
  function scrollToWithAnimation() {
    _classCallCheck(this, scrollToWithAnimation);
  }

  _createClass(scrollToWithAnimation, null, [{
    key: 'findAnimation',
    value: function findAnimation() {
      var transition = arguments.length <= 0 || arguments[0] === undefined ? DEFAULT_ANIMATION : arguments[0];

      var animation = _easings2.default[transition];
      if (animation === undefined) {
        throw new Error(TRANSITION_NOT_FOUND);
      }
      return animation;
    }
  }, {
    key: 'defineAnimation',
    value: function defineAnimation(transition) {
      if (transition.length !== 4) {
        throw new TypeError(ANIMATION_NOT_VALID);
      }
      return transition;
    }
  }, {
    key: 'do',
    value: function _do() {
      var element = arguments.length <= 0 || arguments[0] === undefined ? _document : arguments[0];
      var direction = arguments.length <= 1 || arguments[1] === undefined ? 'scrollTop' : arguments[1];
      var to = arguments.length <= 2 || arguments[2] === undefined ? 0 : arguments[2];
      var duration = arguments.length <= 3 || arguments[3] === undefined ? 100 : arguments[3];
      var transition = arguments.length <= 4 || arguments[4] === undefined ? DEFAULT_ANIMATION : arguments[4];
      var callback = arguments[5];

      var start = direction === 'scrollTop' ? element.scrollTop : element.scrollLeft;
      var change = to - start;
      var animationStart = +new Date();
      var animating = true;
      var lastpos = null;
      var eq = null;

      if (typeof transition === 'string' || transition === null) {
        eq = scrollToWithAnimation.findAnimation(transition);
      } else if (typeof transition === 'function') {
        eq = scrollToWithAnimation.defineAnimation(transition);
      } else {
        throw new TypeError(TRANSITION_NOT_VALID);
      }

      var animateScroll = function animateScroll() {
        if (!animating) {
          return;
        }
        animationFrame.request(animateScroll);
        var now = +new Date();
        var val = Math.floor(eq(now - animationStart, start, change, duration));
        if (lastpos) {
          if (lastpos === element[direction]) {
            lastpos = val;
            element[direction] = val;
          } else {
            animating = false;
          }
        } else {
          lastpos = val;
          element[direction] = val;
        }
        if (now > animationStart + duration) {
          element[direction] = to;
          animating = false;
          if (callback) {
            callback();
          }
        }
      };
      animationFrame.request(animateScroll);
    }
  }]);

  return scrollToWithAnimation;
}();

_window.scrollToWithAnimation = scrollToWithAnimation.do;

exports.default = scrollToWithAnimation.do;

// Export this for unit testing purposes

exports.animationFrame = animationFrame;