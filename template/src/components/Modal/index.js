import React from 'react';
import {Modal, Button} from 'antd';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import '../../assets/style/components/common-modal.scss';

class CommonModal extends React.Component {
  static defaultProps = {
    title: '',
    okText: '确定',
    visible: false,
    confirmLoading: false,
    cancelText: '取消',
    className: 'common-modal',
    width: 520,
    footer: null,
    mask: true,
    maskClosable: true,
    afterClose: () => {
    },
    onConfirmClick: (event) => {
    },
    onCancelClick: (event) => {
    },
    destroyOnClose: (event) => {
    },
    content: ''
  };

  static propTypes = {
    title: PropTypes.string,
    okText: PropTypes.string,
    visible: PropTypes.bool,
    confirmLoading: PropTypes.bool,
    cancelText: PropTypes.string,
    className: PropTypes.string,
    width: PropTypes.number,
    footer: PropTypes.string || PropTypes.node,
    content: PropTypes.string || PropTypes.node,
    mask: PropTypes.bool,
    maskClosable: PropTypes.bool,
    afterClose: PropTypes.func,
    onConfirmClick: PropTypes.func,
    onCancelClick: PropTypes.func,
    destroyOnClose: PropTypes.func
  };

  // static getDerivedStateFromProps (props, state) {}

  constructor (props, context) {
    super(props);

    this.state = {};
  }

  componentDidMount () {
  }

  // componentDidUpdate (prevProps, prevState, snapshot) {
  // }

  // componentWillUnmount () {
  // }

  // shouldComponentUpdate (nextProps, nextState) {
  // }

  // getSnapshotBeforeUpdate (prevProps, prevState) {
  // }

  // componentDidCatch (error, info) {
  // }

  renderFooter = () => {
    const { okText, onCancelClick, cancelText, onConfirmClick, confirmLoading } = this.props;
    return (
      <div>
        <Button
          type="primary"
          className="confirm-button"
          loading={confirmLoading}
          onClick={onConfirmClick}>
          {okText}
        </Button>
        <Button
          className="cancel-button"
          onClick={onCancelClick}
        >
          {cancelText}
        </Button>
      </div>
    );
  }

  render () {
    const {
      title, visible, destroyOnClose,
      afterClose, width, mask, footer,
      maskClosable, onCancelClick,
      content
    } = this.props;
    const classNames_ = classNames('common-modal', this.props.className);
    return (<Modal
      className={classNames_}
      title={title}
      visible={visible}
      destroyOnClose={destroyOnClose}
      afterClose={afterClose}
      width={width}
      mask={mask}
      footer={footer ? footer : this.renderFooter()}
      maskClosable={maskClosable}
      onCancel={onCancelClick}
    >
      {content}
    </Modal>)
  }
}

export default CommonModal;
