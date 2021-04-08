import React from 'react';
import { Layout, Menu } from 'antd';
import { HomeOutlined, FormOutlined, UserOutlined } from '@ant-design/icons';
import { Link, Redirect } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { loginSuccessCreator } from '../redux/Login';

const { Header, Content, Footer, Sider } = Layout;

interface PathMap {
  [key: string]: string[]
}
class App extends React.Component {

  pathMap: PathMap = {
    '/consentInfo': ['form'],
    '/inputForm': ['form'],
    '/confirmForm': ['form'],
    '/resultMessage': ['form'],
    '/welcome': ['welcome'],
  }

  state = {
    tryingLogin: true,
  };

  render() {
    if (!(this.props as any).login) {
      return (<Redirect to={"/login"} />);
    }
    if ((this.props as any).location.pathname === '/') {
      return (<Redirect to={"/welcome"} />);
    }
    return (<Layout>
      <Sider
        style={{
          overflow: 'auto',
          height: '100vh',
          position: 'fixed',
          left: 0,
        }}
        breakpoint="lg"
        collapsedWidth="0"
      >
        <div className="logo" />
        <Menu theme="dark" mode="inline" selectedKeys={this.pathMap[((this.props as any).location.pathname as string)]}>
          <Menu.Item key="welcome" icon={<HomeOutlined />}>
            <Link to="/welcome" style={{ display: 'inline' }}><span className="nav-text">welcome</span></Link>
          </Menu.Item>
          <Menu.Item key="form" icon={<FormOutlined />}>
            <Link to="/consentInfo" style={{ display: 'inline' }}><span className="nav-text">form</span></Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout" style={{ marginLeft: 200, minHeight: '100vh' }}>
        <Header className="site-layout-sub-header-background" style={{ padding: 0, position: 'fixed', zIndex: 1, width: '100%', paddingRight: '200px' }}>
          <span style={{ float: 'right', marginRight: '24px' }}><UserOutlined style={{ marginRight: '5px' }} />{(this.props as any).userName}</span>
        </Header>
        <Content style={{ marginTop: '80px', padding: '0 50px', overflow: 'initial' }}>
          <div id="content" className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
            {renderRoutes((this.props as any).route.children)}
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>©2021 <a href="https://github.com/zsdycs" target="_blank" rel="noopener noreferrer" title="zsdycs | Github">zsdycs</a></Footer>
      </Layout>
    </Layout>);
  }

}
const mapStateToProps = (state: any) => {
  return {
    login: state.Login.login,
    userName: state.Login.userName,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    handleLoginSuccess: bindActionCreators(loginSuccessCreator, dispatch),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(App);
// export default App;
