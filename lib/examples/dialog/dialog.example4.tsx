import React,{Fragment} from 'react'
import {modal} from "../../components/dialog/dialog";
import './dialog.example.scss'
import {scopedClassMaker} from "../../helpers/classes";
const scopedClass = scopedClassMaker('example')

export default function () {
    return (
        <Fragment>
            <button className={scopedClass('button')} onClick={() => {

                const onClose = modal(<h1>你好 <button onClick={() => {
                    onClose();
                }}>close</button></h1>)
            }} >modal
            </button>
        </Fragment>
    )
}