////////////////////////////////////////////////////////////////////////////////
import React from 'react'
import PropTypes from 'prop-types'
import { createHashHistory } from 'history'

/*
// read the current URL
history.location

// listen for changes to the URL
history.listen(() => {
  history.location // is now different
})

// change the URL
history.push('/something')
*/

class Router extends React.Component {
  history = createHashHistory()

  state = {
    location: this.history.location
  }

  getChildContext() {
    return {
      history: this.history,
      location: this.state.location
    }
  }

  static childContextTypes = {
    history: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired
  }

  componentDidMount() {
    this.unlisten = this.history.listen(() => this.setState({ location: this.history.location }))
  }

  componentWillUnmount() {
    this.unlisten()
  }

  render() {
    return this.props.children
  }
}



class Route extends React.Component {

  static contextTypes = {
    location: PropTypes.object.isRequired
  }

  render() {
    const { path, render, component:Component } = this.props
    if (this.context.location.pathname.startsWith(path)) {
      if (render) {
        return render(this.props)
      }
      if (Component) {
        return <Component {...this.props}/>
      }
    }
    return null
  }
}




class Link extends React.Component {

  static contextTypes = {
    history: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired
  }

  handleClick = (e) => {
    e.preventDefault()
    if (this.context.location.pathname !== this.props.to) {
      this.context.history.push(this.props.to)
    }
  }

  render() {
    return (
      <a
        href={`#${this.props.to}`}
        onClick={this.handleClick}
      >
        {this.props.children}
      </a>
    )
  }
}

export { Router, Route, Link }
