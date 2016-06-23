import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import Gallery from '../component/Gallery'
import css from './gallery.less';

const urls = ['http://img3.cache.netease.com/photo/0001/2016-06-22/BQ5U3SGL00AO0001.jpg',
                'http://img3.cache.netease.com/photo/0001/2016-06-22/BQ5U3SGM00AO0001.jpg',
                'http://img5.cache.netease.com/photo/0001/2016-06-22/BQ5U3SGP00AO0001.jpg',
                'http://img5.cache.netease.com/photo/0001/2016-06-22/BQ5U3SGS00AO0001.jpg',
                'http://img4.cache.netease.com/photo/0001/2016-06-22/BQ5U3SGQ00AO0001.jpg']

export class Demo extends Component {
    constructor(props){
        super(props)
        this.state = {
            current: 0
        }
    }

    showGallery(){
        const galleryNode = this.refs.galleryNode
        galleryNode.show()
    }

    onClick(){
        this.setState({
            current: 2
        });
    }

    render() {
        return (
            <div>
                <a href="#" onClick={this.onClick.bind(this)}>ss</a>
                <h3>Photo Galleries, mobile touch</h3>
                <a href="#" onClick={this.showGallery.bind(this)}>show gallery</a>
                <Gallery urls={urls} ref="galleryNode" current={this.state.current}/>
            </div>
        )
    }
}

ReactDOM.render(<Demo/>, document.getElementById('root'))
