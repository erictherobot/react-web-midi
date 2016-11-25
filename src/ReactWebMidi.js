import React, { Component } from 'react'
import MidiScript from './lib/MidiScript'

const propTypes = {}

const defaultProps = {}

export default class ReactWebMidi extends Component {
  componentDidMount () {
    MidiScript()
  }

  render () {
    return (
      <div>
        <div id='content'>
          <div className='button' data-key='q' data-sound='https://dl.dropboxusercontent.com/s/h9sow482vkw06xe/dinky-kick.mp3' />
          <div className='button' data-key='w' data-sound='https://dl.dropboxusercontent.com/s/h9sow482vkw06xe/dinky-kick.mp3' />
          <div className='button' data-key='e' data-sound='https://dl.dropboxusercontent.com/s/h9sow482vkw06xe/dinky-kick.mp3' />
          <div className='button' data-key='r' data-sound='https://dl.dropboxusercontent.com/s/h9sow482vkw06xe/dinky-kick.mp3' />
          <div className='button' data-key='t' data-sound='https://dl.dropboxusercontent.com/s/h9sow482vkw06xe/dinky-kick.mp3' />
          <div className='button' data-key='y' data-sound='https://dl.dropboxusercontent.com/s/h9sow482vkw06xe/dinky-kick.mp3' />
          <div className='button' data-key='u' data-sound='https://dl.dropboxusercontent.com/s/h9sow482vkw06xe/dinky-kick.mp3' />
          <div className='button' data-key='i' data-sound='https://dl.dropboxusercontent.com/s/h9sow482vkw06xe/dinky-kick.mp3' />
          <div className='button' data-key='o' data-sound='https://dl.dropboxusercontent.com/s/h9sow482vkw06xe/dinky-kick.mp3' />
          <div className='button' data-key='p' data-sound='https://dl.dropboxusercontent.com/s/h9sow482vkw06xe/dinky-kick.mp3' />
          <div className='button' data-key='[' data-sound='https://dl.dropboxusercontent.com/s/h9sow482vkw06xe/dinky-kick.mp3' />
          <div className='button' data-key=']' data-sound='https://dl.dropboxusercontent.com/s/h9sow482vkw06xe/dinky-kick.mp3' />
        </div>
        <div id='device_info'>
          <div id='key_data' />
          <div id='inputs' />
          <div id='outputs' />
          <div id='displayNotes' />
        </div>
      </div>
    )
  }

}

ReactWebMidi.propTypes = propTypes
ReactWebMidi.defaultProps = defaultProps
