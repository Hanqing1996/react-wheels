import React,{Fragment} from 'react'
import {alert} from "../../components/dialog/dialog";
import './dialog.example.scss'
import {scopedClassMaker} from "../../helpers/classes";
const scopedClass = scopedClassMaker('example')

export default function () {
    return (
        <Fragment>
            <button onClick={() => {
                alert('alert content')
            }} className={scopedClass('button')}>alert
            </button>
        </Fragment>
    )
}
