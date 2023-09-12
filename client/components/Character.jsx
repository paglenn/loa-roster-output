import React from "react";
import icons from "../helpers/icons";
import classImages from "../helpers/classImages";
import { Resource } from "./Resource.jsx";
import { resourceTypes, hasSubtype } from "../helpers/reference";
import { DeleteButton } from "../features/delete";
import { GoldStatusBox } from "../features/goldEarningStatus";
import { RestedStatusBox } from "../features/restBonus";
// render character cards
const Character = ({
  character,
  handleDelete,
  handleGoldUpdate,
  handleLevelUpdate,
  handleRestedUpdate,
}) => {
  //console.log(character);
  const { name, _class, ilvl, resources, isGoldEarner, restedOnly } = character;
  const classLower = _class.toLowerCase();

  // create components for resource types
  const resourceComponents = resourceTypes.map((el, index) => {
    return (
      <Resource
        key={index}
        type={hasSubtype[el] ? resources[el].type : el}
        qty={hasSubtype[el] ? resources[el].qty : resources[el]}
        imHeight={8}
      />
    );
  });
  const cardColor = isGoldEarner ? "bg-[#d4af37]" : "bg-slate-300";
  return (
    <div
      className={` basis-1/6 ${cardColor} p-2 shrink-1 items-start m-3 rounded`}
    >
      {/* Character Name  and class icon container  */}
      <div className="flex flex-row justify-between content-center items-start">
        <span className="text-lg font-bold mb-2"> {name} </span>
        <span className="text-lg">{ilvl} </span>
        <GoldStatusBox
          isGoldEarner={isGoldEarner}
          handleGoldUpdate={(e) => handleGoldUpdate(e, character)}
        />
        <RestedStatusBox
          restedOnly={restedOnly}
          handleClick={(e) => handleRestedUpdate(e, character)}
        />
        <div className="basis-1/8 grow-0 self-center">
          <img
            className="bg-black max-w-8 max-h-8 rounded"
            src={icons[classLower]}
          />
        </div>
      </div>

      {/* Form to update item level  */}
      <form
        onSubmit={handleLevelUpdate}
        name={`${name}.${isGoldEarner}`}
        className="flex flex-row justify-between items-center"
      >
        <span className="italic">{_class} </span>
        <input
          className="rounded w-16 text-sm"
          type="text"
          placeholder="new iLvL"
          name={`${name}.${isGoldEarner}`}
        />

        <input
          type="submit"
          value="Update item level"
          className=" text-xs p-1 rounded bg-slate-300 border-black border-2 "
        />
      </form>

      {/* Class Picture  */}
      <div className="">
        <img
          className={"rounded border-black border-2 mb-1 w-100%"}
          src={classImages[_class.toLowerCase()]}
        />{" "}
      </div>

      {/* list of resources  */}
      <ul className="list-none"> {resourceComponents}</ul>
      {/* Delete button  */}
      <DeleteButton name={name} handleDelete={handleDelete} />
    </div>
  );
};

export default Character;
