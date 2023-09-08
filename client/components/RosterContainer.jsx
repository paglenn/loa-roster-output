import React from "react";
import Character from "./Character.jsx";
import styles from "../styles/rostercontainer.module.css";
// container for roster's character cards
// must be passed down character array in props
const Roster = (props) => {
  const characterCards = [];

  // sort roster by item level
  props.roster.sort((a, b) => {
    if (a.isGoldEarner && !b.isGoldEarner) return -1;
    if (!a.isGoldEarner && b.isGoldEarner) return 1;
    return b.ilvl - a.ilvl;
  });

  // create array of character card components to be rendered to the view
  props.roster.forEach((character) =>
    characterCards.push(
      <Character
        key={character.name}
        character={character}
        handleDelete={props.handleDelete}
        handleLevelUpdate={props.handleLevelUpdate}
        handleGoldUpdate={props.handleGoldUpdate}
      />
    )
  );
  return <div className={styles.rosterContainer}>{characterCards}</div>;
};

export default Roster;
