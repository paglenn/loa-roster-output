import React from "react";
import styles from "./styles/charactercard.module.css";
import imageStyles from "./styles/images.module.css";
import icons from "./icons.js";
import classImages from "./classImages.js";

// render character cards
const Character = (props) => {
  const { name, _class, ilvl, resources, isGoldEarner } = props.character;
  const classNameIcon = _class.toLowerCase() + "Icon";
  return (
    <div
      className={`${styles.characterCard} ${isGoldEarner ? styles.gold : ""}`}
    >
      {/* Character Name  and class icon container  */}
      <div>
        {" "}
        Name: <span className="underline"> {name} </span>
        <img
          className={imageStyles.classIcon}
          src={icons[classNameIcon]}
        />{" "}
      </div>

      {/* Character item level container  */}
      <div className={styles.ilvl}>
        {/* Item level display and updating  */}
        <span>
          Item Level: <b>{ilvl} </b>{" "}
        </span>
        {/* Form to update item level  */}
        <form
          onSubmit={props.handleLevelUpdate}
          name={`${name}.${isGoldEarner}`}
        >
          <input
            className={styles.ilvlInput}
            type="text"
            name={`${name}.${isGoldEarner}`}
          />
          <span> </span>
          <input type="submit" value="Update iLvL" />
        </form>
      </div>

      <div className={styles.imgAndResourceContainer}>
        {/* Class Picture  */}
        <div className={styles.imgContainer}>
          {" "}
          <img
            className={`${imageStyles.CharModel}  ${
              isGoldEarner ? imageStyles.gold : ""
            }`}
            src={classImages[_class.toLowerCase()]}
          />{" "}
        </div>

        {/* list of resources-  should conver to unordered list  */}
        <div>
          <div>
            <img src={icons.goldIcon} alt={`${name} gold `} />
            <span> </span>
            {Math.round(resources.gold)}
            <input
              type="checkbox"
              name={`${name}.${ilvl}`}
              checked={isGoldEarner}
              onChange={props.handleGoldUpdate}
            />
          </div>
          <div>
            <img src={icons.silverIcon} alt={`${name} silver`} />{" "}
            {Math.round(resources.silver)}
          </div>
          <div>
            <img
              className={imageStyles.gem}
              src={icons.gemIcon}
              alt={`${name} gems `}
            />{" "}
            {Math.round(resources.gems)}
          </div>
          <div>
            <img
              src={icons[resources.leapstones.type]}
              alt={`${name} leapstones`}
            />{" "}
            {Math.round(resources.leapstones.qty)}{" "}
          </div>
          <div>
            <img
              src={icons[resources.redStones.type]}
              alt={`${name} ${resources.redStones.type}`}
            />{" "}
            {Math.round(resources.redStones.qty)}{" "}
          </div>
          <div>
            {" "}
            <img
              src={icons[resources.blueStones.type]}
              alt={`${name} ${resources.blueStones.type}`}
            />{" "}
            {Math.round(resources.blueStones.qty)}{" "}
          </div>
        </div>
      </div>

      {/* Delete button  */}
      <button id={name} onClick={props.handleDelete}>
        {" "}
        Delete Character{" "}
      </button>
    </div>
  );
};

export default Character;
