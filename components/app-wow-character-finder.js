import React from 'react'
import createReactClass from 'create-react-class'

import Router from 'next/router'
import Link from 'next/link'

import fetch from 'isomorphic-unfetch'
import AppHead from '../components/app-head.js'
import AppBody from '../components/app-body.js'

import ScTitle from '../styles/sc-title'
import environment from '../environments/env-config.js'

const WowCharacterFinder = createReactClass ({
    getInitialState() {
        let characterSearch = {
            locale: '',
            realm: '',
            name: ''
        };

        if(this.props && this.props.initSearch) {
            characterSearch = {
                locale: this.props.initSearch.locale ? this.props.initSearch.locale : '',
                realm: this.props.initSearch.realm ? this.props.initSearch.realm : '',
                name: this.props.initSearch.name ? this.props.initSearch.name : ''
            };
        }

        return {characterSearch};
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
        Router.push(`${environment.link_prefix}/wow-character-finder?locale=${this.state.characterSearch.locale}&realm=${this.state.characterSearch.realm}&name=${this.state.characterSearch.name}`);
        event.preventDefault();
    },

    render() {
        const characterDetails = (this.props && this.props.character && this.props.character.name) ? (
            <div>
                <img src={`https://render-eu.worldofwarcraft.com/character/${this.props.character.thumbnail}`}/>
                <ul>
                    <li className="name">Name: {this.props.character.name}</li>
                    <li className="level">Level: {this.props.character.level}</li>
                    <li className="realm">Realm: {this.props.character.realm}</li>
                    <hr/>
                    <li className="class">Class: {this.props.character.class}</li>
                    <li className="race">Race: {this.props.character.race}</li>
                    <li className="gender">Gender: {this.props.character.gender ? 'Female' : 'Male'}</li>
                    <hr/>
                    <li className="battlegroup">Battlegroup: {this.props.character.battlegroup}</li>
                    <li className="honorable-kills">Honorable kills: {this.props.character.totalHonorableKills}</li>
                    <li className="achievement-points">Achievement points: {this.props.character.achievementPoints}</li>
                </ul>
            </div>
        ) : (
            <div className="character-not-found">No character found</div>
        );

        return (
            <div>
                <section className="section">
                    <div className="container">
                        <Link href={`${environment.link_prefix}/`}>
                            <a>&lt; Home</a>
                        </Link>

                        <ScTitle className="title">Wow character finder</ScTitle>
                        <p className="subtitle">
                            Look for your <strong>WoW character</strong>.
                        </p>
                    </div>
                </section>

                <section className="section">
                    <div className="container">
                        <form onSubmit={this.formSubmit}>

                            <div className="field">
                                <label htmlFor="locale">Locale</label>
                                <div className="control">
                                    <input id="locale" className="input" type="text" onChange={this.formChange.bind(this, 'locale')} value={this.state.characterSearch.locale} placeholder="locale"/>
                                </div>
                            </div>

                            <div className="field">
                                <label htmlFor="realm">Server</label>
                                <div className="control">
                                    <input id="realm" className="input" type="text" onChange={this.formChange.bind(this, 'realm')} value={this.state.characterSearch.realm} placeholder="realm"/>
                                </div>
                            </div>

                            <div className="field">
                                <label htmlFor="name">Name</label>
                                <div className="control">
                                    <input id="name" className="input" type="text" onChange={this.formChange.bind(this, 'name')} value={this.state.characterSearch.name} placeholder="name"/>
                                </div>
                            </div>
                            
                            <div className="control">
                                <button className="button is-link" type="submit">Search</button>
                            </div>
                        </form>
                    </div>
                </section>

                <section className="section">
                    <div className="container">
                        <p className="subtitle">
                            <strong>Result:</strong>
                        </p>
                        {characterDetails}
                    </div>
                </section>

            </div>
        )

    }
})

const AppWowCharacterFinder = AppBody(WowCharacterFinder);

export default AppWowCharacterFinder