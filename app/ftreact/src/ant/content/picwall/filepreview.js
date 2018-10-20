import React, { Component } from 'react'
import { Icon } from 'antd'

class FilePreview extends Component {
  render () {
    const w = this.props.w, h = this.props.h
    const cover = this.props.cover
    const file = this.props.file
    const idx = this.props.idx
    return (
      <div
        style={{
          width: w,
          height: h,
          padding: '5px',
          border: '1px dashed #ddd',
          borderRadius: '5px',
          background: '#F1F2F1',
          textAlign: 'center',
          marginRight: '5px',
          position: 'relative',
        }}
      >
        { cover }
        <div style={{
          width: '100%',
          height: '100%',
          overflow: 'hidden',
        }}>
          <img
            onClick={ () => this.props.handleCover(idx) }
            alt="File"
            src={ file.url || file.thumbUrl }
              style={{
              width: 'auto',
              height: '100%',
            }}
          />
        </div>
        <div style={{
          position: 'absolute',
          left: 0,
          bottom: 0,
          width: '100%',
          textAlign: 'center',
          background: 'linear-gradient(rgba(45, 46, 45, 0.1), rgba(45, 46, 45, 1.0))',
          // background: '-moz-linear-gradient(rgba(45, 46, 45, 0.1), rgba(45, 46, 45, 1.0))',
          // background: '-o-linear-gradient(rgba(45, 46, 45, 0.1), rgba(45, 46, 45, 1.0))',
          // background: '-webkit-linear-gradient(rgba(45, 46, 45, 0.1), rgba(45, 46, 45, 1.0))',
        }}>
          <span style={{
            color: 'white',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitBoxOrient: 'vertical',
            WebkitLineClamp: '1',
          }}>{ file.name }</span>
        </div>
        <div
          onClick={ () => this.props.handleDelete(idx) }
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            fontSize: '20px',
          }}
        >
          <Icon type="delete" theme="outlined" />
        </div>
      </div>
    )
  }
}

export default FilePreview
