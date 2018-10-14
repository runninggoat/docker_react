import React, { Component } from 'react'
import './style.css'
import { DatePicker } from 'antd'
import { Layout } from 'antd'
import BG from './content/backgroud.js'
import Head from './head/head.js'

const { Header, Footer, Content } = Layout

class AntT extends Component {

  // constructor (props) {
  //   super(props)
  // }

  renderDatePicker () {
    return (
      <DatePicker></DatePicker>
    )
  }

  render () {
    const source = 'https://www.smartertravel.com/uploads/2011/10/Mountain-Towns-HERO.jpg'
    // const source = 'https://www.colorado.com/sites/default/files/Needle-Mtn-View---300-dpi.jpg'
    return (
      <div>
        {/* {this.renderDatePicker()} */}
        <Layout>
          <Content>
            <BG
              src={ source }
            >
              <Header>
                <Head src={ source }></Head>
              </Header>
            </BG>
          </Content>
          <Footer>Footer</Footer>
        </Layout>
      </div>
    )
  }
}

export default AntT
