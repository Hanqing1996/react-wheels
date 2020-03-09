import React, {Fragment, useState} from 'react'
import ReactDOM from 'react-dom'
import {scopedClassMaker} from '../../helpers/classes'
import './citySelector.scss'

const scopedClass = scopedClassMaker('wheel-citySelector')
const CitySelector: React.FunctionComponent = (props) => {

    const [dialogVisible, setDialogVisible] = useState(false)

    const onClick = () => {
        setDialogVisible(true)
    }

    const onClose=()=>{
        setDialogVisible(false)
    }
    const dialog = ReactDOM.createPortal(<Dialog onClose={onClose}/>, document.body)

    return (
        <Fragment>
            <div onClick={onClick}>{props.children}</div>
            {dialogVisible && dialog}
        </Fragment>
    )
}

interface DialogPops {
    onClose:()=>void
}

const Dialog: React.FunctionComponent<DialogPops> = (props) => {

    return (
        <div className={scopedClass('dialog')} onClick={props.onClose}>弹出内容</div>
    )
}

export default CitySelector