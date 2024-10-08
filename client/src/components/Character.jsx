// Character card component
// component imports
import React, { useState, Suspense } from "react";

import icons from "../utils/assets/icons";
import { FaSpinner } from "react-icons/fa6";

import { DeleteButton } from "../features/delete";
import { GoldStatusBox } from "../features/gold_earners";
import { RestedStatusBox } from "../features/rest_bonus";
import { ContentView, ShowContentButton } from "../features/gold_content";

import ResourceView from "./ResourceView";
import CharPortrait from "./CharPortrait";

// redux imports
import { useDispatch, useSelector } from "react-redux";
import { update_roster } from "../state/rosterSlice";
import { selectUser } from "../state/userSlice";

const Character = ({
  character,
  characterService,
  handleLevelUpdate,
  handleRestedUpdate,
  handleContentChange,
}) => {
  const { name, _class, ilvl, resources, isGoldEarner, restedOnly } = character;
  const classLower = _class.toLowerCase();

  const CHAR_CARD_COLOR = "bg-slate-300";
  const [isContentShown, toggleContentShown] = useState(false);

  const dispatch = useDispatch();

  const user = useSelector(selectUser);

  const refreshRoster = async () => {
    characterService
      .GetAll(user)
      .then((characters) => dispatch(update_roster(characters)));
  };

  return (
    <section
      className={`lg:basis-9 ${CHAR_CARD_COLOR} shrink rounded p-1 m-2 flex flex-col items-stretch`}
    >
      {/* Character Name  and class icon container  */}
      <header className="flex flex-row justify-between content-center items-start">
        <span className="text-lg font-bold mb-2 mr-1"> {name} </span>
        <span className="text-lg">{ilvl} </span>
        <GoldStatusBox isGoldEarner={isGoldEarner} character={character} />
        <RestedStatusBox
          restedOnly={restedOnly}
          handleClick={(e) => handleRestedUpdate(e, character)}
        />
        {/* <figure className="basis-1/12 grow-0 self-center">
          <img
            className="bg-black rounded"
            alt={`${classLower} class icon`}
            src={icons[classLower]}
          />
        </figure> */}
      </header>

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
      <Suspense fallback={<FaSpinner />}>
        <figure className="mb-1 rounded flex flex-row basis-1/3">
          <CharPortrait className={classLower} />
        </figure>
      </Suspense>

      {/* list of resources  */}
      <section className="basis-5/12">
        {isContentShown && isGoldEarner ? (
          <ContentView
            character={character}
            handleContentChange={(e, content) =>
              handleContentChange(e, character, content)
            }
          />
        ) : (
          <ResourceView resources={resources} />
        )}
      </section>

      <section className="flex flex-row justify-between items-center basis-1/12">
        {isGoldEarner ? (
          <ShowContentButton
            isContentShown={isContentShown}
            clickHandler={() => toggleContentShown(!isContentShown)}
          />
        ) : null}
        <details>
          <summary> Delete Character </summary>
          <DeleteButton name={name} refresh={refreshRoster} />
        </details>
      </section>
    </section>
  );
};

export default Character;
