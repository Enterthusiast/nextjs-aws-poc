/* eslint-env jest */

import { mount } from 'enzyme'
import React from 'react'
import renderer from 'react-test-renderer'

import AppHome from '../components/app-home.js'

describe('With Enzyme', () => {
  it('AppHome shows subtitle "A serverless website."', () => {
    const app = mount(<AppHome />)

    expect(app.find('.subtitle').text()).toEqual('A serverless website.')
  })
})

describe('With Snapshot Testing', () => {
  it('AppHome match snapshot', () => {
    const component = renderer.create(<AppHome />)
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
})