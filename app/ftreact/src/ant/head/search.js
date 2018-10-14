import React, { Component } from 'react'
import { Input } from 'antd'

const Search = Input.Search

class SearchBox extends Component {
  render () {
    return (
      <Search
        placeholder="Input search text"
        onSearch={value => console.log(value)}
        style={{
          width: 200,
        }}
      />
    )
  }
}

export default SearchBox
