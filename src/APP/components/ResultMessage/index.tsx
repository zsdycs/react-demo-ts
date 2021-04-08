import { Button, Card } from 'antd';
import React from 'react';

class ResultMessage extends React.PureComponent {

  toWelcome = () => {
    (this.props as any).history.push({ pathname: '/welcome' });
  }

  render() {
    return (
      <>
        <Card
          title="申請番号確認"
          bordered={true}
          style={{ width: '100%' }}
          actions={[
            <Button type="primary" htmlType="submit" onClick={this.toWelcome} >
              to Welcome
        </Button>]}
        >
          <div>登録完了</div>
        </Card>
      </>
    );
  }

}

export default ResultMessage;
