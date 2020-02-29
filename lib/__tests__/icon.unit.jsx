import * as renderer from "react-test-renderer";
import React from 'react'
import Icon from '../components/icon/icon'
import {mount} from 'enzyme'

describe('icon', () => {
    it('render successfully', () => {
        const json = renderer.create(<Icon name='draw'/>).toJSON()
        expect(json).toMatchSnapshot()
    })
    it('onClick', function () {
        const fn=jest.fn

        const component=mount(<Icon name='draw' onClick={fn}/>)
        component.find('svg').simulate('click')
        expect(fn).toBeCalled()
    });

})