import React from 'react'
import createReactClass from 'create-react-class'
import Router from 'next/router'
import fetch from 'isomorphic-unfetch'
import environment from './../environments/env-config.js'
import Link from 'next/link'

const WowCharacter = createReactClass ({
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
                characterData.class = getNameById(characterData.class, classesData.classes);
            }
        
            // Get races
            const racesResponse = await fetch(`https://eu.api.battle.net/wow/data/character/races?locale=en_GB&apikey=${environment.wow_api_key}`)
            const racesData = await racesResponse.json()
            if(racesData) {
                characterData.race = getNameById(characterData.race, racesData.races);
            }
        
            return {
                character: characterData ? characterData : {},
                initSearch: defaultCharacterSearch
            }
        }
    },

    getInitialState() {
        return {
            characterSearch: {
                locale: this.props.initSearch.locale,
                realm: this.props.initSearch.realm,
                name: this.props.initSearch.name
            }
        };
    },

    formChange(inputName, event) {
        this.setState({
            characterSearch: {
                ...this.state.characterSearch,
                [inputName]: event.target.value
            }
        });
    },
    
    formSubmit(event) {
        Router.push(`${environment.link_prefix}/wow-character?locale=${this.state.characterSearch.locale}&realm=${this.state.characterSearch.realm}&name=${this.state.characterSearch.name}`);
        event.preventDefault();
    },

    render() {
        const characterDetails = this.props.character.name ? (
            <div>
                <img src={`https://render-eu.worldofwarcraft.com/character/${this.props.character.thumbnail}`}/>
                <ul>
                    <li>Name: {this.props.character.name}</li>
                    <li>Level: {this.props.character.level}</li>
                    <li>Realm: {this.props.character.realm}</li>
                    <hr/>
                    <li>Class: {this.props.character.class}</li>
                    <li>Race: {this.props.character.race}</li>
                    <li>Gender: {this.props.character.gender ? 'Female' : 'Male'}</li>
                    <hr/>
                    <li>Battlegroup: {this.props.character.battlegroup}</li>
                    <li>Honorable kills: {this.props.character.totalHonorableKills}</li>
                    <li>Achievement points: {this.props.character.achievementPoints}</li>
                </ul>
            </div>
        ) : (
            <div>Character not found</div>
        );

        return (
            <div>
                <Link href={`${environment.link_prefix}/`}>
                    <a>Home</a>
                </Link>
                <h1>Wow character finder</h1>
                <form onSubmit={this.formSubmit}>
                    <input type="text" onChange={this.formChange.bind(this, 'locale')} value={this.state.characterSearch.locale} placeholder="locale"/>
                    <input type="text" onChange={this.formChange.bind(this, 'realm')} value={this.state.characterSearch.realm} placeholder="realm"/>
                    <input type="text" onChange={this.formChange.bind(this, 'name')} value={this.state.characterSearch.name} placeholder="name"/>
                    <input type="submit" value="Search"/>
                </form>
                <h2>Character found: </h2>
                {characterDetails}
            </div>
        )
    }
})

const getNameById = function (id, dataArray) {
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

export default WowCharacter