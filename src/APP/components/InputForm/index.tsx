import React from 'react';
import { Form, Input, Button, Select, Card, Table, FormInstance } from 'antd';
import TableAction from '../TableAction';
import DetailsRegistration from '../DetailsRegistration';

const { Option } = Select;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 8 },
};

interface DemoFormProps {
  dataSource: object,
  finish: Function,
  finishData: Function,
}

class DemoForm extends React.Component<DemoFormProps> {
  formRef = React.createRef<FormInstance>();
  componentDidMount() {
    this.props.finish(this);
  }

  finish = () => {
    this.formRef.current!.submit();
  }

  onProfessionChange = (value: string) => {
    this.formRef.current!.setFieldsValue({ professionName: undefined });
    switch (value) {
      case 'doctors':
        this.formRef.current!.setFieldsValue({ info: 'こんにちは医者' });
        return;
      case 'teacher':
        this.formRef.current!.setFieldsValue({ info: 'こんにちは先生' });
        return;
      case 'other':
        this.formRef.current!.setFieldsValue({ info: 'こんにちは' });
    }
  };

  onFinish = (values: any) => {
    this.props.finishData(values);
  };

  render() {
    return (
      <Form {...layout}
        layout="vertical"
        ref={this.formRef}
        name="control-ref"
        initialValues={this.props.dataSource}
        onFinish={this.onFinish}
      >
        <Form.Item name="info" label="情報" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="profession" label="職業" rules={[{ required: true }]}>
          <Select
            onChange={this.onProfessionChange}
            allowClear
          >
            <Option value="doctors">医者</Option>
            <Option value="teacher">先生</Option>
            <Option value="other">その他</Option>
          </Select>
        </Form.Item>
        <Form.Item
          noStyle
          shouldUpdate={(prevValues, currentValues) => prevValues.profession !== currentValues.profession}
        >
          {({ getFieldValue }) =>
            getFieldValue('profession') === 'other' ? (
              <Form.Item name="professionName" label="職業名" rules={[{ required: true }]}>
                <Input />
              </Form.Item>
            ) : null
          }
        </Form.Item>
      </Form>
    );
  }
};

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
    demoFormData: {
      info: '',
      profession: 'other',
      professionName: ''
    }
  }

  apply = () => {
    this.demoFormEvent.finish();
  }
  demoFormEvent: any;
  demoFormFinish = (event: any) => {
    this.demoFormEvent = event;
  }

  detailsRegistration = (data: any) => {

    const { count, tableData } = this.state;
    data['key'] = count + 1;

    this.setState({
      tableData: [...tableData, data],
      count: count + 1,
    });
  }

  whenFinishData = (data: any) => {
    this.setState({ demoFormData: data });
    const { tableData, demoFormData } = this.state;
    const params = {
      tableData,
      demoFormData
    };
    console.log('whenFinishData', params);
    (this.props as any).history.push({pathname: '/confirmForm', params: params});
  }

  render() {
    const { tableData, demoFormData } = this.state;

    return (
      <>
        <Card title="Card1" bordered={true} style={{ width: '100%', marginBottom: '24px' }}>
          <DemoForm dataSource={demoFormData} finish={this.demoFormFinish} finishData={(data: any) => this.whenFinishData(data)} />
        </Card>
        <Card title="Card2" bordered={true} style={{ width: '100%' }}>
          <DetailsRegistration onConfirm={(detail: any) => this.detailsRegistration(detail)} />
          <Table bordered columns={this.columns} dataSource={tableData} />
        </Card>
        <Button type="primary" onClick={this.apply} style={{ marginTop: '16px' }}>
          申請する
        </Button>
      </>
    );
  }

}

export default InputForm;
