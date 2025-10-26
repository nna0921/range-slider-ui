(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
const rangeSlider = require('..')

const range = rangeSlider({ min: 0, max: 10 })
document.body.innerHTML = '<h1> range slider </h1>'

const main = document.createElement('div')
main.classList.add('demo')

const style = document.createElement('style')
style.textContent = `
 .demo {
 padding: 50px;
 }
`

main.append(range)

document.body.append(main, style)

},{"..":2}],2:[function(require,module,exports){
module.exports = rangeSlider

let id = 0

function rangeSlider (opts, protocol) {
  const { min = 0, max = 1000 } = opts
  const name = `range-${id++}`

  let notify = () => {}
  if (protocol) {
    notify = protocol({ from: name }, listen)
  } // notify parent
  function listen (message) {
    const { type, data } = message
    if (type === 'update') {
      input.value = data
      fill.style.width = `${data / max * 100}%`
      input.focus()
    }
  }

  const el = document.createElement('div')
  el.classList.add('container')

  const shadow = el.attachShadow({ mode: 'closed' })
  const input = document.createElement('input')
  input.type = 'range'
  input.min = min
  input.max = max
  input.value = min

  input.oninput = handleInput
  const bar = document.createElement('div')
  bar.classList.add('bar')
  const ruler = document.createElement('div')
  ruler.classList.add('ruler')
  const fill = document.createElement('div')
  fill.classList.add('fill')
  bar.append(ruler, fill)

  const style = document.createElement('style')
  style.textContent = getTheme()

  shadow.append(style, input, bar)
  return el
  function handleInput (e) {
    const val = Number(e.target.value)
    console.log(val)
    fill.style.width = `${val / max * 100}%`
    notify({ from: name, type: 'update', data: val })
  }
}

function getTheme () {
  return `
    :host{
        box-sizing: border-box;
    }
    *, *:before, *:after{
        box-sizing: inherit;
    }
    :host {
        --white: hsla(0, 0%, 100%, 1);
        --transparent : hsla(0,0%,0%, 0);
        --grey : hsla(0 ,0% ,90% , 1);
        --blue : hsla(207 ,88% , 66% , 1);
        position: relative;
        width: 100%;
        height: 16px; 
    }   
    input{
       position: absolute;
       top: 0;
       left: 0;
       width: 100%;
       -webkit-appearance: none;
       outline:none;
       margin: 0;
       z-index: 2;
       background-color: var(--transparent);
    }
    .bar {
        position: absolute;
        top: 3px;
        left: 0;
        z-index: 0;
        height: 10px;
        width: 100%;
        border-radius: 8px;
        overflow: hidden;
        background-color: var(--grey);
        display: flex;
        flex-direction: column;
        justify-content: center;
    }
    .ruler {
        position: absolute;
        height: 6px;
        width: 100%;
        transform: scale(-1, 1);
        background-size: 20px 8px;
        background-image: repeating-linear-gradient(
            to right,
            var(--grey) 0px,
            var(--grey) 17px,
            var(--white) 17px,
            var(--white) 20px
        );
    }
    .fill {
        position: absolute;
        height: 100%;
        width: 0%;
        background-color: var(--grey);
    }
    input:focus + .bar .fill,
    input:focus-within + .bar .fill,
    input:active + .bar .fill {
        background-color: var(--blue);
    }
    input::-webkit-slider-thumb {
        -webkit-appearance: none;
        width: 16px;
        height: 16px;
        border-radius: 50%;
        background-color: var(--white);
        border: 1px solid var(--grey);
        cursor: pointer;
        box-shadow: 0 3px 6px rgba(0, 0, 0, .4);
        transition: background-color .3s, box-shadow .15s linear;
    }
    input::-webkit-slider-thumb:hover {
        box-shadow: 0 0 0 14px rgba(94, 176, 245, .8);
    }
    `
}

},{}]},{},[1]);
