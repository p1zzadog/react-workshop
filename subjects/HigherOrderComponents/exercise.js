////////////////////////////////////////////////////////////////////////////////
// Exercise:
//
// Make `withMouse` a "higher-order component" that sends the mouse position
// to the component as props.
//
// Hint: use `event.clientX` and `event.clientY`
//
// Got extra time?
//
// Make a `withCat` HOC that shows a cat chasing the mouse around the screen!
////////////////////////////////////////////////////////////////////////////////
import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import * as styles from './styles'

const withMouse = (Component) => {
  return class ComponentWithMouse extends React.Component {
    state = {
      mouse: {
        x: 0,
        y: 0
      }
    }
    handleMouseMove(e) {
      this.setState({
        mouse: {
          x: e.clientX,
          y: e.clientY
        }
      })
    }
    render () {
      return (
        <div onMouseMove={(e) => this.handleMouseMove(e)}>
          <Component {...this.state}/>
        </div>
      )
    }
  }
}

const withCat = (Component) => {
  return class ComponentWithCat extends React.Component {
    state = {
      cat: {
        x: 0,
        y: 0
      }
    }
    handleMouseMove(e) {
      const x = e.clientX
      const y = e.clientY
      window.setTimeout(() => this.setState({
        cat: {
          x,
          y
        }
      }), 500)
    }
    render() {
      return (
        <div onMouseMove={e => this.handleMouseMove(e)}>
          <div style={Object.assign({}, styles.cat, { top: this.state.cat.y, left: this.state.cat.x })}/>
          <Component/>
        </div>
      )
    }
  }
}

class App extends React.Component {
  static propTypes = {
    mouse: PropTypes.shape({
      x: PropTypes.number.isRequired,
      y: PropTypes.number.isRequired
    }).isRequired,
    cat: PropTypes.shape({
      x: PropTypes.number.isRequired,
      y: PropTypes.number.isRequired
    })
  }

  render() {
    const { mouse } = this.props

    return (
      <div style={styles.container}>
        {mouse ? (
          <h1>The mouse position is ({mouse.x}, {mouse.y})</h1>
        ) : (
          <h1>We don't know the mouse position yet :(</h1>
        )}
      </div>
    )
  }
}

const AppWithMouse = withCat(withMouse(App))

ReactDOM.render(<AppWithMouse/>, document.getElementById('app'))
