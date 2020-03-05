import React,{Fragment} from 'react'
import {confirm} from "../../components/dialog/dialog";
import './dialog.example.scss'
import {scopedClassMaker} from "../../helpers/classes";
const scopedClass = scopedClassMaker('example')

export default function () {
    return (
        <Fragment>
            <button onClick={() => {
                confirm('confirm content', () => {
                    console.log('yes')
                }, () => {
                    console.log('no')
                })
            }} style={{display: "block"}} className={scopedClass('button')}>confirm
            </button>
        </Fragment>
    )
}
