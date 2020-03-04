import React, {FormEvent, ReactNode} from 'react'

export interface FormValue {
    [K: string]: string
}

interface formProps {
    value: FormValue,
    fields: Array<{ name: string, label: string, input: { type: string } }>,
    buttons: ReactNode,
    onSubmit: React.FormEventHandler,
    onChange: Function
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
        <form onSubmit={onFormSubmit}>
            {
                props.fields.map((field, index) =>
                    <div key={index}>
                        <label>{field.label}</label>
                        <input type={field.input.type} value={formData[field.name]} onChange={(e) => {
                            onInputChange(field.name, e.target.value)
                        }}/>
                    </div>)
            }
            <div>
                {props.buttons}
            </div>
        </form>
    )
}

export default Form