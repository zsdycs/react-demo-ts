import React from 'react';
import { Form, Button, Card, Table } from 'antd';
import TableAction from '../TableAction';
import DetailsRegistration from '../DetailsRegistration';
import DemoForm1 from '../DemoForm1';
import DemoForm2 from '../DemoForm2';

class InputForm extends React.PureComponent {
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
    },
    {
      title: '',
      dataIndex: 'action',
      key: 'action',
      width: '65px',
      render: (text: any, record: { key: React.Key }) => (
        <TableAction
          onDelFinish={() => this.handleDelete(record.key)}
          editData={() => this.getTableData(record.key)}
          onEditFinish={(detail: any) => this.handleEdit(detail, record.key)} />
      ),
    },
  ];

  state = {
    tableData: [
      {
        key: '1',
        name: 'John Brown',
        age: 32,
        address: 'New York No. 1 Lake Park',
        birth: '2020/02/01',
      },
      {
        key: '2',
        name: 'Jim Green',
        age: 42,
        address: 'London No. 1 Lake Park',
        birth: '2020/02/02',
      },
      {
        key: '3',
        name: 'Joe Black',
        age: 32,
        address: 'Sidney No. 1 Lake Park',
        birth: '2020/02/03',
      },
    ],
    count: 3,
    demoFormData1: {
      info: '',
      profession: 'other',
      professionName: ''
    },
    demoFormData2: {
      height: 162,
      weight: 66,
    }
  }

  demoFormEvent1: any;
  demoFormEvent2: any;
  formList: string[] = [];

  handleEdit = (data: any, key: React.Key) => {
    const dataSource = [...this.state.tableData];
    this.setState({
      tableData: dataSource.map((item) => {
        if (item.key === key) {
          data['key'] = key;
          return data;
        }
        return item;
      })
    });
  }

  handleDelete = (key: React.Key) => {
    const dataSource = [...this.state.tableData];
    this.setState({ tableData: dataSource.filter(item => item.key !== key) });
  }

  getTableData = (key: React.Key) => {
    const dataSource = [...this.state.tableData];
    return dataSource.filter(item => item.key === key);
  }

  detailsRegistration = (data: any) => {

    const { count, tableData } = this.state;
    data['key'] = count + 1;

    this.setState({
      tableData: [...tableData, data],
      count: count + 1,
    });
  }

  apply = () => {
    this.formList = [];
    this.demoFormEvent1.submitForm();
    this.demoFormEvent2.submitForm();
  }

  demoFormFinish1 = (event: any) => {
    this.demoFormEvent1 = event;
  }

  demoFormFinish2 = (event: any) => {
    this.demoFormEvent2 = event;
  }

  formApply = (name: string, info: { values: any, forms: any }) => {
    if (name === 'DemoForm1') {
      this.formList.push('DemoForm1');
      this.setState({ demoFormData1: info.values });
    }
    if (name === 'DemoForm2') {
      this.formList.push('DemoForm2');
      this.setState({ demoFormData2: info.values });
    }
    if (this.formList.includes('DemoForm1') && this.formList.includes('DemoForm2')) {
      const { tableData, demoFormData1, demoFormData2 } = this.state;
      const params = {
        tableData,
        demoFormData1,
        demoFormData2
      };
      (this.props as any).history.push({ pathname: '/confirmForm', params: params });
    }
  }

  componentWillMount() {
    if ((this.props as any).location && (this.props as any).location.params) {
      const { tableData, demoFormData1, demoFormData2 } = (this.props as any).location.params;
      this.setState({
        tableData: tableData,
        demoFormData1: demoFormData1,
        demoFormData2: demoFormData2,
      });
    }
  }

  render() {
    const { tableData, demoFormData1, demoFormData2 } = this.state;

    return (
      <>
        <Form.Provider
          onFormFinish={this.formApply}>
          <Card title="Card1" bordered={true} style={{ width: '100%', marginBottom: '24px' }}>
            <DemoForm1 dataSource={demoFormData1} submitForm={this.demoFormFinish1} />
          </Card>
          <Card title="Card2" bordered={true} style={{ width: '100%', marginBottom: '24px' }}>
            <DemoForm2 dataSource={demoFormData2} submitForm={this.demoFormFinish2} />
          </Card>
          <Card title="Card3" bordered={true} style={{ width: '100%' }}>
            <DetailsRegistration onConfirm={(detail: any) => this.detailsRegistration(detail)} />
            <Table bordered columns={this.columns} dataSource={tableData} />
          </Card>
          <Button type="primary" onClick={this.apply} style={{ marginTop: '16px' }}>
            申請する
          </Button>
        </Form.Provider>
      </>
    );
  }

}

export default InputForm;
