import React, {ReactNode} from 'react'

interface formProps extends React.DialogHTMLAttributes<HTMLDialogElement> {
    value: {
        [K: string]: any
    },
    fields: Array<{ name: string, label: string, input: { type: string } }>,
    buttons: ReactNode,
    onSubmit:React.FormEventHandler
}

const Form: React.FunctionComponent<formProps> = (props) => {
    return (
        <form>
            {
                props.fields.map((field, index) =>
                    <div key={index}>
                        <label>{field.label}</label>
                        <input type={field.input.type} placeholder={field.name}/>
                    </div>)
            }
            <div>
                {props.buttons}
            </div>
        </form>
    )
}

export default Form