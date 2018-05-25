import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import Modal from './modal'
import _ut from '../../libs/my-util'

function alert(msg, props) {

    props = {
        msg,
        visible: true,
        ...props
    }
    return next(props)
}

function Prompt(msg, callback, option) {

    let title = '';
    let tempTxt = '';
    let tempCallback = callback ? callback : function() { return false };
    let btnTxt = option ? option : "确认";

    if (_ut.isString(msg)) {
        title = '提示';
        tempTxt = msg;
    } else {
        title = msg.title ? msg.title : '提示';
        tempTxt = msg.txt ? msg.txt : "温馨提示";
    }

    let props = {
        title,
        tempTxt,
        tempCallback,
        type: 'Prompt',
        btnTxt,
        visible: true,
        ...props
    }
    return next(props)
}


function Confirm(msg, success_callback, cancel_callback, option) {

    let title = '提示';
    let tempTxt = "";
    let yes_callback = success_callback ? success_callback : function() { return false };
    let no_callback = cancel_callback ? cancel_callback : function() { return false };
    let btnTxt = option ? option : { yes: '确认', cancel: "取消" };

    if (_ut.isString(msg)) {
        title = '提示';
        tempTxt = msg;
    } else {
        title = msg.title ? msg.title : '提示';
        tempTxt = msg.txt ? msg.txt : "温馨提示";
    }

    let props = {
        title,
        tempTxt,
        type: 'Confirm',
        yes_callback,
        no_callback,
        btnTxt,
        visible: true,
        ...props
    }
    return next(props)
}

function next(props) {
    const div = document.createElement('div')
    document.body.appendChild(div)

    if (props.lockScroll != false) {
        document.body.style.setProperty('overflow', 'hidden')
    }

    const component = React.createElement(Modal, Object.assign({}, props, {
        onClose: () => {

            ReactDOM.unmountComponentAtNode(div)
            document.body.removeChild(div)
            document.body.style.removeProperty('overflow')

            if (props.onClose instanceof Function) {
                props.onClose()
            }
        }
    }))

    ReactDOM.render(component, div)
}



const modalRoot = document.body;

class AlertWindow extends Component {
    constructor(props) {
        super(props);
        this.el = document.createElement('div');
    }

    static alert = alert
    static Prompt = Prompt
    static Confirm = Confirm

    renderPoral() {
        const props = this.props
        return React.createElement(Modal, Object.assign({}, props, {
            onClose: () => {
                setTimeout(() => {
                    document.body.style.removeProperty('overflow')
                }, 200)

                if (props.onClose instanceof Function) {
                    props.onClose()
                }
            }
        }))
    }

    componentDidMount() {
        modalRoot.appendChild(this.el);
    }

    componentWillUnmount() {
        modalRoot.removeChild(this.el);
    }

    render() {
        return ReactDOM.createPortal(
            this.renderPoral(),
            this.el,
        );
    }
}

export default AlertWindow