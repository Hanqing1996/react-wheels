import * as React from 'react'
import Layout from "../components/layout/layout";
import Header from "../components/layout/header"
import Content from "../components/layout/content";
import Footer from "../components/layout/footer";
import Aside from "../components/layout/aside";

export default function () {

    return (
        <div>
            <div style={{marginBottom:'100px'}}>
                <h2>有 aside 的例子</h2>
                <Layout className={'user-layout1 user-layout2'}>
                    <Aside>aside</Aside>
                    <Layout>
                        <Header>header</Header>
                        <Content>content</Content>
                        <Footer>footer</Footer>
                    </Layout>
                </Layout>
            </div>

            <div>
                <h2>没有 aside 的例子</h2>
                <Layout className={'user-layout1 user-layout2'}>
                    <Header>header</Header>
                    <Content>content</Content>
                    <Footer>footer</Footer>
                </Layout>
            </div>
        </div>
    )
}
