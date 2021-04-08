import { Button, Card, Descriptions, Modal, Space, Table } from 'antd';
import React from 'react';

class ConfirmForm extends React.PureComponent {
  state = {
    isConfirmModalVisible: false,
  }
  params = (this.props as any).location.params;
  columns = [
    {
      title: '名前',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '年齢',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: '住所',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: '生年月日',
      key: 'birth',
      dataIndex: 'birth',
    }
  ];

  apply = () => {
    this.setState({
      isConfirmModalVisible: true,
    });
  }

  doReturn = () => {
    (this.props as any).history.push({ pathname: '/inputForm', params: this.params });
  }

  professionMap = new Map([
    ['doctors', '医者'],
    ['teacher', '先生'],
    ['other', 'その他'],
  ]);

  handleConfirmOk = () => {
    console.log('params:\n', this.params);
    (this.props as any).history.push({ pathname: '/resultMessage', params: this.params });
  }

  handleConfirmCancel = () => {
    this.setState({
      isConfirmModalVisible: false,
    });
  }

  render() {
    const { isConfirmModalVisible } = this.state;
    return (
      <>
        <Card title="Card1" bordered={true} style={{ width: '100%', marginBottom: '24px' }}>
          <Descriptions>
            <Descriptions.Item label="情報">{this.params.demoFormData1.info}</Descriptions.Item>
            <Descriptions.Item label="職業">{this.professionMap.get(this.params.demoFormData1.profession)}</Descriptions.Item>
            {this.params.demoFormData1.profession === 'other' ? (
              <Descriptions.Item label="職業名">{this.params.demoFormData1.professionName}</Descriptions.Item>
            ) : null}
          </Descriptions>
        </Card>
        <Card title="Card2" bordered={true} style={{ width: '100%', marginBottom: '24px' }}>
          <Descriptions>
            <Descriptions.Item label="height">{this.params.demoFormData2.height} CM</Descriptions.Item>
            <Descriptions.Item label="weight">{this.params.demoFormData2.weight} KG</Descriptions.Item>
          </Descriptions>
        </Card>
        <Card title="Card3" bordered={true} style={{ width: '100%' }}>
          <Table bordered columns={this.columns} dataSource={this.params.tableData} />
        </Card>
        <Space style={{ marginTop: '16px' }} size="middle">
          <Button type="primary" onClick={this.apply}>
            申請
          </Button>
          <Button type="primary" onClick={this.doReturn}>
            戻る
          </Button>
        </Space>
      <Modal title="確認" visible={isConfirmModalVisible} onOk={this.handleConfirmOk} onCancel={this.handleConfirmCancel}>
        <p>申請します。<br />よろしいでしか？</p>
      </Modal>
      </>
    );
  }

}

export default ConfirmForm;
