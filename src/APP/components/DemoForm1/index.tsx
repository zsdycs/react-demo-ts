import React from 'react';
import { Form, Input, Select, FormInstance } from 'antd';

interface DemoFormProps {
    dataSource: object,
    submitForm: Function,
}

const { Option } = Select;

class DemoForm1 extends React.Component<DemoFormProps> {
    layout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 8 },
    };
    formRef = React.createRef<FormInstance>();
    componentDidMount() {
        this.props.submitForm(this);
    }

    submitForm = () => {
        this.formRef.current!.validateFields().catch(e => {
            if (e.errorFields.length > 0) {
                this.formRef.current!.scrollToField(e.errorFields[0].name[0], {
                    behavior: actions => {
                        actions.forEach(({ el, top }) => {
                            el.scrollTop = top - 114;
                        })
                    }
                });
            }
        });
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

    render() {
        return (
            <Form {...this.layout}
                layout="vertical"
                ref={this.formRef}
                name="DemoForm1"
                initialValues={this.props.dataSource}
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

export default DemoForm1;