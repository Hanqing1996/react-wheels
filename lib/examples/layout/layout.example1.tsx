import React,{Fragment} from 'react'
import Layout, {Header, Content, Footer} from "../../components/layout/layout";
import {scopedClassMaker} from "../../helpers/classes";
import './layout.example.scss'

const scopedClass = scopedClassMaker('e')
export default function () {

    return (
        <Fragment>
            <h2 className={scopedClass('h2')}>例1</h2>
            <Layout className={scopedClass('layout')}>
                <Header>header</Header>
                <Content>content</Content>
                <Footer>footer</Footer>
            </Layout>
        </Fragment>
    )
}
