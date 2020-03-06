import React, {FormEvent, ReactNode, Fragment} from 'react'
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
    onChange: Function,
    errors?: FormErrors,
    errorsDisplay?:'first'|'all',
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
            <table className={scopedClass('table')}>
                <tbody>
                {
                    props.fields.map((field, index) =>
                        <Fragment key={index}>
                            <tr className={scopedClass('tr')}>
                                <td className={scopedClass('td')}>
                                    <label className={scopedClass('label')}>{field.label}</label>
                                </td>
                                <td>
                                    <Input className={scopedClass('input',)} type={field.name}
                                           value={formData[field.name]}
                                           onChange={(e) => {
                                               onInputChange(field.name, e.target.value)
                                           }}/>
                                </td>
                            </tr>
                            <tr>
                                <td></td>
                                <td>
                                    <div className={scopedClass('errorMessage')}>{props.errors&& props.errors[field.name]&& (props.errorsDisplay==='first'?props.errors[field.name][0]:props.errors[field.name].join(' ')) }</div>
                                </td>
                            </tr>
                        </Fragment>)
                }
                <tr>
                    <td></td>
                    <td>{props.buttons}</td>
                </tr>
                </tbody>
            </table>
        </form>
    )
}

Form.defaultProps={
    errorsDisplay:'first'
}

export default Form