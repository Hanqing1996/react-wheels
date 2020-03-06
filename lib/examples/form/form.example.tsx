import React, {Fragment} from 'react'
import Form, {FormValue} from "../../components/form/form";
import {useState} from "react";
import {validator,ResultErrors} from '../../components/form/validator'
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
            {
                key: 'username', validator: {
                    name: 'unique', newValidate: (data: string) => {
                        return new Promise((resolve, reject) => {
                            checkUserName(data, resolve, reject)
                        })
                    }
                }
            },
            {key: 'password', required: true},
            {
                key: 'password', validator: {
                    name: 'unique', newValidate: (data: string) => {
                        return new Promise((resolve, reject) => {
                            checkUserName(data, resolve, reject)
                        })
                    }
                }
            },
        ]

        validator(formData, rules,(result:ResultErrors)=>{
            console.log('result');
            console.log(result);
            setErrors(result)
        })

        //axios.post('signIn',formData).then(success,fail)
    }
    const onChange = (newFormValue: FormValue) => {
        setFormData(newFormValue)
    }

    const userNames = ['jack1', 'jack2', 'jack3', 'jack4']
    const checkUserName = (name: string, success: Function, fail: Function) => {
        setTimeout(() => {
            if (userNames.includes(name)) {
                success('用户名已存在')
            } else {
                success(undefined)
            }
        }, 1000)
    }

    return (
        <Fragment>
            <Form value={formData} errorsDisplay={'all'} errors={errors} fields={fields} onChange={onChange} onSubmit={onSubmit} buttons={
                <Fragment>
                    <button type={'submit'} className={'form-button'}>提交</button>
                    <button className={'form-button'}>返回</button>
                </Fragment>
            }/>
        </Fragment>
    )
}

export default IconExample