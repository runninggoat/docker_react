import React, { Component } from 'react'
import { Icon, Modal } from 'antd'

class PicWall2 extends Component {
  constructor(props) {
    super(props)
    this.state = {
      previewVisible: false,
      previewImage: '',
      fileList: [
        {
          uid: '-1',
          name: 'xxx.png',
          status: 'done',
          url:
            'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        },
      ],
    }
    this.handleSelect = this.handleSelect.bind(this)
  }

  handleCancel = () => this.setState({ previewVisible: false })

  handlePreview = file => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    })
  }

  handleChange = ({ fileList }) => this.setState({ fileList })

  handleSelect (e) {
    console.log(e.target.value)
  }

  render() {
    const w = '160px', h = '120px'
    const { previewVisible, previewImage, fileList } = this.state
    const files = fileList.map((file, idx) => {
      return (
        <div key={ file.uid } style={{
          width: w,
          height: h,
          overflow: 'hidden',
          padding: '5px',
          border: '1px dashed #ddd',
          borderRadius: '5px',
          background: '#2D2E2D',
          textAlign: 'center',
          marginRight: '5px',
        }}>
          <img alt="File" src={ file.url || file.thumbUrl } style={{
            width: 'auto',
            height: '100%',
          }} />
        </div>
      )
    })
    return (
      <div style={{
        padding: '30px',
      }}>
        <div style={{
          display: 'flex',
        }}>
          { files }
          <div style={{
            position: 'relative',
            padding: '10px 10px',
            width: w,
            height: h,
            border: '1px dashed #ddd',
            borderRadius: '5px',
            background: '#2D2E2D',
            textAlign: 'center',
          }}>
            <Icon type="plus" style={{
              color: 'white',
              fontSize: '30px',
              marginTop: '20px',
            }} />
            <input
              type="file"
              name="aaa"
              onChange={ this.handleSelect }
              style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                left: 0,
                top: 0,
                opacity: 0,
                filter: 'alpha(opacity=0)',
                cursor: 'pointer',
              }}
            />
            <h3 style={{
              color: 'white',
            }}>
              { '点击添加文件' }
            </h3>
          </div>
        </div>
        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </div>
    )
  }
}

export default PicWall2
