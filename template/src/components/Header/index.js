/* eslint-disable */
import React from 'react';
import { Menu, Icon, Spin, Dropdown, Avatar } from 'antd';
import Debounce from 'lodash-decorators/debounce';
import '../../assets/style/components/header/index.scss';
class GlobalHeader extends React.Component {
  componentWillUnmount() {
    this.triggerResizeEvent.cancel();
  }

  toggle () {
    const { collapsed, onCollapse } = this.props;
    onCollapse(!collapsed);
    this.triggerResizeEvent();
  };

  /* eslint-disable*/
  @Debounce(600)
  triggerResizeEvent () {
    const event = document.createEvent('HTMLEvents');
    event.initEvent('resize', true, false);
    window.dispatchEvent(event);
  }

  render() {
    const {
      onMenuClick,
    } = this.props;
    const currentUser = {
      notifyCount: 5,
      name: 'sakitam',
      avatar: 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png'
    };
    const style = {
      marginLeft: 8
    };
    const menu = (
      <Menu className="header-menu" selectedKeys={[]} onClick={onMenuClick}>
        <Menu.Item disabled>
          <Icon type="user" />个人中心
        </Menu.Item>
        <Menu.Item disabled>
          <Icon type="setting" />设置
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item key="logout">
          <Icon type="logout" />退出登录
        </Menu.Item>
      </Menu>
    );
    return (
      <div className="header">
        <div className="header-right">
          {currentUser.name ? (
            <Dropdown overlay={menu}>
              <span className={`header-right-action header-right-account`}>
                <Avatar size="small" className="header-right-account-avatar" src={currentUser.avatar} />
                <span className="header-right-account-name">{currentUser.name}</span>
              </span>
            </Dropdown>
          ) : (
            <Spin size="small" style={style} />
          )}
        </div>
      </div>
    );
  }
}

export default GlobalHeader;
