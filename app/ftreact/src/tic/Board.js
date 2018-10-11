import React from 'react'
import Square from './Square'

export default class Board extends React.Component {

  renderSquare(i) {
    return (
      <Square
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  renderRow (cols) {
    let c = cols.map(x => {
      return (
        this.renderSquare(x)
      )
    })
    return (
      <div className="board-row">{ c }</div>
    )
  }

  render() {
    let rows = [0, 1, 2]
    let r = rows.map(x => {
      let cols = [x * 3 + 0, x * 3 + 1, x * 3 + 2]
      return (
        this.renderRow(cols)
      )
    })
    return (
      <div>
        {r}
      </div>
    );
  }
}
