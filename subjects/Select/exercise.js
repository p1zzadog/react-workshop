/*eslint-disable no-console */
////////////////////////////////////////////////////////////////////////////////
// Exercise:
//
// Make this work like a normal <select> box!
////////////////////////////////////////////////////////////////////////////////
import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import './styles.css'

class Select extends React.Component {
  static propTypes = {
    onChange: PropTypes.func,
    value: PropTypes.any,
    defaultValue: PropTypes.any
  }

  static childContextTypes = {
    handleSelect: PropTypes.func.isRequired
  }

  getChildContext() {
    return {
      handleSelect: this.handleSelect.bind(this)
    }
  }

  state = {
    selectedValue: 'label',
    optionsOpen: false
  }

  componentDidMount() {
    if (this.props.value) {
      this.handleSelect(this.props.value)
    } else if (this.props.defaultValue) {
      this.handleSelect(this.props.defaultValue)
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.value !== this.props.value) {
      this.handleSelect(this.props.value)
    }
  }

  handleSelect(value) {
    if (this.props.value) {
      this.props.onChange(value)
      this.setState({ selectedValue: this.props.value, optionsOpen: false })
    } else {
      this.setState({ selectedValue: value, optionsOpen: false })
    }
  }

  handleOpen() {
    this.setState({ optionsOpen: true })
  }

  render() {
    return (
      <div className="select">
        <div className="label" onClick={() => this.handleOpen()}>{this.state.selectedValue} <span className="arrow">▾</span></div>
        {this.state.optionsOpen && (
          <div className="options">
            {this.props.children}
          </div>
        )}
      </div>
    )
  }
}

class Option extends React.Component {
  static contextTypes = {
    handleSelect: PropTypes.func.isRequired
  }
  static propTypes = {
    value: PropTypes.string.isRequired
  }
  render() {
    return (
      <div className="option" onClick={() => this.context.handleSelect(this.props.value)}>{this.props.children}</div>
    )
  }
}

class App extends React.Component {
  state = {
    selectValue: 'dosa'
  }

  setToMintChutney = () => {
   this.setState({ selectValue: 'mint-chutney' })
  }

  render() {
    return (
      <div>
        <h1>Select/Option</h1>
        <pre>{JSON.stringify(this.state, null, 2)}</pre>

        <h2>Controlled</h2>
        <p>
          <button onClick={this.setToMintChutney}>Set to Mint Chutney</button>
        </p>

        <Select
          value={this.state.selectValue}
          onChange={(selectValue) => this.setState({ selectValue })}
        >
          <Option value="tikka-masala">Tikka Masala</Option>
          <Option value="tandoori-chicken">Tandoori Chicken</Option>
          <Option value="dosa">Dosa</Option>
          <Option value="mint-chutney">Mint Chutney</Option>
        </Select>

        <h2>Uncontrolled</h2>
        <Select defaultValue="tikka-masala">
          <Option value="tikka-masala">Tikka Masala</Option>
          <Option value="tandoori-chicken">Tandoori Chicken</Option>
          <Option value="dosa">Dosa</Option>
          <Option value="mint-chutney">Mint Chutney</Option>
        </Select>
      </div>
    )
  }
}

ReactDOM.render(<App/>, document.getElementById('app'))
