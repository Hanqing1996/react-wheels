import React, {Fragment} from 'react'
import Form, {FormValue} from "../../components/form/form";
import {useState} from "react";
import {validator} from '../../components/form/validator'
import './form.example.scss'

const IconExample: React.FunctionComponent = () => {

    const [errors, setErrors] = useState({})

    const [formData, setFormData] = useState<FormValue>({
        username: '',
        password: ''
    })
    const [fields] = useState([
        {name: 'username', label: '用户名', input: {type: 'text'}},
        {name: 'password', label: '密码', input: {type: 'text'}},
    ])
    const onSubmit = () => {

        const rules = [
            {key: 'username', required: true},
            {key: 'username', minLength: 6, maxLength: 8},
            {key: 'username', pattern: /^[A-Za-z0-9]+$/},
            {key: 'password', required: true}
        ]

        const errors = validator(formData, rules)
        setErrors(errors)

        //axios.post('signIn',formData).then(success,fail)
    }
    const onChange = (newFormValue: FormValue) => {
        setFormData(newFormValue)
    }

    return (
        <Fragment>
            <Form value={formData} errors={errors} fields={fields} onChange={onChange} onSubmit={onSubmit} buttons={
                <Fragment>
                    <button type={'submit'} className={'form-button'}>提交</button>
                    <button className={'form-button'}>返回</button>
                </Fragment>
            }/>
        </Fragment>
    )
}

export default IconExample