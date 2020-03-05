import React, {FormEvent, ReactNode} from 'react'
import {FormErrors} from "./validator";
import Input from "../input/input";
import './form.scss'
import {scopedClassMaker} from '../../helpers/classes'
const scopedClass = scopedClassMaker('wheel-form')

export interface FormValue {
    [K: string]: string
}

interface formProps {
    value: FormValue,
    fields: Array<{ name: string, label: string, input: { type: string } }>,
    buttons: ReactNode,
    onSubmit: React.FormEventHandler,
    onChange: Function
    errors?: FormErrors
}

const Form: React.FunctionComponent<formProps> = (props) => {
    const onFormSubmit = (e: FormEvent<Element>) => {
        e.preventDefault()
        props.onSubmit(e)
    }

    const onInputChange = (name: string, value: string) => {

        const newFormValue = {...props.value, [name]: value}
        props.onChange(newFormValue)
    }

    const formData = props.value

    return (
        <form onSubmit={onFormSubmit} className={scopedClass('')}>
            {
                props.fields.map((field, index) =>
                    <div key={index} >
                        <div className={scopedClass('row')}>
                        <label className={scopedClass('label')}>{field.label}</label>
                        <Input className={scopedClass('input',)} type={field.name} value={formData[field.name]} onChange={(e) => {
                            onInputChange(field.name, e.target.value)
                        }}/>
                        </div>
                        <div className={'errorMessage'} style={{color:'red'}}>{props.errors ? props.errors[field.name] ? props.errors[field.name].map((error, index) =>
                            <div key={index}>{error}</div>) : null : null}</div>
                    </div>)
            }
            <div>
                {props.buttons}
            </div>

        </form>
    )
}

export default Form