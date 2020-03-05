import React, {Fragment} from 'react'
import Dialog from "../../components/dialog/dialog";
import {useState} from "react";
import {scopedClassMaker} from '../../helpers/classes'
import './dialog.example.scss'

const scopedClass = scopedClassMaker('example')

export default function () {
    const [x, setX] = useState(false)

    return (
        <Fragment>
            <Dialog visible={x} buttons={
                [<button onClick={() => {
                    setX(!x)
                }}>ok</button>,
                    <button onClick={() => {
                        setX(!x)
                    }}>cancel</button>]}

                    onClose={() => setX(!x)}
                    maskClosable={true}>
                <div>content</div>
            </Dialog>
            <button onClick={() => setX(!x)} className={scopedClass('button')}>trigger</button>
        </Fragment>
    )
}
