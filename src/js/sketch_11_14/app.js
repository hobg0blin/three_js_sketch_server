import Config from 'data/config';
import Detector from 'utils/detector';
import Sketch from './app/main';
import React, { Component } from "react"
import ReactDOM from "react-dom"
import {TextForm, fonts} from 'components/React/TextForm'
import {Button} from 'components/React/button'
import helvetiker from 'three/examples/fonts/helvetiker_regular.typeface.json'
// Styles
import 'css/main.css'

// Check environment and set the Config helper
if(__ENV__ === 'dev') {
  console.log('----- RUNNING IN DEV ENVIRONMENT! -----')

  Config.isDev = true
}

const defaultText = ""

const mappedFonts = fonts.map(font => {
  return {name: font.familyName, font: font}
})

class App extends Component {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.state = { value: defaultText, font: helvetiker}
    this.handleChange = this.handleChange.bind(this)
    this.addText = this.addText.bind(this);
    this.playPoem = this.playPoem.bind(this);
    this.clearPoem = this.clearPoem.bind(this);
  }
  componentDidMount() {
      // add Three to the DOM
      this.sketch = new Sketch()
  }
  handleChange(event) {
       console.log('new val: ', event)
    if (event.hasOwnProperty("font")) {
    this.setState({font: event.font}, () => {
      this.sketch.updateText({font: this.state.font})
    })
    }
    if (event.hasOwnProperty("value")) {
    this.setState({value: event.value})
    }
  }
  addText(e) {
    console.log('add text: ', e)
    this.sketch.updateText(this.state)
  }
  clearPoem(e) {
    this.sketch.clearText()
  }
  playPoem(e) {
    console.log('play poem')
    this.sketch.playPoem();
  }
  render() {
    return (
      <div className="grid grid-cols-1">
        <TextForm value={this.state.value} handleChange={this.handleChange} handleSubmit={this.addText}/>
        <Button handleChange={this.clearPoem} text={"clear poem"}/>
      </div>
    );
  }
}

const rootEl = document.getElementById("root")
ReactDOM.render(<App/>, rootEl)

