import React from "react";
import styles from "../styles/charactercard.module.css";
import imageStyles from "../styles/images.module.css";
import icons from "../icons.js";
import classImages from "../classImages.js";

// render character cards
const Character = (props) => {
  const { name, _class, ilvl, resources, isGoldEarner } = props.character;
  const classLower = _class.toLowerCase();
  // define resource types
  const resourceTypes = [
    "gold",
    "silver",
    "gems",
    "leapstones",
    "redStones",
    "blueStones",
  ];
  const hasSubtype = { leapstones: true, redStones: true, blueStones: true };

  // create components for resource types
  const resourceComponents = resourceTypes.map((el) => {
    // console.log(
    //   el,
    //   resources[el],
    //   hasSubtype[el] ? resources[el].type : el,
    //   hasSubtype[el] ? resources[el].qty : resources[el]
    // );
    return (
      <Resource
        type={hasSubtype[el] ? resources[el].type : el}
        qty={hasSubtype[el] ? resources[el].qty : resources[el]}
      />
    );
  });

  return (
    <div
      className={`${styles.characterCard} ${isGoldEarner ? styles.gold : ""}`}
    >
      {/* Character Name  and class icon container  */}
      <div>
        {" "}
        <span className=" font-bold float-left"> {name} </span>
        <input
          type="checkbox"
          name={`${name}.${ilvl}`}
          checked={isGoldEarner}
          onChange={props.handleGoldUpdate}
        />
        <img className={imageStyles.classIcon} src={icons[classLower]} />{" "}
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
          className="flex flex-row justify-around"
        >
          <input
            className={styles.ilvlInput}
            type="text"
            name={`${name}.${isGoldEarner}`}
          />

          <input
            type="submit"
            value="Update iLvL"
            className=" rounded bg-slate-300 border-black border-2 "
          />
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

        {/* list of resources  */}
        <ul className="list-none"> {resourceComponents}</ul>
      </div>

      {/* Delete button  */}
      <button
        id={name}
        onClick={props.handleDelete}
        className="bg-red-400 rounded border-solid border-black border-2"
      >
        Delete
      </button>
    </div>
  );
};

const Resource = ({ type, qty }) => {
  // guarantee type singular for gems
  let iconName = type;
  if (type[type.length - 1] === "s") iconName = iconName.slice(0, -1);
  return (
    <li className="flex flex-row justify-between">
      <img src={icons[iconName]} className="h-12 w-12 rounded-md" />
      <div> {Math.round(qty)} </div>
    </li>
  );
};

export default Character;
