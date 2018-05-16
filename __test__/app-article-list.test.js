/* eslint-env jest */

import { mount } from 'enzyme'
import React from 'react'
import renderer from 'react-test-renderer'

import AppArticleList from '../components/app-article-list.js'

describe('With Enzyme', () => {
  it('AppArticleList display the articles', () => {
    const props = {
      articleList : [
        {
          id: '0291cb80-5392-11e8-a5ca-e1494b1a08db',
          title: 'title test 1',
          content: 'content test 1'
        },
        {
          id: '7d6850d0-538e-11e8-a5ca-e1494b1a08db',
          title: 'title test 2',
          content: 'content test 2'
        }
      ]
    }
    const app = mount(<AppArticleList {...props}/>)

    expect(app.find('div .article-0291cb80-5392-11e8-a5ca-e1494b1a08db h2').text()).toEqual('title test 1')
    expect(app.find('div .article-7d6850d0-538e-11e8-a5ca-e1494b1a08db h2').text()).toEqual('title test 2')

  })

  it('AppArticleList do not display the articles', () => {
    const props = {
      articleList : []
    }
    const app = mount(<AppArticleList {...props}/>)

    expect(app.find('div .character-not-found')).toBeTruthy()
  })
})

describe('With Snapshot Testing', () => {
  it('AppArticleList match snapshot', () => {
    const component = renderer.create(<AppArticleList />)
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
})