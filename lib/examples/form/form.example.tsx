import React, {Fragment} from 'react'
import Form,{FormValue} from "../../components/form/form";
import {useState} from "react";

const IconExample: React.FunctionComponent = () => {
    const [formData, setFormData] = useState<FormValue>({
        username: '',
        password: ''
    })
    const [fields] = useState([
        {name: 'username', label: '用户名', input: {type: 'text'}},
        {name: 'password', label: '密码', input: {type: 'text'}},
    ])
    const onSubmit = () => {
        console.log(formData);
    }
    const onChange = (newFormValue:FormValue) => {
        setFormData(newFormValue)
    }

    return (
        <div>
            <Form value={formData} fields={fields} onChange={onChange} onSubmit={onSubmit} buttons={
                <Fragment>
                    <button type={'submit'}>提交</button>
                    <button>返回</button>
                </Fragment>
            }/>
        </div>
    )
}

export default IconExample