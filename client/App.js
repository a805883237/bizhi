import React from 'react'
let baseUrl = 'http://static.newming.cn/'

export default class App extends React.Component {
  constructor () {
    super()
    this.state = {
      imgList: [],
      total: 0,
      more: true,
      page: 0,
      dpi: Math.min(2, window.devicePixelRatio)
    }
    this.loadmore = this.loadmore.bind(this)
  }
  componentDidMount () {
    this.fetchImg(0)
  }
  fetchImg (page) {
    let dpi = this.state.dpi
    fetch(`/api/list?page=${page}`).then(res => {
      return res.json()
    }).then(json => {
      // console.log(json)
      let imgs = json.data.imgs
      let imgList = imgs.map(item => ({
        _id: item._id,
        urlKey: item.urlKey,
        url: `${baseUrl + item.urlKey}`
      }))
      this.setState({
        imgList: [...this.state.imgList, ...imgList],
        total: json.data.count,
        more: json.data.more
      })
    }).catch(err => {
      console.log(err)
    })
  }
  loaded (e) {
    // console.log(e.target)
    e.target.classList.add('loaded')
  }
  loadmore () {
    let page = this.state.page + 1
    this.setState({
      page: page
    })
    this.fetchImg(page)
  }
  render () {
    // console.log(this.state)
    let dpi = this.state.dpi
    return (
      <div>
        <div className='images-container'>
          {
            this.state.imgList.map(item => (
              <div className='item' key={item._id}>
                <a href={item.url} target='_blank'><img src={`${item.url}?imageView2/1/w/${dpi * 400}/h/${dpi * 240}`} onLoad={e => this.loaded(e)}/></a>
                <a href={`${item.url}?attname=${item.urlKey}`} className='download'>下载</a>
              </div>
            ))
          }
        </div>
        <button className='loadmore' disabled={!this.state.more} onClick={this.loadmore}>{this.state.more ? '加载更多' : '无更多内容'}</button>
      </div>
    )
  }
}