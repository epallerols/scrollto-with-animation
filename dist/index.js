'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _easings = require('./easings');

var _easings2 = _interopRequireDefault(_easings);

var _animationFrame = require('animation-frame');

var _animationFrame2 = _interopRequireDefault(_animationFrame);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var animationFrame = new _animationFrame2.default();
var DEFAULT_ANIMATION = 'easeInQuad';

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
        throw new Error('scrollTo-with-animation: Transition not found - https://github.com/davesnx/scrollToWithAnimation');
      }
      return animation;
    }
  }, {
    key: 'defineAnimation',
    value: function defineAnimation(transition) {
      if (transition.length !== 4) {
        throw new TypeError('scrollTo-with-animation: callback transition don\'t look like a valid equation - https://github.com/davesnx/scrollToWithAnimation');
      }
      return transition;
    }
  }, {
    key: 'do',
    value: function _do(element, to, duration, transition, callback) {
      var start = element.scrollTop;
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
        throw new TypeError('scrollTo-with-animation: Transition isn\'t string or Function - https://github.com/davesnx/scrollToWithAnimation');
      }

      var animateScroll = function animateScroll() {
        if (!animating) {
          return;
        }
        animationFrame.request(animateScroll);
        var now = +new Date();
        var val = Math.floor(eq(now - animationStart, start, change, duration));
        if (lastpos) {
          if (lastpos === element.scrollTop) {
            lastpos = val;
            element.scrollTop = val;
          } else {
            animating = false;
          }
        } else {
          lastpos = val;
          element.scrollTop = val;
        }
        if (now > animationStart + duration) {
          element.scrollTop = to;
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

if (window) {
  window.scrollToWithAnimation = scrollToWithAnimation.do;
}

exports.default = scrollToWithAnimation;