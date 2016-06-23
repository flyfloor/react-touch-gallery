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
        current: _react2.default.PropTypes.number,
        onEnd: _react2.default.PropTypes.func,
        onStart: _react2.default.PropTypes.func,
        showArrow: _react2.default.PropTypes.bool,
        showRange: _react2.default.PropTypes.bool,
        showCloseBtn: _react2.default.PropTypes.bool,
        prevArrow: _react2.default.PropTypes.element,
        nextArrow: _react2.default.PropTypes.element
    },
    getDefaultProps: function getDefaultProps() {
        return {
            urls: [],
            current: 0,
            onMoving: false,
            showArrow: false,
            showRange: false,
            showCloseBtn: false,
            prevArrow: _react2.default.createElement(
                'div',
                null,
                '←'
            ),
            nextArrow: _react2.default.createElement(
                'div',
                null,
                '→'
            ),
            closeBtn: _react2.default.createElement(
                'span',
                null,
                'close'
            )
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
    componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
        var _props2 = this.props;
        var current = _props2.current;
        var urls = _props2.urls;

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
    show: function show() {
        this.setState({
            display: true
        });
    },
    hide: function hide() {
        var current = this.props.current;

        this.setState({
            display: false,
            current: current
        });
    },
    calcCxtStyle: function calcCxtStyle(offsetX) {
        var _state = this.state;
        var baseWidth = _state.baseWidth;
        var baseHeight = _state.baseHeight;
        var count = _state.count;
        var current = _state.current;
        var _props3 = this.props;
        var onStart = _props3.onStart;
        var onEnd = _props3.onEnd;

        if (current === 0 && offsetX > 0 && onStart) {
            onStart(current);
        }
        if (current === count - 1 && offsetX < 0 && onEnd) {
            onEnd(current);
        }
        return 'width:' + baseWidth * count + 'px;height:' + baseHeight + 'px;transform:translate3d(' + (offsetX - current * baseWidth) + 'px, 0, 0)';
    },
    resetCxtPosition: function resetCxtPosition() {
        var contentDOM = _reactDom2.default.findDOMNode(this.refs.contentDOM);
        contentDOM.setAttribute('style', this.calcCxtStyle(0));
    },
    changeCurrent: function changeCurrent(current, callback) {
        var onChange = this.props.onChange;

        this.setState({ current: current }, function () {
            if (onChange) onChange(current);
            if (callback) return callback();
        });
    },
    handlePrev: function handlePrev() {
        var current = this.state.current;

        if (current > 0) this.changeCurrent(current - 1);
    },
    handleNext: function handleNext() {
        var _state2 = this.state;
        var current = _state2.current;
        var count = _state2.count;

        if (current < count - 1) this.changeCurrent(current + 1);
    },
    handleTouchStart: function handleTouchStart(e) {
        var pageX = e.touches[0].pageX;

        this.setState({
            onMoving: true,
            startX: pageX,
            offsetX: 0
        });
    },
    handleTouchEnd: function handleTouchEnd() {
        this.setState({ onMoving: false });
        var _state3 = this.state;
        var offsetX = _state3.offsetX;
        var current = _state3.current;
        var baseWidth = _state3.baseWidth;
        var count = _state3.count;

        if (offsetX >= baseWidth * 0.3 && current > 0) {
            return this.changeCurrent(current - 1, this.resetCxtPosition);
        }
        if (offsetX + baseWidth * 0.3 < 0 && current < count - 1) {
            return this.changeCurrent(current + 1, this.resetCxtPosition);
        }
        this.resetCxtPosition();
    },
    handleTouchMove: function handleTouchMove(e) {
        var _state4 = this.state;
        var startX = _state4.startX;
        var onMoving = _state4.onMoving;

        if (onMoving) {
            var contentDOM = _reactDom2.default.findDOMNode(this.refs.contentDOM);
            var pageX = e.touches[0].pageX;

            var offsetX = pageX - startX;
            // horizontal
            this.setState({ offsetX: offsetX });
            contentDOM.setAttribute('style', this.calcCxtStyle(offsetX));
        }
        e.preventDefault();
    },
    formatArrowAndBtn: function formatArrowAndBtn() {
        var _props4 = this.props;
        var showArrow = _props4.showArrow;
        var showCloseBtn = _props4.showCloseBtn;
        var prevArrow = _props4.prevArrow;
        var closeBtn = _props4.closeBtn;
        var nextArrow = _props4.nextArrow;
        var _state5 = this.state;
        var current = _state5.current;
        var count = _state5.count;

        if (showArrow) {
            return _react2.default.createElement(
                'div',
                null,
                current !== 0 ? _react2.default.createElement(
                    'div',
                    { className: '_prev-arrow', onClick: this.handlePrev },
                    prevArrow
                ) : null,
                current !== count - 1 ? _react2.default.createElement(
                    'div',
                    { className: '_next-arrow', onClick: this.handleNext },
                    nextArrow
                ) : null,
                showCloseBtn ? _react2.default.createElement(
                    'div',
                    { className: '_close-btn', onClick: this.hide },
                    closeBtn
                ) : null
            );
        }
        return null;
    },
    render: function render() {
        var _this = this;

        var _props5 = this.props;
        var urls = _props5.urls;
        var showRange = _props5.showRange;
        var _state6 = this.state;
        var display = _state6.display;
        var baseWidth = _state6.baseWidth;
        var onMoving = _state6.onMoving;
        var baseHeight = _state6.baseHeight;
        var current = _state6.current;
        var count = _state6.count;


        var style = {
            width: baseWidth * count,
            height: baseHeight,
            transform: 'translate3d(-' + baseWidth * current + 'px, 0, 0)'
        };

        var className = display ? 'react-photo-gallery _active' : 'react-photo-gallery';
        return _react2.default.createElement(
            'div',
            { className: className },
            _react2.default.createElement('div', { className: '_mask' }),
            showRange ? _react2.default.createElement(
                'div',
                { className: '_range' },
                current + 1 + ' / ' + count
            ) : null,
            this.formatArrowAndBtn(),
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
    }
});

exports.default = Gallery;