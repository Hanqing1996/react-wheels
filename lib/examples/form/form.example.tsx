import React,{Fragment} from 'react'
import Form from "../../components/form/form";
import {useState} from "react";

const IconExample: React.FunctionComponent = () => {
    const [formData] = useState({
        username: '',
        password: ''
    })
    const [fields] = useState([
        {name: 'username', label: '用户名', input: {type: 'text'}},
        {name: 'password', label: '密码', input: {type: 'text'}},
    ])


    return (
        <div>
            <Form value={formData} fields={fields} buttons={
                <Fragment>
                    <button type={'submit'}>提交</button>
                    <button>返回</button>
                </Fragment>
            }/>
        </div>
    )
}

export default IconExample