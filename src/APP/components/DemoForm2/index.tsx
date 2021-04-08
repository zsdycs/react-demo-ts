import React from 'react';
import { Form, FormInstance, InputNumber } from 'antd';

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 8 },
};
interface DemoFormProps {
    dataSource: object,
    submitForm: Function,
}

class DemoForm2 extends React.Component<DemoFormProps> {
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

    render() {
        return (
            <Form {...layout}
                layout="vertical"
                ref={this.formRef}
                name="DemoForm2"
                initialValues={this.props.dataSource}
            >
                <Form.Item name="height" label="height(CM)" rules={[{ type: 'number', min: 0, max: 999 }]}>
                    <InputNumber />
                </Form.Item>
                <Form.Item name="weight" label="weight(KG)" rules={[{ type: 'number', min: 0, max: 999 }]}>
                    <InputNumber />
                </Form.Item>
            </Form>
        );
    }
};

export default DemoForm2;