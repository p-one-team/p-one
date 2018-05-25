import React, { Component } from "react";
import PropTypes from "prop-types";
import { TransitionGroup } from "react-transition-group";
import { FadeTransition, PopTransition } from "../mo-transtion";
import style from "./modal.less";

class Modal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isShow: false
    };
  }

  componentDidMount() {
    this.props.visible && this.enter();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.visible && !this.state.isShow) {
      this.enter();
    } else if (!nextProps.visible && this.state.isShow) {
      this.leave();
    }
  }

  changeBgs = {
    root: document.getElementById("root"),
    change() {
      const root = this.root;
      if (root) {
        root.classList.add("set-blur");
        root.firstChild.firstChild.style.overflow = "hidden"
      }
    },
    fix() {
      const root = this.root;
      if (root) {
        root.classList.remove("set-blur");
        root.firstChild.firstChild.style.removeProperty("overflow")
      }
    }
  };

  enter() {
    this.setState({
      isShow: true
    });
    this.changeBgs.change();
  }

  leave(callback) {
    this.setState({
      isShow: false
    });
    this.changeBgs.fix();

    this.props.onClose && this.props.onClose();
    callback && callback();
  }

  prompt(props) {
    return (
      <div className={style.prompt}>
        <h2 className={style.title}>{props.title}</h2>
        <p>{props.tempTxt}</p>
        <footer>
          <span
            className={style.prompt_btn}
            onClick={() => {
              this.leave(props.tempCallback);
            }}
          >
            {props.btnTxt}
          </span>
        </footer>
      </div>
    );
  }

  confirm(props) {
    return (
      <div className={style.confirm}>
        <h2 className={style.title}>{props.title}</h2>
        <p>{props.tempTxt}</p>
        <footer>
          <span
            onClick={() => {
              this.leave(props.no_callback);
            }}
          >
            {props.btnTxt.cancel}
          </span>
          <span
            onClick={() => {
              this.leave(props.yes_callback);
            }}
          >
            {props.btnTxt.yes}
          </span>
        </footer>
      </div>
    );
  }

  renderMask() {
    const { isShow } = this.state;
    return (
      <TransitionGroup>
        <FadeTransition key={isShow}>
          {isShow ? (
            <div
              className={style.dyy}
              onClick={() => this.leave()&&this.props.closeOnClickModal}
            >
              {" "}
            </div>
          ) : (
            <div />
          )}
        </FadeTransition>
      </TransitionGroup>
    );
  }

  renderContent() {
  
    let { type } = this.props;
    let { isShow } = this.state;

    return (
      <TransitionGroup>
        <PopTransition key={isShow}>
          {isShow ? (
            <div className={style.wrapper}>
              <div className={style.default}>
                {type == "Prompt"
                  ? this.prompt(this.props)
                  : this.confirm(this.props)}
              </div>
            </div>
          ) : (
            <div />
          )}
        </PopTransition>
      </TransitionGroup>
    );
  }
  render() {
    return (
      <div>
        {this.renderMask()}
        {this.renderContent()}
      </div>
    );
  }
}

Modal.propTypes = {
  onClose: PropTypes.func,
  visible: PropTypes.bool,
  children: PropTypes.node,
  msg: PropTypes.node,
  showCloseIcon: PropTypes.bool,
  isBig: PropTypes.bool,
  closeOnClickModal: PropTypes.bool
};

Modal.defaultProps = {
  visible: false,
  showCloseIcon: true,
  closeOnClickModal: false
};

export default Modal;
