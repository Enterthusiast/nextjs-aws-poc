/* eslint-env jest */

import { mount } from 'enzyme'
import React from 'react'
import renderer from 'react-test-renderer'

import AppWowCharacterFinder from '../components/app-wow-character-finder.js'

describe('With Enzyme', () => {
  it('AppWowCharacterFinder display the character info', () => {
    const props = {
      character : { 
        lastModified: 1526461793000,
        name: 'Sez',
        realm: 'Uldaman',
        battlegroup: 'Embuscade / Hinterhalt',
        class: 'Rogue',
        race: 'Undead',
        gender: 0,
        level: 110,
        achievementPoints: 3095,
        thumbnail: 'uldaman/87/115342935-avatar.jpg',
        calcClass: 'c',
        faction: 1,
        totalHonorableKills: 289
      }
    }
    const app = mount(<AppWowCharacterFinder {...props}/>)

    expect(app.find('li .name').text()).toEqual('Name: Sez')
    expect(app.find('li .level').text()).toEqual('Level: 110')
    expect(app.find('li .realm').text()).toEqual('Realm: Uldaman')

    expect(app.find('li .class').text()).toEqual('Class: Rogue')
    expect(app.find('li .race').text()).toEqual('Race: Undead')
    expect(app.find('li .gender').text()).toEqual('Gender: Male')

    expect(app.find('li .battlegroup').text()).toEqual('Battlegroup: Embuscade / Hinterhalt')
    expect(app.find('li .honorable-kills').text()).toEqual('Honorable kills: 289')
    expect(app.find('li .achievement-points').text()).toEqual('Achievement points: 3095')
  })

  it('AppWowCharacterFinder do not display the character info', () => {
    const props = {
      character : { 
        realm: 'Uldaman',
        battlegroup: 'Embuscade / Hinterhalt',
        class: 'Rogue',
        race: 'Undead',
      }
    }
    const app = mount(<AppWowCharacterFinder {...props}/>)

    expect(app.find('div .character-not-found')).toBeTruthy()
  })
})

describe('With Snapshot Testing', () => {
  it('AppHome match snapshot', () => {
    const component = renderer.create(<AppWowCharacterFinder />)
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
})