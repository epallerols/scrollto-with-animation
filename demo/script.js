window.onload = function () {
  'use strict'

  var elemHighlighted = document.getElementById('highlight')
  var header = document.getElementById('header')
  var counterFPS = document.getElementById('fpsMeter')
  var counterButton = document.getElementById('fps-button')

  function enableFPS (event) {
    event.preventDefault()
    counterFPS.style.opacity = (counterFPS.style.opacity === '0') ? '1' : '0'
  }

  counterButton.addEventListener('click', enableFPS)

  var meter = new window.FPSMeter(counterFPS, {
    interval: 10,
    smoothing: 10,
    show: 'fps',
    toggleOn: 'EventNonSense',
    decimals: 0,
    maxFps: 60,
    threshold: 100,
    position: 'fixed',
    left: '15px',
    top: 'auto',
    right: 'auto',
    bottom: '15px'
  })

  function easeInOutCircWithFPS (t, b, c, d) {
    meter.tick()
    t /= d / 2
    if (t < 1) return -c / 2 * (Math.sqrt(1 - t * t) - 1) + b
    t -= 2
    return c / 2 * (Math.sqrt(1 - t * t) + 1) + b
  }

  function doneCallback () {
    console.log('Done!')
  }

  var position = elemHighlighted.getBoundingClientRect().top - header.getBoundingClientRect().height
  var newpos = position

  window.scrollToWithAnimation(
    document.body,
    position,
    3000,
    easeInOutCircWithFPS,
    doneCallback
  )

  setInterval(function () {
    if (newpos !== 0) {
      newpos = 0
    } else {
      newpos = position
    }
    window.scrollToWithAnimation(
      document.body,
      newpos,
      3000,
      easeInOutCircWithFPS,
      doneCallback
    )
  }, 4500)
}
