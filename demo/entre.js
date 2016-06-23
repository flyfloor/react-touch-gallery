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
    }

    showGallery(){
        const galleryNode = this.refs.galleryNode
        galleryNode.show()
    }

    render() {
        return (
            <div>
                <h3>Demo</h3>
                <a href="#" onClick={this.showGallery.bind(this)}>show gallery</a>
                <Gallery urls={urls} ref="galleryNode" showArrow={true} 
                    showRange={true} showCloseBtn={true}/>
                <h3>Usage</h3>
                <code>{`<Gallery urls={urls}/>`}</code>
                <br/>
                <h4>props</h4>
                <table>
                    <tbody>
                        <tr>
                            <td>urls</td>
                            <td>image urls</td>
                        </tr>
                        <tr>
                            <td>showRange</td>
                            <td>show current page / total page</td>
                        </tr>
                        <tr>
                            <td>showArrow</td>
                            <td>show navigation arrow</td>
                        </tr>
                        <tr>
                            <td>showCloseBtn</td>
                            <td>show close button</td>
                        </tr>
                        <tr>
                            <td>prevArrow</td>
                            <td>custom previous arrow node</td>
                        </tr>
                        <tr>
                            <td>nextArrow</td>
                            <td>custom next arrow node</td>
                        </tr>
                        <tr>
                            <td colSpan="2">
                                events:
                            </td>
                        </tr>
                        <tr>
                            <td>onChange(index)</td>
                            <td>preview image change event</td>
                        </tr>
                        <tr>
                            <td>onEnd(index)</td>
                            <td>at last page, still go right</td>
                        </tr>
                        <tr>
                            <td>onStart(index)</td>
                            <td>at first page, still go left</td>
                        </tr>
                        <tr>
                            <td>current</td>
                            <td>initial active index page</td>
                        </tr>
                    </tbody>
                </table>
                <h3>to be continued...</h3>
            </div>
        )
    }
}

ReactDOM.render(<Demo/>, document.getElementById('root'))
