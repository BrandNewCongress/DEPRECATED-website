import React from 'react'

export default class AppContainer extends React.Component {
  state = {
    count: 0
  }

  render() {
    return (
      <div>
        Hello World! Current count is {this.state.count}
      </div>
    )
  }
}
