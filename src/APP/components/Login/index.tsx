import './index.css'
import React from 'react';
import ajax from '../../../utils/ajax';
import { message } from 'antd';
import { Form, Input, Button } from 'antd';
import { bindActionCreators } from 'redux';
import { loginSuccessCreator } from '../../../redux/Login';
import { connect } from 'react-redux';


class Login extends React.Component {
  state = {
    requesting: false,
  };

  render() {
    const layout = {
      labelCol: { span: 8 },
      wrapperCol: { span: 16 },
    };
    const tailLayout = {
      wrapperCol: { offset: 8, span: 16 },
    };
    const onFinish = async(values: any) => {
      const hide = message.loading('確認中...', 0);
      try {
        const res = await ajax.login(values.username, values.password);
        hide();
        if (res.success) {
          message.success('成功');
          (this.props as any).handleLoginSuccess(res.data);
          (this.props as any).history.push('/');
        } else {
          message.error(`エラー: ${res.message}`);
          this.setState({requesting: false});
        }
      } catch (exception) {
        hide();
        message.error(`エラー: ${exception.message}`);
        this.setState({requesting: false});
      }
      console.log('values:', values);
    };
  
    const onFinishFailed = (errorInfo: any) => {
      console.log('Failed:', errorInfo);
    };
    return (
      <Form
        {...layout}
        name="loginForm"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input />
        </Form.Item>
  
        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password />
        </Form.Item>
  
        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    );
  }

}

const mapDispatchToProps = (dispatch: any) => {
  return {
    handleLoginSuccess: bindActionCreators(loginSuccessCreator, dispatch),
  };
};


export default connect(null, mapDispatchToProps)(Login);
