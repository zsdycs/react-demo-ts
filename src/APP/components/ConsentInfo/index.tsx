import { Button, Card, Checkbox } from 'antd';
import React from 'react';
import './index.css';

class ConsentInfo extends React.PureComponent {
  state = {
    disabledButton: true,
  }

  onChange = (event: any) => {
    this.setState({
      disabledButton: !event.target.checked
    });
  }

  clickButton = () => {
    (this.props as any).history.push('/inputForm');
  }

  render() {
    return (
      <Card title="同意情報" actions={[
        <Button type="primary" htmlType="submit" onClick={this.clickButton}　disabled={this.state.disabledButton}>
          同意する
        </Button>]} bordered={true} style={{ width: '100%' }}>
        <p>content</p>
        <p>content</p>
        <p>content</p>
        <Checkbox
          onChange={this.onChange}
        >確認しました</Checkbox>
      </Card>
      
    );
  }

}

export default ConsentInfo;
