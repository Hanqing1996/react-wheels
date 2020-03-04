import * as React from 'react'
import * as ReactDOM from 'react-dom'
import {HashRouter as Router, NavLink, Route} from 'react-router-dom';

import './example.scss'
import '../index.scss'

import Layout,{Aside,Header,Content,Footer} from "../components/layout/layout";

import IconCode from '../code/icon.code'
import DialogCode from '../code/dialog.code'
import LayoutCode from "../code/layout.code";

import {scopedClassMaker} from "../helpers/classes";
const scopedClass = scopedClassMaker('example-layout')

ReactDOM.render(
    <Router>
        <Layout className={scopedClass('')}>
            <Header className={scopedClass('header')}>
                <h1>
                    zhq-react-wheel
                </h1>
            </Header>
            <Layout className={scopedClass('')}>
                <Aside className={scopedClass('aside')}>
                    <h2>组件</h2>
                    <ul>
                        <li>
                            <NavLink to="/icon">
                                Icon-按钮
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/dialog">
                                Dialog-对话框
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/layout">
                                Layout-布局
                            </NavLink>
                        </li>
                    </ul>
                </Aside>
                <Content className={scopedClass('content')}>
                    <Route path='/icon' component={IconCode}/>
                    <Route path='/dialog' component={DialogCode}/>
                    <Route path='/layout' component={LayoutCode}/>
                </Content>
            </Layout>
            <Footer className={scopedClass('footer')}>&copy; zhq</Footer>
        </Layout>
    </Router>
    , document.querySelector('#root')
)
