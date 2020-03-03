import * as React from 'react'
import Layout from "../components/layout/layout";
import Header from "../components/layout/header"
import Content from "../components/layout/content";
import Footer from "../components/layout/footer";

export default function () {

    return (
        <div>
            <Layout className={'user-layout1 user-layout2'}>
                <Header>header</Header>
                <Content>content</Content>
                <Footer>footer</Footer>
            </Layout>
        </div>
    )
}
