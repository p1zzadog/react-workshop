////////////////////////////////////////////////////////////////////////////////
// Exercise:
//
// Write a <ListView> that only shows the elements in the view.
//
// Got extra time?
//
// - Render fewer rows as the size of the window changes (Hint: Listen
//   for the window's "resize" event)
// - Try rendering a few rows above and beneath the visible area to
//   prevent tearing when scrolling quickly
// - Remember scroll position when you refresh the page
////////////////////////////////////////////////////////////////////////////////
import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import * as RainbowListDelegate from './utils/RainbowListDelegate'
import './styles'

class RainbowList extends React.Component {
  static propTypes = {
    numRows: PropTypes.number.isRequired,
    rowHeight: PropTypes.number.isRequired,
    renderRowAtIndex: PropTypes.func.isRequired
  }

  state = {
    windowHeight: window.innerHeight,
    scrollPosition: 0
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleWindowResize.bind(this))
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleWindowResize)
  }

  handleWindowResize() {
    this.setState({ windowHeight: window.innerHeight })
  }

  handleScroll(e) {
    this.setState({ scrollPosition: e.target.scrollTop })
  }
  render() {
    const { numRows, rowHeight, renderRowAtIndex } = this.props
    const { windowHeight, scrollPosition } = this.state
    const totalHeight = numRows * rowHeight

    ///
    const startingIndex = Math.floor(scrollPosition / rowHeight)

    const rowsInWindow = Math.ceil(windowHeight / rowHeight)

    const endingIndex = startingIndex + rowsInWindow

    const top = rowHeight * startingIndex

    const items = []

    let index = startingIndex
    while (index < endingIndex) {
      items.push(<li key={index}>{renderRowAtIndex(index)}</li>)
      index++
    }

    return (
      <div style={{ height: '100%', overflowY: 'scroll' }} onScroll={this.handleScroll.bind(this)}>
        <ol style={{ height: totalHeight, paddingTop: top }}>
          {items}
        </ol>
      </div>
    )
  }
}

ReactDOM.render(
  <RainbowList
    numRows={500}
    rowHeight={RainbowListDelegate.rowHeight}
    renderRowAtIndex={RainbowListDelegate.renderRowAtIndex}
  />,
  document.getElementById('app')
)
