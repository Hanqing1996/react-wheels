import * as React from 'react'
import Layout, {Aside, Header, Content, Footer} from "../../components/layout/layout";
import {scopedClassMaker} from "../../helpers/classes";
import './layout.example.scss'

const scopedClass = scopedClassMaker('e')
export default function () {

    return (
        <div>
            <h2 className={scopedClass('h2')}>例3</h2>
            <Layout className={scopedClass('layout')}>
                <Header>header</Header>
                <Layout className={scopedClass('layout')}>
                    <Content>content</Content>
                    <Aside>aside</Aside>
                </Layout>
                <Footer>footer</Footer>
            </Layout>
        </div>
    )
}
