import React from 'react';
import Character from './Character.jsx';
import styles from './styles/rostercontainer.module.css';
// container for roster's character cards 
// must be passed down character array in props 
const Roster = (props) => {
  const characterCards = [] ;
  props.roster.forEach(character => 
    characterCards.push(<Character character={character} handleDelete={props.handleDelete} handleUpdate={props.handleUpdate} />)
  ) 
  return (
    <div className={styles.rosterContainer}>
      {characterCards}
    </div>
  )
}

export default Roster; 