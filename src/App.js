import './App.css';
import {Button, Form, Input} from "antd";
import {useEffect, useRef, useState} from "react";

const {TextArea} = Input

function App() {
    const [value, setValue] = useState('')
    const [form] = Form.useForm()
    const ref = useRef()
    const timoutId = useRef(0)
    const [flag, setFlag] = useState(false)
    const events = ['null']
    useEffect(() => {
        const callback = (mutationList) => {
            events.push('observer')
            const [textarea] = mutationList
            form.setFieldsValue({test: textarea.target.value})
        }
        const observer = new MutationObserver(callback)
        observer.observe(ref.current, {attributes: true, childList: true, subtree: true})
        return () => observer.disconnect()
    }, []);
    useEffect(() => {
        timoutId.current = setTimeout(() => setFlag(true), 3000)
        return () => clearTimeout(timoutId.current)
    }, []);
    console.log(ref.current)
    return (<div className="App">
        <div>Flag:{flag.toString()}</div>
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
        <textarea id={'testText'}
                  value={value}
                  data-test='textarea' ref={ref}
                  onChange={(e) => {
                      setValue(e.target.value)
                      events.push('onChange')
                      form.setFieldsValue({test: e.target.value})
                  }}></textarea>
    </div>);
}

export default App;
