var React = require('react')
var ReactDOM = require('react-dom')
var ReactWebMidi = require('react-web-midi')

var App = React.createClass({
  render () {
    return (
      <div>
        <ReactWebMidi />
      </div>
    )
  }
})

ReactDOM.render(<App />, document.getElementById('app'))
