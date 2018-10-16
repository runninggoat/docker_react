import React, { Component } from 'react'
import { Card, Icon } from 'antd'

class TextPlane extends Component {
  render () {
    return (
      <div style={{
        position: 'absolute',
        height: (100 - this.props.percent) + '%',
        width: '100%',
        left: '0',
        top: this.props.percent + '%',
      }}>
        <div style={{
          height: '100%',
          padding: '10px',
          background: 'rgba(43, 43, 43, 0.3)',
        }}>
          <h3 style={{
            color: 'white',
            lineHeight: '100%',
          }}>Lorem ipsum dolor sit amet</h3>
          {/* <p style={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitBoxOrient: 'vertical',
            WebkitLineClamp: '2',
            color: 'white',
          }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc sed ligula sapien. Ut ut feugiat risus. In hac habitasse platea dictumst. Duis nulla dolor, porta sed turpis et, ornare eleifend arcu.
          </p> */}
        </div>
      </div>
    )
  }
}

class Card1 extends Component {
  render () {
    const bgsrc = this.props.bgsrc
    const width = this.props.width
    const height = this.props.width * 3 / 5
    const percent = this.props.percent
    return (
      <div style={{ paddingLeft: '20px' }}>
        <h2>card-1</h2>
        <Card
          style={{ width: width, height: height }}
          // cover={<img alt="example" src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" />}
          // actions={[<Icon type="setting" />, <Icon type="edit" />, <Icon type="ellipsis" />]}
          hoverable={ true }
          bordered={ false }
          // type="inner"
          bodyStyle={{
            padding: '0',
          }}
        >
          <div>
            <img alt="bg" src={ bgsrc } width="100%" style={{
              // position: 'absolute',
              left: '0',
              top: '0',
              filter: 'blur(3px)',
            }} />
            <img alt="fg" src={ bgsrc } width="100%" height="100%" style={{
              position: 'absolute',
              clip: `rect(0px ${width}px ${height * percent / 100}px 0px)`,
              left: '0',
            }} />
            <div style={{
              left: '40%',
              top: '30%',
              position: 'absolute',
            }}>
              <Icon type="play-circle" theme="outlined" style={{
                fontSize: '50px',
              }} />
            </div>
            <TextPlane percent={percent} />
          </div>
        </Card>
      </div>
    )
  }
}

export default Card1
