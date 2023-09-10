import React from "react";
import Character from "./Character.jsx";
import styles from "../styles/rostercontainer.module.css";
// container for roster's character cards
// must be passed down character array in props
const Roster = ({roster, handleLevelUpdate, handleDelete, handleGoldUpdate}) => {
  const characterCards = [];

  // sort roster by item level
  roster.sort((a, b) => {
    if (a.isGoldEarner && !b.isGoldEarner) return -1;
    if (!a.isGoldEarner && b.isGoldEarner) return 1;
    return b.ilvl - a.ilvl;
  });

  // create array of character card components to be rendered to the view
  roster.forEach((character) =>
    characterCards.push(
      <Character
        key={character.name}
        character={character}
        handleDelete={handleDelete}
        handleLevelUpdate={handleLevelUpdate}
        handleGoldUpdate={handleGoldUpdate}
      />
    )
  );
  return (
    <div className="flex flex-row h-100% flex-wrap justify-start px-10 pb-10">
      {characterCards}
    </div>
  );
};

export default Roster;
