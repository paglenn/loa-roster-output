import React from "react";
import styles from "../styles/charactercard.module.css";
import imageStyles from "../styles/images.module.css";
import icons from "../icons";
import classImages from "../classImages";
import { Resource } from "./Resource.jsx";
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
      className={`bg-slate-300 p-2 ${styles.characterCard} ${
        isGoldEarner ? styles.gold : ""
      }`}
    >
      {/* Character Name  and class icon container  */}
      <div className="flex flex-row justify-between align-middle">
        <span className=" font-bold"> {name} </span>
        <span>{ilvl} </span>
        <div className="flex flex-col">
          <text className="text-sm"> Gold? </text>
          <input
            type="checkbox"
            name={`${name}.${ilvl}`}
            checked={isGoldEarner}
            onChange={props.handleGoldUpdate}
          />
        </div>
        <img className={imageStyles.classIcon} src={icons[classLower]} />{" "}
      </div>

      {/* Character item level container  */}
      <div className={`flex flex-col ${styles.ilvl}`}>
        {/* Item level display and updating  */}

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
            className=" p-1 rounded bg-slate-300 border-black border-2 "
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
        className="bg-red-400 rounded border-solid border-black border-2 p-1"
      >
        Delete
      </button>
    </div>
  );
};

export default Character;
