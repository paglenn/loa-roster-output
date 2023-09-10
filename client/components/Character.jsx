import React from "react";
import styles from "../styles/charactercard.module.css";
import imageStyles from "../styles/images.module.css";
import icons from "../helpers/icons";
import classImages from "../helpers/classImages";
import { Resource } from "./Resource.jsx";
import { resourceTypes, hasSubtype } from "../helpers/reference";
import { DeleteButton } from "../features/delete";
import { GoldStatusBox } from "../features/goldEarningStatus";
// render character cards
const Character = ({
  character,
  handleDelete,
  handleGoldUpdate,
  handleLevelUpdate,
}) => {
  //console.log(character);
  const { name, _class, ilvl, resources, isGoldEarner } = character;
  const classLower = _class.toLowerCase();

  // create components for resource types
  const resourceComponents = resourceTypes.map((el) => {
    return (
      <Resource
        type={hasSubtype[el] ? resources[el].type : el}
        qty={hasSubtype[el] ? resources[el].qty : resources[el]}
        imHeight={8}
      />
    );
  });

  return (
    <div
      className={` basis-1/7 bg-slate-300 p-2 ${styles.characterCard} ${
        isGoldEarner ? styles.gold : ""
      }`}
    >
      {/* Character Name  and class icon container  */}
      <div className="flex flex-row justify-between align-middle">
        <span className=" font-bold"> {name} </span>
        <span>{ilvl} </span>
        <GoldStatusBox
          name={name}
          ilvl={ilvl}
          isGoldEarner={isGoldEarner}
          handleGoldUpdate={handleGoldUpdate}
        />
        {/* <div className="flex flex-col">
          <text className="text-sm"> Gold? </text>
          <input
            type="checkbox"
            name={`${name}.${ilvl}`}
            checked={isGoldEarner}
            onChange={handleGoldUpdate}
          />
        </div> */}
        <img className={imageStyles.classIcon} src={icons[classLower]} />{" "}
      </div>

      {/* Character item level container  */}

      {/* Form to update item level  */}
      <form
        onSubmit={handleLevelUpdate}
        name={`${name}.${isGoldEarner}`}
        className="flex flex-row justify-between"
      >
        <input
          className="rounded w-28"
          type="text"
          placeholder="new iLvL"
          name={`${name}.${isGoldEarner}`}
        />

        <input
          type="submit"
          value="Update item level"
          className=" text-sm p-1 rounded bg-slate-300 border-black border-2 "
        />
      </form>

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
      <DeleteButton name={name} handleDelete={handleDelete} />
      {/* <button
        id={name}
        onClick={handleDelete}
        className="bg-red-400 rounded border-solid border-black border-2 p-1"
      >
        Delete
      </button> */}
    </div>
  );
};

export default Character;
