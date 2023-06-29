import React, {useState, useEffect} from 'react'; 
import TotalsDisplay from './TotalsDisplay.jsx';
import Roster from './RosterContainer.jsx';
import CharacterInputDisplay from './CharacterInputDisplay.jsx';

// this needs to handle state to pass down  the roster. 
const MainContainer = () => {
  // state for roster array 
  const [roster, updateRoster] = useState([]); 
  const [characterInfo, updateCharacterInfo] = useState({});
  // state for character once input field is complete
  const [newCharacter, updateNewCharacter] = useState({});
  // state for deleted character (to trigger effect hook)
  const [deletedCharacter, updateDeletedCharacter] = useState({});

  // state for updated character 
  const [updatedCharacter, updateCharacter ] = useState({}); 

  const handleNewCharChange = (event) => {
    // console.log(event.target);
    // console.log(event.target.name)
    // console.log(event.target.value);
    const fieldName = event.target.name;
    const fieldValue = event.target.value;
    const newState = {...characterInfo}; 
    newState[fieldName] = fieldValue ; 
    updateCharacterInfo(newState);
  }
  const handleNewCharSubmit = (event) => {
    event.preventDefault();
    const copyCharacter = {...characterInfo}; 
    // convert item level to number 
    copyCharacter.ilvl = Number(copyCharacter.ilvl);

    // convert gold-earning status to boolean
    copyCharacter.isGoldEarner  = (characterInfo.isGoldEarner==='yes') ? true : false ; 
    console.log('request body: ', JSON.stringify(copyCharacter));
    fetch('/character',{method:'POST',headers: {'content-type': 'application/json'}, body: JSON.stringify(copyCharacter)})
    .then(character => {
      updateNewCharacter(character);
      updateCharacterInfo({});
    })
  };
  const handleDelete = (event) => {
    // send a fetch request to delete the character 
    // then use updateDeletedCharacter to update state 
    // will updateDeletedCharacter to trigger useEffect hook 
    fetch('/character', {method:'DELETE',headers: {'content-type': 'application/json'}, body: JSON.stringify({name: event.target.id})})
    .then( character => {
      updateDeletedCharacter(character);
      console.log(deletedCharacter);
    });
   
  }
  const handleItemLevelUpdate = (event) => {
    event.preventDefault();

    const [name,goldString ] = event.target.name.split('.'); 
    const ilvl = event.target[0].value; 
    const isGoldEarner = goldString === 'true' ;

    fetch('/character', {
      method: 'PATCH', 
      headers: {'content-type' : 'application/json'}, 
      body: JSON.stringify({name: name, ilvl: ilvl, isGoldEarner: isGoldEarner})
    })
    .then(character => updateCharacter(character));
  }  
  // effect hook to get changes to character list. we will want to run this on page load, but also on submission of forms or  deletion of a character  
  useEffect( () => {  
   fetch('/characters')
    .then(response => response.json() )
    .then(characters => {
      updateRoster(characters) ;
      console.log(characters);
    })
    },[newCharacter,deletedCharacter,updatedCharacter]);

  return (
    <div className='MainContainer'> 
      <TotalsDisplay roster={roster} />
      <CharacterInputDisplay characterInfo={characterInfo} handleChange={handleNewCharChange} handleSubmit={handleNewCharSubmit} />
      <Roster roster={roster} handleDelete={handleDelete} handleUpdate={handleItemLevelUpdate}/> 
    </div> 

  )
}




export default MainContainer;