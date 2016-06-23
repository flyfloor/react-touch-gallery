import React from 'react';
import ReactDOM from 'react-dom';

const Gallery = React.createClass({
    propTypes: {
        urls: React.PropTypes.array,
        current: React.PropTypes.number,
        onEnd: React.PropTypes.func,
        onStart: React.PropTypes.func,
    },
    getDefaultProps() {
        return {
            urls: [],
            current: 0,
            onMoving: false,
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
            offsetX: 0,
        }
    },

    componentDidMount() {
        this.calcInitFrame()
        document.body.addEventListener('touchmove', e => e.preventDefault(), false)
    },

    componentWillReceiveProps(nextProps) {
        document.body.removeEventListener('touchmove'); 
    },
    
    calcInitFrame(){
        let {innerHeight, innerWidth} = window
        this.setState({
            baseWidth: innerWidth,
            baseHeight: innerHeight,
        });
    },

    componentWillReceiveProps(nextProps) {
        if (nextProps.current !== this.props.current) {
            this.setState({
                current: nextProps.current
            });
        }
    },

    show(){
        this.setState({
            display: true,
        });
    },

    hide(){
        const {current} = this.props
        this.setState({
            display: false,
            current
        });
    },

    calcCxtStyle(offsetX){
        const {baseWidth, baseHeight, count, current} = this.state
        const {onStart, onEnd} = this.props
        if (current === 0 && offsetX > 0 && onStart) {
            onStart(current)
        }
        if (current === count - 1 && offsetX < 0 && onEnd) {
            onEnd(current)
        }
        return `width:${baseWidth * count}px;height:${baseHeight}px;transform:translateX(${offsetX - current * baseWidth}px)`
    },

    resetCxtPosition(){
        const contentDOM = ReactDOM.findDOMNode(this.refs.contentDOM)
        contentDOM.setAttribute('style', this.calcCxtStyle(0))
    },
    
    handleTouchStart(e){
        const {pageX} = e.touches[0]
        this.setState({
            onMoving: true,
            startX: pageX,
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
        const {baseWidth, baseHeight, startX, onMoving} = this.state
        if (onMoving) {
            const contentDOM = ReactDOM.findDOMNode(this.refs.contentDOM)
            const { pageX } = e.touches[0]
            const offsetX = pageX - startX
            // horizontal
            this.setState({ offsetX })
            contentDOM.setAttribute('style', this.calcCxtStyle(offsetX))
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
                                <img src={url} onClick={this.hide}/>
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    }
})

export default Gallery