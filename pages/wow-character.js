import fetch from 'isomorphic-unfetch'
import environment from './../environments/env-config.js'

const characterSearch = {
    locale: 'en_GB',
    realm: 'uldaman',
    name: 'sez'
}

const WowCharacter = (props) => (
  <div>
    <h1>My main wow character</h1>
    <img src={`https://render-eu.worldofwarcraft.com/character/${props.character.thumbnail}`}/>
    <ul>
        <li>Name: {props.character.name}</li>
        <li>Level: {props.character.level}</li>
        <li>Realm: {props.character.realm}</li>
        <hr/>
        <li>Class: {props.character.class}</li>
        <li>Race: {props.character.race}</li>
        <li>Gender: {props.character.gender ? 'Female' : 'Male'}</li>
        <hr/>
        <li>Battlegroup: {props.character.battlegroup}</li>
        <li>Honorable kills: {props.character.totalHonorableKills}</li>
        <li>Achievement points: {props.character.achievementPoints}</li>
    </ul>
  </div>
)

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

WowCharacter.getInitialProps = async function() {
    // Get character
    const characterResponse = await fetch(`https://eu.api.battle.net/wow/character/${characterSearch.realm}/${characterSearch.name}?locale=${characterSearch.locale}&apikey=${environment.wow_api_key}`)
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
        character: characterData ? characterData : {}
    }
}

export default WowCharacter