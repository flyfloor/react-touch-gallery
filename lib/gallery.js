'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _React$createClass;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Gallery = _react2.default.createClass((_React$createClass = {
    displayName: 'Gallery',

    propTypes: {
        urls: _react2.default.PropTypes.array,
        current: _react2.default.PropTypes.number,
        onEnd: _react2.default.PropTypes.func,
        onStart: _react2.default.PropTypes.func
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
            offsetX: 0
        };
    },
    componentDidMount: function componentDidMount() {
        this.calcInitFrame();
        document.body.addEventListener('touchmove', function (e) {
            return e.preventDefault();
        }, false);
    },
    componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
        document.body.removeEventListener('touchmove');
    },
    calcInitFrame: function calcInitFrame() {
        var _window = window;
        var innerHeight = _window.innerHeight;
        var innerWidth = _window.innerWidth;

        this.setState({
            baseWidth: innerWidth,
            baseHeight: innerHeight
        });
    }
}, _defineProperty(_React$createClass, 'componentWillReceiveProps', function componentWillReceiveProps(nextProps) {
    if (nextProps.current !== this.props.current) {
        this.setState({
            current: nextProps.current
        });
    }
}), _defineProperty(_React$createClass, 'show', function show() {
    this.setState({
        display: true
    });
}), _defineProperty(_React$createClass, 'hide', function hide() {
    var current = this.props.current;

    this.setState({
        display: false,
        current: current
    });
}), _defineProperty(_React$createClass, 'calcCxtStyle', function calcCxtStyle(offsetX) {
    var _state = this.state;
    var baseWidth = _state.baseWidth;
    var baseHeight = _state.baseHeight;
    var count = _state.count;
    var current = _state.current;
    var _props2 = this.props;
    var onStart = _props2.onStart;
    var onEnd = _props2.onEnd;

    if (current === 0 && offsetX > 0 && onStart) {
        onStart(current);
    }
    if (current === count - 1 && offsetX < 0 && onEnd) {
        onEnd(current);
    }
    return 'width:' + baseWidth * count + 'px;height:' + baseHeight + 'px;transform:translateX(' + (offsetX - current * baseWidth) + 'px)';
}), _defineProperty(_React$createClass, 'resetCxtPosition', function resetCxtPosition() {
    var contentDOM = _reactDom2.default.findDOMNode(this.refs.contentDOM);
    contentDOM.setAttribute('style', this.calcCxtStyle(0));
}), _defineProperty(_React$createClass, 'handleTouchStart', function handleTouchStart(e) {
    var pageX = e.touches[0].pageX;

    this.setState({
        onMoving: true,
        startX: pageX,
        offsetX: 0
    });
}), _defineProperty(_React$createClass, 'handleTouchEnd', function handleTouchEnd(e) {
    this.setState({ onMoving: false });
    var _state2 = this.state;
    var offsetX = _state2.offsetX;
    var current = _state2.current;
    var baseWidth = _state2.baseWidth;
    var count = _state2.count;

    if (offsetX >= baseWidth * 0.3 && current > 0) {
        return this.setState({ current: current - 1 }, this.resetCxtPosition());
    }
    if (offsetX + baseWidth * 0.3 < 0 && current < count - 1) {
        return this.setState({ current: current + 1 }, this.resetCxtPosition());
    }
    this.resetCxtPosition();
}), _defineProperty(_React$createClass, 'handleTouchMove', function handleTouchMove(e) {
    var _state3 = this.state;
    var baseWidth = _state3.baseWidth;
    var baseHeight = _state3.baseHeight;
    var startX = _state3.startX;
    var onMoving = _state3.onMoving;

    if (onMoving) {
        var contentDOM = _reactDom2.default.findDOMNode(this.refs.contentDOM);
        var pageX = e.touches[0].pageX;

        var offsetX = pageX - startX;
        // horizontal
        this.setState({ offsetX: offsetX });
        contentDOM.setAttribute('style', this.calcCxtStyle(offsetX));
    }
}), _defineProperty(_React$createClass, 'render', function render() {
    var _this = this;

    var urls = this.props.urls;
    var _state4 = this.state;
    var display = _state4.display;
    var baseWidth = _state4.baseWidth;
    var onMoving = _state4.onMoving;
    var baseHeight = _state4.baseHeight;
    var current = _state4.current;
    var count = _state4.count;


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
                    _react2.default.createElement('img', { src: url, onClick: _this.hide })
                );
            })
        )
    );
}), _React$createClass));

exports.default = Gallery;