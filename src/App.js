import './App.css';
import {Button, Form, Input} from "antd";
import {useEffect, useRef} from "react";

const {TextArea} = Input

function App() {
    const [form] = Form.useForm()
    const ref = useRef()
    const events=['null']
    useEffect(() => {
        const callback = (m) => {
            events.push('observer')
            const [node] = m
            form.setFieldsValue({test: node.target.value})
        }
        const observer = new MutationObserver(callback)
        observer.observe(ref.current, {attributes: true, childList: true, subtree: true})
        return () => observer.disconnect()
    }, []);
    return (
        <div className="App">
            <Form onFinish={(values) => {
                alert(events)
                console.log(values)
            }} form={form}>
                <Form.Item style={{marginTop: 100}} name='test'>
                    <TextArea onKeyDown={(event) => {
                        if (!(event?.keyCode === 86 && event?.ctrlKey)) {
                            event?.preventDefault?.();
                            event?.stopPropagation?.();

                            return '';
                        }
                    }}/>
                </Form.Item>
                <Button htmlType='submit' data-test="submit">Отправить</Button>
            </Form>
            <textarea style={{display: 'none'}} data-test='textarea' ref={ref}
                      onChange={(e) => {
                          events.push('onChange')
                          form.setFieldsValue({test: e.target.value})
                      }}></textarea>
        </div>
    );
}

export default App;
