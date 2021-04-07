import { Modal, Button, Space, Form, Input, DatePicker } from 'antd';
import React from 'react';
import { useState } from 'react';
import moment from 'moment';

interface Props {
  onDelFinish: Function,
  onEditFinish: Function,
  editData: Function,
}

const TableAction = (props: Props) => {

  const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 16 },
  };
  const dateFormat = 'YYYY/MM/DD';
  const [form] = Form.useForm();
  const [isDelModalVisible, setIsDelModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);

  const showDelModal = () => {
    setIsDelModalVisible(true);
  };

  const handleDelOk = () => {
    props.onDelFinish();
    setIsDelModalVisible(false);
  };

  const handleDelCancel = () => {
    setIsDelModalVisible(false);
  };

  const handleEditOk = (data: any) => {
    data.submit();
  };

  const onFinish = (data: any) => {
    reset();
    const values = { ...data, 'birth': data['birth'].format(dateFormat) }
    props.onEditFinish(values);
    setIsEditModalVisible(false);
  };

  const handleEditCancel = () => {
    reset();
    setIsEditModalVisible(false);
  };

  const reset = () => {
    form.resetFields();
  };

  const onEdit = (data: any) => {
    setIsEditModalVisible(true);
    form.setFieldsValue({
      name: data.name,
      age: data.age,
      address: data.address,
      birth: moment(data.birth),
    });
  }

  return (
    <>
      <Space size="middle">
        <Button danger onClick={showDelModal}>削除</Button>
        <Button type="primary" onClick={() => onEdit(props.editData()[0])}>編集</Button>
      </Space>
      <Modal title="削除確認" visible={isDelModalVisible} onOk={handleDelOk} onCancel={handleDelCancel}>
        <p>削除してもよろしいですか？</p>
      </Modal>
      <Modal title="明細編集" visible={isEditModalVisible} onOk={() => handleEditOk(form)} onCancel={handleEditCancel}>
        <Form {...layout} form={form} name="control-hooks" onFinish={onFinish}>
          <Form.Item name="name" label="名前" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="age" label="年齢" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="address" label="住所" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="birth" label="生年月日" rules={[{ required: true }]}>
            <DatePicker format={dateFormat} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default TableAction;