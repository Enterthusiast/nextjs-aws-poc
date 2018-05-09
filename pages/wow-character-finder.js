import React from 'react'
import createReactClass from 'create-react-class'

import Router from 'next/router'
import Link from 'next/link'

import fetch from 'isomorphic-unfetch'
import AppHead from '../components/app-head.js'
import AppBody from '../components/app-body.js'

import ScTitle from '../styles/sc-title'
import environment from '../environments/env-config.js'
import AppWowCharacterFinder from '../components/app-wow-character-finder.js';



const PageWowCharacterFinder = createReactClass ({
    statics: {
        async getInitialProps({ query }) {

            // Default
            let defaultCharacterSearch = {
                locale: 'en_GB',
                realm: 'uldaman',
                name: 'sez'
            };

            // URL query
            if(query) {
                defaultCharacterSearch = {
                    locale: query.locale ? query.locale : defaultCharacterSearch.locale,
                    realm: query.realm ? query.realm : defaultCharacterSearch.realm,
                    name: query.name ? query.name : defaultCharacterSearch.name
                }
            }

            // Get character
            const characterResponse = await fetch(`https://eu.api.battle.net/wow/character/${defaultCharacterSearch.realm}/${defaultCharacterSearch.name}?locale=${defaultCharacterSearch.locale}&apikey=${environment.wow_api_key}`)
            const characterData = await characterResponse.json()
        
            // Get classes
            const classesResponse = await fetch(`https://eu.api.battle.net/wow/data/character/classes?locale=en_GB&apikey=${environment.wow_api_key}`)
            const classesData = await classesResponse.json()
            if(classesData) {
                characterData.class = this.getNameById(characterData.class, classesData.classes);
            }
        
            // Get races
            const racesResponse = await fetch(`https://eu.api.battle.net/wow/data/character/races?locale=en_GB&apikey=${environment.wow_api_key}`)
            const racesData = await racesResponse.json()
            if(racesData) {
                characterData.race = this.getNameById(characterData.race, racesData.races);
            }
        
            return {
                character: characterData ? characterData : {},
                initSearch: defaultCharacterSearch
            }
        },
        
        getNameById(id, dataArray) {
            let name = id;
            if(Array.isArray(dataArray)) {
                dataArray.map(data => {
                    if(data.id === id) {
                        name = data.name;
                    }
                });
            }
            return name;
        }
    },

    render() {
        return(
            <div>
                <AppHead title="Wow Character Finder"/>
                <AppWowCharacterFinder {...this.props}/>
            </div>
        ); 
    }
})

export default PageWowCharacterFinder