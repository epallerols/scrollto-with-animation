# scrollto-with-animation
This is a simple function for animating scroll that can define a easing equation function.

- No dependency on extra libraries.
- Available adding script or browserify
- Cross-browser.
- 60 FPS Animation.
- If user scrolls while animation is running, scroll animation would be immediately canceled.

## Install

```bash
npm install scrollto-with-animation --save
```

## Usage

### Available with browserify

```javascript
var scrollToWithAnimation = require('scrollto-with-animation')
```

### or available as a script

```html
<script src="scrollto-with-animation.js"></script>
```

### Example

```javascript
scrollToWithAnimation(
    document.body, // element to scroll
    0, // target scrollY (0 means top of the page)
    10000, // duration in ms
    'easeInOutCirc', /*
        Can be a name of the list of 'Posible easing equations' or a callback
        that defines the ease. # http://gizma.com/easing/
    */
    function() { // callback function that runs after the animation (optional)
      console.log('done!')
    }
);
```

This will scroll to top of the page and the animation will run for 10 seconds (10000ms).


## Options

## Posible easings equations

- `linearTween`
- `easeInQuad`
- `easeOutQuad`
- `easeInOutQuad`
- `easeInCubic`
- `easeOutCubic`
- `easeInOutCubic`
- `easeInQuart`
- `easeOutQuart`
- `easeInOutQuart`
- `easeInQuint`
- `easeOutQuint`
- `easeInOutQuint`
- `easeInSine`
- `easeOutSine`
- `easeInOutSine`
- `easeInExpo`
- `easeOutExpo`
- `easeInOutExpo`
- `easeInCirc`
- `easeOutCirc`
- `easeInOutCirc`

## License

MIT

## Thanks

##### Thanks to [madebysource/animated-scrollto](https://github.com/madebysource/animated-scrollto), for the base of the animated, I just added the possibility of define the equation or chose a existing one.
