import { Modal, Button, Form, Input, DatePicker } from 'antd';
import { useState } from 'react';

interface Props {
    onConfirm: Function,
}

const DetailsRegistration = (props: Props) => {

    const layout = {
        labelCol: { span: 4 },
        wrapperCol: { span: 16 },
    };
    const dateFormat = 'YYYY/MM/DD';
    const [form] = Form.useForm();
    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = (data: any) => {
        data.submit();
    };

    const onFinish = (data: any) => {
        reset();
        const values = { ...data, 'birth': data['birth'].format(dateFormat) }
        props.onConfirm(values);
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        reset();
        setIsModalVisible(false);
    };

    const reset = () => {
        form.resetFields();
    };

    return (
        <>
            <Button type="primary" onClick={showModal} style={{ marginBottom: '16px', float: 'right' }}>
                明細登録
            </Button>
            <Modal title="明細登録" visible={isModalVisible} onOk={() => handleOk(form)} onCancel={handleCancel}>
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

export default DetailsRegistration;