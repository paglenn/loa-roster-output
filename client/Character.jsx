import React from 'react'; 
import styles from './styles/charactercard.module.css';
import imageStyles from './styles/images.module.css';
import icons from './icons.js';
import classImages from './classImages.js';

// render character cards 
const Character = (props) => {
 const {name , _class, ilvl, resources,isGoldEarner} = props.character; 
 const classNameIcon = _class.toLowerCase()+'Icon'; 
 return (
  <div className={`${styles.characterCard} ${isGoldEarner ? styles.gold : ''}` }> 
    <div> Name: {name} <img src={icons[classNameIcon]} /> </div>

    <div className={styles.ilvl}> 
        {/* Item level display and updating  */}
      <span>Item Level: {ilvl} </span>
      {/* Form to update item level  */}
      <form onSubmit={props.handleUpdate} name={`${name}.${isGoldEarner}`}>
        <input className={styles.ilvlInput} type="text" name={`${name}.${isGoldEarner}`}/> 
        <span>  </span>
        <input type="submit" value="Update" />
      </form>
    </div>
    
    <div className={styles.imgAndResourceContainer}> 
    {/* Class Picture  */}
      <div className={styles.imgContainer}> <img className={imageStyles.CharModel} src={classImages[_class.toLowerCase()]}/> </div>

      {/* list of resources-  should conver to unordered list  */}
      <div>
        <div> <img src={icons.goldIcon} alt={`${name} gold `}/> {Math.round(resources.gold)}</div>
        <div><img src={icons.silverIcon} alt={`${name} silver`}/> {Math.round(resources.silver)}</div>
        <div><img src={icons.gemIcon} alt={`${name} gems `}/> {Math.round(resources.gems)}</div>
        <div><img src={icons[resources.leapstones.type]} alt={`${name} leapstones`}/> {Math.round(resources.leapstones.qty)} </div>
        <div><img src={icons[resources.redStones.type]} alt={`${name} ${resources.redStones.type}`}/> {Math.round(resources.redStones.qty)}  </div>
        <div> <img src={icons[resources.blueStones.type]} alt={`${name} ${resources.blueStones.type}`}/> {Math.round(resources.blueStones.qty)} </div>
      </div>

    </div>
    

    
    {/* Delete button  */}
    <button id={name} onClick={props.handleDelete}> Delete Character </button>
  </div>
  
 )
}

export default Character; 