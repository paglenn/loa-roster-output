import React from 'react'; 
import icons from './icons.js';
import imageStyles from './styles/images.module.css';
import styles from './styles/totalsdisplay.module.css';
// should contain total roster gold income , silver, gems , leapstones, reds, blues 
// eventually table format ? 
// stetch feature-  images! 


const TotalsDisplay = (props) => {
  const {gold, silver, leapstones, gems, redStones,blueStones} = sumCharacterOutput(props.roster); 
  return (
  <div> 
    <h2> Total Weekly Output </h2>
    <ul className={styles.TotalsDisplay}>
    <li> <img src={icons.goldIcon} alt="roster gold"/> {gold}</li> 
    <li><img src={icons.silverIcon} alt="silver"/> {silver}</li> 
    <li><img src={icons.marvelous_honor_leapstone} alt="marvelous honor leapstones"/>  {leapstones}</li> 
    <li><img src={icons.gemIcon} alt="gem"/>{Math.round(gems) }</li> 
    <li><img src={icons.obliterationIcon} alt="obliteration stones"/> {Math.round(redStones)}</li> 
    <li><img src={icons.protectionIcon} alt="protection stones"/>{Math.round(blueStones)}</li> 

    </ul>
    
  </div>); 
} ; 

const sumCharacterOutput = (characterArray) => {
  const sumObj= {} ; 

  sumObj.gold = characterArray.reduce((sum, char) => sum + char.resources.gold, 0);
  sumObj.silver = characterArray.reduce((sum, char) => sum + char.resources.silver, 0);
  sumObj.leapstones = characterArray.reduce((sum, char) => {
    return  sum + (char.resources.leapstones.type === 'marvelous_honor_leapstone' ? char.resources.leapstones.qty : char.resources.leapstones.qty/5);
  }, 0);
  sumObj.leapstones = Math.round(sumObj.leapstones);

  sumObj.gems = characterArray.reduce((sum, char) => sum + char.resources.gems, 0);
  sumObj.gems = Math.round(sumObj.gems);
  sumObj.redStones= characterArray.reduce((sum, char) => {
    return sum + ( (char.resources.redStones.type === 'obliteration_stone') ? char.resources.redStones.qty : char.resources.redStones.qty/5 ); 
  }, 0)
  sumObj.redStones = Math.round(sumObj.redStones);
  sumObj.blueStones = characterArray.reduce((sum, char) => {
    return sum + ((char.resources.blueStones.type === 'protection_stone') ? char.resources.blueStones.qty : char.resources.blueStones.qty/5) ; 
  }, 0)
  sumObj.blueStones = Math.round(sumObj.blueStones);

  return sumObj; 
}

export default TotalsDisplay; 