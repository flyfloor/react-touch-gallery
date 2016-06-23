import React from 'react';
import ReactDOM from 'react-dom';

const Gallery = React.createClass({
    propTypes: {
        urls: React.PropTypes.array,
        current: React.PropTypes.number,
        onEnd: React.PropTypes.func,
        onStart: React.PropTypes.func,
        showArrow: React.PropTypes.bool,
        showRange: React.PropTypes.bool,
        showCloseBtn: React.PropTypes.bool,
        prevArrow: React.PropTypes.element,
        nextArrow: React.PropTypes.element,
    },
    getDefaultProps() {
        return {
            urls: [],
            current: 0,
            onMoving: false,
            showArrow: false,
            showRange: false,
            showCloseBtn: false,
            prevArrow: <div>&#8592;</div>,
            nextArrow: <div>&#8594;</div>,
            closeBtn: <span>close</span>,
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
    },

    componentWillUnmount: function() {
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
        const {current, urls} = this.props
        if (nextProps.current !== current) {
            this.setState({
                current: nextProps.current
            });
        }
        if (nextProps.urls !== urls) {
            this.setState({
                count: nextProps.urls.length
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

    changeCurrent(current, callback){
        const {onChange} = this.props
        this.setState({ current }, () => {
            if (callback) callback()
            if (onChange) onChange(current)
        });
    },
    
    handlePrev(){
        const {current} = this.state
        if (current > 0) this.changeCurrent(current - 1)
    },

    handleNext(){
        const {current, count} = this.state
        if (current < count - 1) this.changeCurrent(current + 1)
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
            return this.changeCurrent(current - 1, this.resetCxtPosition());
        }
        if (offsetX + baseWidth * 0.3 < 0 && current < count - 1) {
            return this.changeCurrent(current + 1, this.resetCxtPosition());
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
        e.preventDefault()
    },

    formatArrowAndBtn(){
        const {showArrow, showCloseBtn, prevArrow, closeBtn, nextArrow} = this.props
        const {current, count} = this.state
        if (showArrow) {
            return (
                <div>
                    {current !== 0 
                        ? <div className="_prev-arrow" onClick={this.handlePrev}>
                            {prevArrow}
                        </div>
                        : null}
                    {current !== count - 1
                        ? <div className="_next-arrow" onClick={this.handleNext}>
                            {nextArrow}
                        </div>
                        : null}
                    {showCloseBtn 
                        ? <div className="_close-btn" onClick={this.hide}>
                            {closeBtn}
                        </div>
                        : null}
                </div>
            )
        }
        return null
    },

    render() {
        const {urls, showRange} = this.props
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
                {showRange 
                    ? <div className="_range">{`${current + 1} / ${count}`}</div>
                    : null}
                {this.formatArrowAndBtn()}
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