# React Web MIDI

This is a simple React MIDI component that allows you to drop in a <Midi /> component to interact with your Midi Controller, Mouse, or Keyboard.

This is a work in progress!


## Demo & Examples

Live demo: [erictherobot.github.io/react-web-midi](http://erictherobot.github.io/react-web-midi/)

To build the examples locally, run:

```
npm install
npm start
```

Then open [`localhost:8000`](http://localhost:8000) in a browser.


## Installation

The easiest way to use react-web-midi is to install it from NPM and include it in your own React build process (using [Browserify](http://browserify.org), [Webpack](http://webpack.github.io/), etc).

You can also use the standalone build by including `dist/react-web-midi.js` in your page. If you use this, make sure you have already included React, and it is available as a global variable.

```
npm install react-web-midi --save
```


## Usage

Soon

```
import ReactWebMidi from 'react-web-midi'

<ReactWebMidi />
```

### Properties

* Soon

### Notes

Soon


## Development (`src`, `lib` and the build process)

**NOTE:** The source code for the component is in `src`. A transpiled CommonJS version (generated with Babel) is available in `lib` for use with node.js, browserify and webpack. A UMD bundle is also built to `dist`, which can be included without the need for any build system.

To build, watch and serve the examples (which will also watch the component source), run `npm start`. If you just want to watch changes to `src` and rebuild `lib`, run `npm run watch` (this is useful if you are working with `npm link`).

## License

__PUT LICENSE HERE__

Copyright (c) 2016 Eric David Smith.
