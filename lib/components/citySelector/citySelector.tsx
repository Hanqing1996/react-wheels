import React, {Fragment, useState} from 'react'
import ReactDOM from 'react-dom'
import './citySelector.scss'
import Dialog from "./citySelectorDialog";

const CitySelector: React.FunctionComponent<{dataSource:string[]}> = (props) => {

    const [dialogVisible, setDialogVisible] = useState(true)

    const onClick = () => {
        setDialogVisible(true)
    }

    const onClose = () => {
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


export default CitySelector