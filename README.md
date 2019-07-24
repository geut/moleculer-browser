# moleculer-browser

[![Build Status](https://travis-ci.com/geut/moleculer-browser.svg?branch=master)](https://travis-ci.com/geut/moleculer-browser)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
[![standard-readme compliant](https://img.shields.io/badge/readme%20style-standard-brightgreen.svg?style=flat-square)](https://github.com/RichardLitt/standard-readme)
![stability-experimental](https://img.shields.io/badge/stability-experimental-orange.svg)

> [Moleculer](https://github.com/moleculerjs/moleculer) for the browser.

moleculer-browser is a wrapper on top of [Moleculer](https://github.com/moleculerjs/moleculer).

Most of the 90% of the Moleculer's codebase is platform agnostic.

Using [rollup](https://rollupjs.org/) we replaced the specific code for Node.js with
shims to simulate the original behaviour.

## <a name="install"></a> Install

```
$ npm install @geut/moleculer-browser
```

## <a name="usage"></a> Usage

```javascript
const { ServiceBroker } = require('@geut/moleculer-browser')

const broker = new ServiceBroker({
  transporter: { type: 'fake' },
  serializer: 'Json',
  logger: console
})

broker.createService({
  name: 'math',
  actions: {
    add (ctx) {
      return Number(ctx.params.a) + Number(ctx.params.b)
    }
  }
})

broker.start()
// Call service
  .then(() => broker.call('math.add', { a: 5, b: 3 }))
  .then(res => console.log('5 + 3 =', res))
  .catch(err => console.error(`Error occured! ${err.message}`))
```

## <a name="playground"></a> Playground

### Glitch

<!-- View Source Button -->
<a href="https://glitch.com/edit/#!/moleculer-browser">
  <img src="https://cdn.glitch.com/2bdfb3f8-05ef-4035-a06e-2043962a3a13%2Fview-source%402x.png?1513093958802" alt="view source" height="33">
</a>

<!-- Remix Button -->
<a href="https://glitch.com/edit/#!/remix/moleculer-browser">
  <img src="https://cdn.glitch.com/2bdfb3f8-05ef-4035-a06e-2043962a3a13%2Fremix%402x.png?1513093958726" alt="remix this" height="33">
</a>

### Codesandbox

[![Edit moleculer-browser](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/moleculer-browser-1tk71?fontsize=14)

## <a name="why"></a> Why

When we talk about services we think at some point in a process running in some environment. Well, the browser is a process too.

What if the browser could provide a service itself through a network on top of WebSockets or WebRTC?

That's what we want to show here.

## <a name="issues"></a> Issues

:bug: If you found an issue we encourage you to report it on [github](https://github.com/geut/moleculer-browser/issues). Please specify your OS and the actions to reproduce it.

## <a name="contribute"></a> Contributing

:busts_in_silhouette: Ideas and contributions to the project are welcome. You must follow this [guideline](https://github.com/geut/moleculer-browser/blob/master/CONTRIBUTING.md).

## License

MIT © A [**GEUT**](http://geutstudio.com/) project
