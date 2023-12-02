import React from "react";
import CharacterView from "./Character.jsx";
import { useSelector } from "react-redux";
import { selectRoster } from "../state/rosterSlice.js";
// container for roster's character cards
// must be passed down character array in props
const Roster = ({
  handleLevelUpdate,
  handleDelete,
  handleGoldEarnerUpdate,
  handleRestedUpdate,
  handleContentChange,
}) => {
  const characterCards = [];

  // sort roster by item level
  const roster = useSelector(selectRoster);

  // create array of character card components to be rendered to the view
  roster.forEach((character) =>
    characterCards.push(
      <CharacterView
        key={character.name}
        character={character}
        handleDelete={handleDelete}
        handleLevelUpdate={handleLevelUpdate}
        handleGoldEarnerUpdate={handleGoldEarnerUpdate}
        handleRestedUpdate={handleRestedUpdate}
        handleContentChange={handleContentChange}
      />
    )
  );
  return (
    <div className="flex flex-row flex-wrap justify-start px-10 pb-10">
      {characterCards}
    </div>
  );
};

export default Roster;
