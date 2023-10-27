import React, { useState } from "react";
import icons from "../utils/assets/icons";
import { Resource } from "../components/Resource.jsx";
import { resourceTypes, hasSubtype } from "../utils/reference";
import { getCharValue } from "../utils/sums";
import { DeleteButton } from "../features/delete";
import { GoldStatusBox } from "../features/goldUpdate";
import { RestedStatusBox } from "../features/restBonus";
import { ContentView, ShowContentButton } from "../features/gold_content";
import ResourceView from "../components/ResourceView";
const CharPortrait = React.lazy(() => import("../components/CharPortrait"));

const CharacterView = ({
  character,
  handleDelete,
  handleGoldUpdate,
  handleLevelUpdate,
  handleRestedUpdate,
}) => {
  const {
    name,
    _class,
    ilvl,
    resources,
    isGoldEarner,
    restedOnly,
    goldContents,
  } = character;
  const classLower = _class.toLowerCase();
  const charGoldValue = getCharValue({ resources }).toLocaleString();
  // create components for resource types
  const resourceComponents = resourceTypes.map((el, index) => {
    return (
      <Resource
        key={index}
        type={hasSubtype[el] ? resources[el].type : el}
        qty={hasSubtype[el] ? resources[el].qty : resources[el]}
        imHeight={8}
        goldValue={charGoldValue}
        showGoldValue={true}
      />
    );
  });
  // const cardColor = isGoldEarner ? "bg-[#d4af37]" : "bg-slate-300";
  const cardColor = "bg-slate-300";
  const [isContentShown, toggleContentShown] = useState(false);
  return (
    <div
      className={`lg:basis-1/5 grow lg:grow-0  ${cardColor} shrink items-start rounded p-1 m-2`}
    >
      {/* Character Name  and class icon container  */}
      <div className="flex flex-row justify-between content-center items-start">
        <span className="text-lg font-bold mb-2 mr-1"> {name} </span>
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
            alt={`${classLower} class icon`}
            src={icons[classLower]}
          />
        </div>
      </div>

      {/* Form to update item level  */}
      <form
        onSubmit={(e) => handleLevelUpdate(e, character)}
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
      <div className="mb-1 rounded flex flex-row">
        <CharPortrait classLower={classLower} />
      </div>

      {/* list of resources  */}
      {isContentShown ? (
        <ContentView goldContent={goldContents} />
      ) : (
        <ResourceView resources={resources} />
      )}
      {/* <ul className="list-none"> {resourceComponents}</ul> */}
      {/* Delete button  */}
      <div className="flex flex-row justify-between">
        <ShowContentButton
          isContentShown={isContentShown}
          clickHandler={() => toggleContentShown(!isContentShown)}
        />
        <DeleteButton name={name} handleDelete={handleDelete} />
      </div>
    </div>
  );
};

export default CharacterView;
