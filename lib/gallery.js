'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Gallery = _react2.default.createClass({
    displayName: 'Gallery',

    propTypes: {
        urls: _react2.default.PropTypes.array,
        current: _react2.default.PropTypes.number
    },
    getDefaultProps: function getDefaultProps() {
        return {
            urls: [],
            current: 0,
            onMoving: false
        };
    },
    getInitialState: function getInitialState() {
        var _props = this.props;
        var current = _props.current;
        var urls = _props.urls;

        return {
            display: false,
            current: current,
            count: urls.length,
            baseWidth: 0,
            baseHeight: 0,
            startX: 0,
            startY: 0,
            offsetX: 0
        };
    },
    componentDidMount: function componentDidMount() {
        this.calcInitFrame();
        document.body.addEventListener('touchmove', function (event) {
            event.preventDefault();
        }, false);
    },
    calcInitFrame: function calcInitFrame() {
        var _window = window;
        var innerHeight = _window.innerHeight;
        var innerWidth = _window.innerWidth;

        this.setState({
            baseWidth: innerWidth,
            baseHeight: innerHeight
        });
    },
    show: function show() {
        this.setState({
            display: true
        });
    },
    addTransition: function addTransition(callback) {
        var contentDOM = _reactDom2.default.findDOMNode(this.refs.contentDOM);
    },
    cxtMoveHStyle: function cxtMoveHStyle(offsetX, offsetY) {
        var contentDOM = _reactDom2.default.findDOMNode(this.refs.contentDOM);
        var _state = this.state;
        var baseWidth = _state.baseWidth;
        var baseHeight = _state.baseHeight;
        var count = _state.count;
        var current = _state.current;

        var style = 'width:' + baseWidth * count + 'px;height:' + baseHeight + 'px';
        return style + ';transform:translate(' + (offsetX - current * baseWidth) + 'px, ' + offsetY + 'px)';
    },
    resetCxtPosition: function resetCxtPosition() {
        var contentDOM = _reactDom2.default.findDOMNode(this.refs.contentDOM);
        var _state2 = this.state;
        var count = _state2.count;
        var current = _state2.current;

        contentDOM.setAttribute('style', this.cxtMoveHStyle(0, 0));
    },
    handleTouchStart: function handleTouchStart(e) {
        var _e$touches$ = e.touches[0];
        var pageX = _e$touches$.pageX;
        var pageY = _e$touches$.pageY;

        this.setState({
            onMoving: true,
            startX: pageX,
            startY: pageY,
            offsetX: 0
        });
    },
    handleTouchEnd: function handleTouchEnd(e) {
        this.setState({ onMoving: false });
        var _state3 = this.state;
        var offsetX = _state3.offsetX;
        var current = _state3.current;
        var baseWidth = _state3.baseWidth;
        var count = _state3.count;

        if (offsetX >= baseWidth * 0.3 && current > 0) {
            return this.setState({ current: current - 1 }, this.resetCxtPosition());
        }
        if (offsetX + baseWidth * 0.3 < 0 && current < count - 1) {
            return this.setState({ current: current + 1 }, this.resetCxtPosition());
        }
        this.resetCxtPosition();
    },
    handleTouchMove: function handleTouchMove(e) {
        var _state4 = this.state;
        var baseWidth = _state4.baseWidth;
        var startX = _state4.startX;
        var startY = _state4.startY;
        var onMoving = _state4.onMoving;

        if (onMoving) {
            var contentDOM = _reactDom2.default.findDOMNode(this.refs.contentDOM);
            var _e$touches$2 = e.touches[0];
            var pageX = _e$touches$2.pageX;
            var pageY = _e$touches$2.pageY;

            var offsetX = pageX - startX;
            var offsetY = pageY - startY;
            // horizontal
            if (Math.abs(offsetX / offsetY) > 1) {
                this.setState({ offsetX: offsetX });
                contentDOM.setAttribute('style', this.cxtMoveHStyle(pageX - startX, 0));
            }
        }
    },
    render: function render() {
        var urls = this.props.urls;
        var _state5 = this.state;
        var display = _state5.display;
        var baseWidth = _state5.baseWidth;
        var onMoving = _state5.onMoving;
        var baseHeight = _state5.baseHeight;
        var current = _state5.current;
        var count = _state5.count;


        var style = {
            width: baseWidth * count,
            height: baseHeight,
            transform: 'translate(-' + baseWidth * current + 'px, 0)'
        };

        var className = display ? 'react-photo-gallery _active' : 'react-photo-gallery';
        return _react2.default.createElement(
            'div',
            { className: className },
            _react2.default.createElement('div', { className: '_mask' }),
            _react2.default.createElement(
                'div',
                { className: onMoving ? '_content' : '_content _slide', ref: 'contentDOM',
                    style: style,
                    onTouchStart: this.handleTouchStart,
                    onTouchMove: this.handleTouchMove, onTouchEnd: this.handleTouchEnd },
                urls.map(function (url, index) {
                    return _react2.default.createElement(
                        'div',
                        { key: index, className: '_cell', style: { 'width': baseWidth } },
                        _react2.default.createElement('img', { src: url })
                    );
                })
            )
        );
    }
});

exports.default = Gallery;