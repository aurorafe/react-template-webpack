import * as React from 'react';
import { connect } from 'react-redux';
import { Form, Icon, Input, Button, Checkbox, Row, Col } from 'antd';
import PropTypes from 'prop-types';
import '../../assets/style/view/login.scss';
const FormItem = Form.Item;
class LoginForm extends React.Component {
  static propTypes = {
    getFieldDecorator: PropTypes.func,
    dispatch: PropTypes.any,
    history: PropTypes.any
  };

  constructor (props, context) {
    super(props, context);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onchange = this.onchange.bind(this);
    this.state = {
      type: 'account',
      autoLogin: true
    }
  }

  handleSubmit (e) {
    e.preventDefault();
    // eslint-disable-next-line
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const type = this.state.type;
        const { dispatch, history } = this.props;
        if (!err) {
          history.push('/index/dashboard');
          dispatch({
            type: 'ACTION_LOGIN',
            payload: {
              ...values,
              type,
            },
          });
        }
        console.log('Received values of form: ', values);
      }
    });
  }

  onchange (event) {
    console.log(event)
  }

  render() {
    // eslint-disable-next-line
    const { getFieldDecorator } = this.props.form;
    const iconStyle = { color: 'rgba(0,0,0,.25)' };
    return (
      <div className="login">
        <div className="login-content">
          <div className="login-content-form">
            <div className="auth-login">
              <h1 className="login-title">用户登录</h1>
              <Row gutter={16} type="flex" justify="space-around" align="middle" className={'login-content'}>
                <Col span={16}>
                  <div className="clearfix" id="login-content-background">
                    <div className="">
                      <Form onSubmit={this.handleSubmit}>
                        <FormItem>
                          {getFieldDecorator('userName', {
                            rules: [{ required: true, message: '请输入用户名!' }],
                          })(
                            <Input prefix={<Icon type="user" style={iconStyle} />} placeholder="用户名" />
                          )}
                        </FormItem>
                        <FormItem>
                          {getFieldDecorator('password', {
                            rules: [{ required: true, message: '请输入密码!' }],
                          })(
                            <Input prefix={<Icon type="lock" style={iconStyle} />} type="password" placeholder="密码" />
                          )}
                        </FormItem>
                        <FormItem className="form-item-remember">
                          {getFieldDecorator('remember', {
                            valuePropName: 'checked',
                            initialValue: true,
                          })(
                            <Checkbox onChange={this.onchange}>记住我</Checkbox>
                          )}
                        </FormItem>
                        <FormItem>
                          <Button type="primary" htmlType="submit" className="login-form-button">登录</Button>
                        </FormItem>
                      </Form>
                    </div>
                  </div>
                </Col>
              </Row>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const Login = Form.create()(LoginForm);

export default connect()(Login);
