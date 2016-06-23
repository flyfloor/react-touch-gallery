import React from 'react';
import ReactDOM from 'react-dom';

const Gallery = React.createClass({
    propTypes: {
        urls: React.PropTypes.array,
        current: React.PropTypes.number,
    },
    getDefaultProps() {
        return {
            urls: [],
            current: 0,
            onMoving: false
        }
    },
    getInitialState() {
        const {current, urls} = this.props
        return {
            display: false,
            current,
            count: urls.length,
            baseWidth: 0,
            baseHeight: 0,
            startX: 0,
            startY: 0,
            offsetX: 0,
        }
    },

    componentDidMount() {
        this.calcInitFrame()
        document.body.addEventListener('touchmove', function(event) {
          event.preventDefault();
        }, false); 
    },
    
    calcInitFrame(){
        let {innerHeight, innerWidth} = window
        this.setState({
            baseWidth: innerWidth,
            baseHeight: innerHeight,
        });
    },

    show(){
        this.setState({
            display: true
        });
    },

    addTransition(callback){
        let contentDOM  = ReactDOM.findDOMNode(this.refs.contentDOM);
    },

    cxtMoveHStyle(offsetX, offsetY){
        const contentDOM = ReactDOM.findDOMNode(this.refs.contentDOM)
        const {baseWidth, baseHeight, count, current} = this.state
        let style = `width:${baseWidth * count}px;height:${baseHeight}px`
        return `${style};transform:translate(${offsetX - current * baseWidth}px, ${offsetY}px)`
    },

    resetCxtPosition(){
        const contentDOM = ReactDOM.findDOMNode(this.refs.contentDOM)
        const {count, current} = this.state
        contentDOM.setAttribute('style',this.cxtMoveHStyle(0, 0))
    },
    
    handleTouchStart(e){
        const {pageX, pageY} = e.touches[0]
        this.setState({
            onMoving: true,
            startX: pageX,
            startY: pageY,
            offsetX: 0,
        });
    },

    handleTouchEnd(e){
        this.setState({ onMoving: false })
        const {offsetX, current, baseWidth, count} = this.state
        if (offsetX >= baseWidth * 0.3 && current > 0) {
            return this.setState({ current: current - 1 }, this.resetCxtPosition());
        }
        if (offsetX + baseWidth * 0.3 < 0 && current < count - 1) {
            return this.setState({ current: current + 1 }, this.resetCxtPosition());
        }
        this.resetCxtPosition()
    },
    handleTouchMove(e){
        const {baseWidth, startX, startY, onMoving} = this.state
        if (onMoving) {
            const contentDOM = ReactDOM.findDOMNode(this.refs.contentDOM)
            const {pageX, pageY} = e.touches[0]
            const offsetX = pageX - startX
            const offsetY = pageY - startY
            // horizontal
            if (Math.abs(offsetX / offsetY) > 1) {
                this.setState({ offsetX })
                contentDOM.setAttribute('style', this.cxtMoveHStyle(pageX - startX, 0))
            }
        }
    },

    render() {
        const {urls} = this.props
        const {display, baseWidth, onMoving, baseHeight, current, count} = this.state

        const style = {
            width: baseWidth * count,
            height: baseHeight,
            transform: `translate(-${baseWidth * current}px, 0)`
        }

        let className = display ? 'react-photo-gallery _active' : 'react-photo-gallery'
        return (
            <div className={className}>
                <div className="_mask"></div>
                <div className={onMoving ? '_content': '_content _slide'} ref="contentDOM"
                    style={style} 
                    onTouchStart={this.handleTouchStart} 
                    onTouchMove={this.handleTouchMove} onTouchEnd={this.handleTouchEnd}>
                    {urls.map((url, index) => {
                        return (
                            <div key={index} className="_cell" style={{'width': baseWidth}}>
                                <img src={url}/>
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    }
})

export default Gallery