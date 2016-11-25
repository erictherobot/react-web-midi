export default function () {
  const log = console.log.bind(console)
  const keyData = document.getElementById('key_data')
  const deviceInfoInputs = document.getElementById('inputs')
  const deviceInfoOutputs = document.getElementById('outputs')
  let midi
  const ua = navigator.userAgent.toLowerCase()
  if (ua.indexOf('safari') !== -1) {
    if (ua.indexOf('chrome') > -1) {
      let AudioContext = AudioContext
      console.log('Chrome Browser Detected') // Chrome
    } else {
      let AudioContext = webkitAudioContext
      console.log('Safari Browser Detected') // Safari
    }
  }
  const context = new AudioContext()
  const activeNotes = []
  const btnBox = document.getElementById('content')
  const btn = document.getElementsByClassName('button')
  let data
  let cmd
  let channel
  let type
  let note
  let velocity

  // request MIDI access
  if (navigator.requestMIDIAccess) {
    navigator.requestMIDIAccess({
      sysex: false
    }).then(onMIDISuccess, onMIDIFailure)
  } else {
    alert('No MIDI support in your browser.')
  }

  // add event listeners
  document.addEventListener('keydown', keyController)
  document.addEventListener('keyup', keyController)
  for (let i = 0; i < btn.length; i++) {
    btn[i].addEventListener('mousedown', clickPlayOn)
    btn[i].addEventListener('mouseup', clickPlayOff)
  }
  // prepare audio files
  for (let i = 0; i < btn.length; i++) {
    addAudioProperties(btn[i])
  }

  const sampleMap = {
    key60: 1,
    key61: 2,
    key62: 3,
    key63: 4,
    key64: 5,
    key65: 6,
    key66: 7,
    key67: 8,
    key68: 9,
    key69: 10,
    key70: 11,
    key70: 12
  }
  // user interaction
  function clickPlayOn (e) {
    e.target.classList.add('active')
    e.target.play()
  }

  function clickPlayOff (e) {
    e.target.classList.remove('active')
  }

  function keyController (e) {
    if (e.type === 'keydown') {
      console.log(e);
      switch (e.keyCode) {
        case 81:
          btn[0].classList.add('active')
          btn[0].play()
          break
        case 87:
          btn[1].classList.add('active')
          btn[1].play()
          break
        case 69:
          btn[2].classList.add('active')
          btn[2].play()
          break
        case 82:
          btn[3].classList.add('active')
          btn[3].play()
          break
        case 84:
          btn[4].classList.add('active')
          btn[4].play()
          break
        case 89:
          btn[5].classList.add('active')
          btn[5].play()
          break
        case 85:
          btn[6].classList.add('active')
          btn[6].play()
          break
        case 73:
          btn[7].classList.add('active')
          btn[7].play()
          break
        case 79:
          btn[8].classList.add('active')
          btn[8].play()
          break
        case 80:
          btn[9].classList.add('active')
          btn[9].play()
          break
        case 219:
          btn[10].classList.add('active')
          btn[10].play()
          break
        case 221:
          btn[11].classList.add('active')
          btn[11].play()
          break
        default:
      }
    } else if (e.type === 'keyup') {
      switch (e.keyCode) {
        case 81:
          btn[0].classList.remove('active')
          break
        case 87:
          btn[1].classList.remove('active')
          break
        case 69:
          btn[2].classList.remove('active')
          break
        case 82:
          btn[3].classList.remove('active')
          break
        case 84:
          btn[4].classList.remove('active')
          break
        case 89:
          btn[5].classList.remove('active')
          break
        case 85:
          btn[6].classList.remove('active')
          break
        case 73:
          btn[7].classList.remove('active')
          break
        case 79:
          btn[8].classList.remove('active')
          break
        case 80:
          btn[9].classList.remove('active')
          break
        case 219:
          btn[10].classList.remove('active')
          break
        case 221:
          btn[11].classList.remove('active')
          break
        default:
      }
    }
  }

  // midi functions
  function onMIDISuccess (midiAccess) {
    midi = midiAccess
    const inputs = midi.inputs.values()
    // loop through all inputs
    for (let input = inputs.next(); input && !input.done; input = inputs.next()) {
      // listen for midi messages
      input.value.onmidimessage = onMIDIMessage
      listInputs(input)
    }
    // listen for connect/disconnect message
    midi.onstatechange = onStateChange
    showMIDIPorts(midi)
  }

  function onMIDIMessage (event) {
    data = event.data
    cmd = data[0] >> 4
    channel = data[0] & 0xf
    type = data[0] & 0xf0 // channel agnostic message type. Thanks, Phil Burk.
    note = data[1]
    velocity = data[2]
    // with pressure and tilt off
    // note off: 128, cmd: 8
    // note on: 144, cmd: 9
    // pressure / tilt on
    // pressure: 176, cmd 11:
    // bend: 224, cmd: 14
    log('MIDI data', data)

    // Display Midi Notes
    keyData.innerHTML = keyData.innerHTML + data

    switch (type) {
      case 144: // noteOn message
        noteOn(note, velocity)
        break
      case 128: // noteOff message
        noteOff(note, velocity)
        break
    }

    logger(keyData, 'key data', data)
  }

  function onStateChange (event) {
    showMIDIPorts(midi)
    const port = event.port
    const state = port.state
    const name = port.name
    const type = port.type
    if (type === 'input') {
      log('name', name, 'port', port, 'state', state)
    }
  }

  function listInputs (inputs) {
    const input = inputs.value
    log("Input port : [ type:'" + input.type + "' id: '" + input.id + "' manufacturer: '" + input.manufacturer + "' name: '" + input.name + "' version: '" + input.version + "']")
  }

  function noteOn (midiNote, velocity) {
    player(midiNote, velocity)
  }

  function noteOff (midiNote, velocity) {
    player(midiNote, velocity)
  }

  function player (note, velocity) {
    const sample = sampleMap['key' + note]
    if (sample) {
      if (type === (0x80 & 0xf0) || velocity === 0) {
        // needs to be fixed for QuNexus, which always returns 144
        btn[sample - 1].classList.remove('active')
        return
      }
      btn[sample - 1].classList.add('active')
      btn[sample - 1].play(velocity)
    }
  }

  function onMIDIFailure (e) {
    log("No access to MIDI devices or your browser doesn't support WebMIDI API. Please use WebMIDIAPIShim " + e)
  }

  // MIDI utility functions
  function showMIDIPorts (midiAccess) {
    const inputs = midiAccess.inputs
    const outputs = midiAccess.outputs
    let html
    let noInputs
    let noOutputs
    noInputs = '<h4>MIDI Inputs:</h4><div class="info">Please connect your MIDI Controller (USB / Midi Cable)</div>'
    noOutputs = '<h4>MIDI Outputs:</h4><div class="info">Please connect your MIDI Controller (USB / Midi Cable)</div>'
    html = '<h4>MIDI Inputs:</h4><div class="info">'
    inputs.forEach(function (port) {
      html += '<p>' + port.name + '<p>'
      html += '<p class="small">connection: ' + port.connection + '</p>'
      html += '<p class="small">state: ' + port.state + '</p>'
      html += '<p class="small">manufacturer: ' + port.manufacturer + '</p>'
      if (port.version) {
        html += '<p class="small">version: ' + port.version + '</p>'
      }
    })
    console.log(inputs.size)
    if (inputs.size > 1) {
      deviceInfoInputs.innerHTML = html + '</div>'
    } else {
      deviceInfoInputs.innerHTML = noInputs
    }

    html = '<h4>MIDI Outputs:</h4><div class="info">'
    outputs.forEach(function (port) {
      html += '<p>' + port.name + '<br>'
      html += '<p class="small">manufacturer: ' + port.manufacturer + '</p>'
      if (port.version) {
        html += '<p class="small">version: ' + port.version + '</p>'
      }
    })
    console.log(outputs.size)
    if (outputs.size > 1) {
      deviceInfoOutputs.innerHTML = html + '</div>'
    } else {
      deviceInfoOutputs.innerHTML = noOutputs
    }
  }

  // audio functions
  function loadAudio (object, url) {
    const request = new XMLHttpRequest()
    request.open('GET', url, true)
    request.responseType = 'arraybuffer'
    request.onload = function () {
      context.decodeAudioData(request.response, function (buffer) {
        object.buffer = buffer
      })
    }
    request.send()
  }

  function addAudioProperties (object) {
    object.name = object.id
    object.source = object.dataset.sound
    loadAudio(object, object.source)
    object.play = function (volume) {
      var s = context.createBufferSource()
      var g = context.createGain()
      var v
      s.buffer = object.buffer
      s.playbackRate.value = randomRange(0.5, 2)
      if (volume) {
        v = rangeMap(volume, 1, 127, 0.2, 2)
        s.connect(g)
        g.gain.value = v * v
        g.connect(context.destination)
      } else {
        s.connect(context.destination)
      }

      s.start()
      object.s = s
    }
  }

  // utility functions
  function randomRange (min, max) {
    return Math.random() * (max + min) + min
  }

  function rangeMap (x, a1, a2, b1, b2) {
    return ((x - a1) / (a2 - a1)) * (b2 - b1) + b1
  }

  // function frequencyFromNoteNumber (note) {
  //   return 440 * Math.pow(2, (note - 69) / 12)
  // }

  function logger (container, label, data) {
    let messages
    messages = label + ' [channel: ' + (data[0] & 0xf) + ', cmd: ' + (data[0] >> 4) + ', type: ' + (data[0] & 0xf0) + ' , note: ' + data[1] + ' , velocity: ' + data[2] + ']'
    container.textContent = messages
  }
}
