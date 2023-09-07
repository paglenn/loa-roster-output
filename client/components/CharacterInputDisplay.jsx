import React from 'react';
import styles from '../styles/inputbox.module.css';
// import styles from './styles/inputbox.module.css'
// needs event handlers to submit fetch request to POST data to '/characters' 
const CharacterInputDisplay = (props) => {
  const {characterInfo, handleChange, handleSubmit } = props; 
  if(!characterInfo.name )characterInfo.name = '' ; 
  if (!characterInfo.ilvl) characterInfo.ilvl = ''; 
  if (!characterInfo._class) characterInfo._class = ''; 
  if (!characterInfo.isGoldEarner) characterInfo.isGoldEarner = ''; 
  return (
    <div className={styles.inputBox}l> 
      <h2> Add Character </h2>
      <form onSubmit={handleSubmit} onChange={handleChange}>
        <label> Name: <input type="text" value={characterInfo.name} name="name"/> </label>
        <label> Class: <input type="text" value={characterInfo._class} name="_class"/> </label>
        <label> Item Level: <input type="text" value={characterInfo.ilvl} name="ilvl"/> </label>
        <label> Gold Earner (yes/no):  <input value={characterInfo.isGoldEarner} type="text" name="isGoldEarner"/> </label>
        <input type="submit" value="Submit" />
      </form> 
    </div>
  )
}

export default CharacterInputDisplay; 