import React, { Component } from 'react'
// import gaussBlur from './gauss'

/**
 * 一个练手的组件，适合放置到一整个屏幕的页面（例如登录页）
 * 效果是鼠标的移动会让背景图片模糊的地方变得清晰
 * 参考网站：https://www.canva.com/
 * 作者：Tom
 */
export default class BlurTest extends Component {
  state = {
    width: window.innerWidth, //窗口宽度
    height: window.innerHeight, //窗口高度
    ctx: null, //画布的上下文
    img: null, //图像，是一个img元素
    ratioH: null, //宽100%情况下对应比例的高度
    radius: 50, //显示圆点的半径
    tracks: [], //鼠标轨迹点集合
    lastPush: 0, //最近一次鼠标轨迹加入点集合的时间
    interval: 40, //采集鼠标点的时间间隔
  }

  constructor (props) {
    super(props)
    //窗口
    window.addEventListener('resize', this.resizeWindow.bind(this))
    //鼠标在屏幕移动时触发获取鼠标位置
    document.addEventListener('mousemove', this.onMouseMove.bind(this))
    document.addEventListener('mouseenter', this.onMouseMove.bind(this))
  }

  /**
   * 鼠标移动事件回调，用于收集鼠标移动轨迹
   * @param {event} e 鼠标移动产生的事件
   */
  onMouseMove (e) {
    //小于采集时间间隔的不予考虑
    let now = new Date()
    if (now.getTime() - this.state.lastPush < this.state.interval) return
    //将轨迹复制一份，并从尾部推入最新的采集点，更新采集时间
    // console.log(e.pageX, e.pageY)
    let newTracks = null
    newTracks = this.state.tracks.slice(0)
    newTracks.push({ x: e.pageX, y: e.pageY })
    this.setState(() => {return { tracks: newTracks, lastPush: now.getTime() }})
  }

  componentDidMount () {
    let cv = this.refs.cv
    let ctx = cv.getContext('2d')
    //画布填充为半透明灰色
    ctx.fillStyle = 'rgba(42, 43, 42, 0.3)'
    ctx.fillRect(0, 0, this.state.width, this.state.height)
    ctx.fill()
    this.setState(() => {return{ ctx: ctx }})
    //加载目标图片
    let img = new Image()
    img.src = require('./bg.jpg')
    if (img.complete) {
      this.setState((state) => {return{ img: img, ratioH: img.width * state.height / state.width }})
    } else {
      img.onload = () => {
        this.setState((state) => {return{ img: img, ratioH: img.width * state.height / state.width }})
      }
      img.onerror = () => {
        console.log('fail to load image')
      }
    }
    //比采集速度稍慢，将轨迹数据集头部的值清除掉，使得轨迹逐个消失
    setInterval(() => {
      if (this.state.tracks.length > 1) {
        let newTracks = this.state.tracks.slice(1)
        this.setState((state) => {return { tracks: newTracks }})
      } else {
        this.setState((state) => {return { tracks: [] }})
      }
      this.draw(this.state.ctx, this.state.img, this.state)
    }, this.state.interval * 2.3)
  }

  /**
   * 窗口大小变化的时候需要重新设定背景和画布中图像的大小
   */
  resizeWindow () {
    console.log('width', window.innerWidth)
    console.log('height', window.innerHeight)
    this.setState((state) => {
      return {
        width: window.innerWidth,
        height: window.innerHeight,
        ratioH: state.img.width * window.innerHeight / window.innerWidth,
      }
    })
  }

  /**
   * 绘制显示图片的轨迹
   * @param {context} ctx 画布上下文
   * @param {img} img 图像
   * @param {this.state} vm 状态
   */
  draw (ctx, img, vm) {
    //缺少其中任意一个都不绘制
    if (!ctx || !img || !vm.width || !vm.height) return
    //绘制一个基础背景，为半透明灰色背景，作为空图像数据
    ctx.clearRect(0, 0, vm.width, vm.height) //这里需要对每一次的图像先清除掉，否则会产生叠加效果
    ctx.fillStyle = 'rgba(42, 43, 42, 0.4)'
    ctx.fillRect(0, 0, vm.width, vm.height)
    ctx.fill()
    let newData = ctx.getImageData(0, 0, vm.width, vm.height) //获得空图像数据
    ctx.drawImage(img, 0, 0, vm.img.width, vm.ratioH, 0, 0, vm.width, vm.height) //绘制一次清晰的图像
    let data = ctx.getImageData(0, 0, vm.width, vm.height) //清晰的图像作为图像源
    let pos = 0, a = 0
    for (let t = vm.tracks.length - 1; t >= 0; t--) { //遍历每一个轨迹点
      let x = vm.tracks[t].x, y = vm.tracks[t].y, r = vm.radius
      for (let i = y - r; i < y + r; i++) { //找出每一个圆形区域的所有像素点后将图像源的像素拷贝到空图像数据中
        if (i <= r) {
          a = Math.floor(Math.sqrt(Math.pow(r, 2) - Math.pow(y - i, 2)))
        } else {
          a = Math.floor(Math.sqrt(Math.pow(r, 2) - Math.pow(i - y, 2)))
        }
        for (let j = x - a; j < x + a; j++) {
          pos = (i * vm.width + j) * 4
          newData.data[pos] = data.data[pos]
          newData.data[pos + 1] = data.data[pos + 1]
          newData.data[pos + 2] = data.data[pos + 2]
          newData.data[pos + 3] = data.data[pos + 3]
        }
      }
    }
    ctx.putImageData(newData, 0, 0) //最后再将绘制完成的图像放到画布上展示
  }

  render () {
    return (
      <div>
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          zIndex: 0,
          background: `url('${require('./bg.jpg')}')`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          filter: 'blur(5px)',
          width: `${this.state.width}px`,
          height: `${this.state.height}px`,
        }}></div>
        <canvas
          ref="cv"
          width={ this.state.width }
          height={ this.state.height }
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            zIndex: 1,
          }}
        />
      </div>
    )
  }
}
