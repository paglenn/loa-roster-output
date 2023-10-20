import React, { useState, useEffect, useRef } from "react";
import TotalsDisplay from "../components/TotalsDisplay.jsx";
import Roster from "../components/RosterContainer.jsx";
import CharacterInputDisplay from "../components/CharacterInputDisplay.jsx";
import { handleDelete } from "../features/delete/index.js";
import { updateGold } from "../features/goldUpdate/index.js";
import { toggleRestedOnly } from "../features/restBonus/index.js";
import { updatePrices } from "../utils/reference";
import { getRoster, createNewCharacter, updateCharacter } from "../utils/api";
import { useCharacter } from "../hooks/useCharacters.js";
// this needs to handle state to pass down  the roster.
const MainPage = ({ user }) => {
  // state for roster array-  a change in this does need to cause a re-render of the roster container
  const [roster, updateRoster] = useState([]);
  // custom hook for new character. we are going to retool new character inputs to use this hook so the form properly clears after submission
  const [newCharacter, updateNewCharacter] = useCharacter(user);
  // state for updated character
  const [workingChar, updateWorkingChar] = useState({});
  // ref hook for gold earner count - it does not need to trigger re-render
  const goldEarners = useRef(0);

  const handleNewCharSubmit = (event, characterInfo) => {
    event.preventDefault();
    const copyCharacter = { ...characterInfo };
    // convert item level to number
    copyCharacter.ilvl = Number(copyCharacter.ilvl);
    // assert that destructuring of character info produces all necessary properties
    const { name, ilvl, isGoldEarner, _class, restedOnly } = characterInfo;
    if (name === "" || Number.isNaN(ilvl) || _class === "") {
      alert("Character info incomplete!");
      return;
    }

    if (copyCharacter.isGoldEarner && goldEarners.current === 6) {
      alert("Nice try - but you can only have up to six gold earners!");
    } else {
      createNewCharacter(copyCharacter, updateWorkingChar);
      updateNewCharacter();
    }
  };

  const handleItemLevelUpdate = async (event, character) => {
    event.preventDefault();
    const ilvl = event.target[0].value;
    let characterInfo = { ...character, ilvl };
    console.log(characterInfo);
    updateCharacter(characterInfo).then((updatedChar) =>
      updateWorkingChar(updatedChar)
    );
    event.target[0].value = ""; // clear the form field
  };

  // effect hook to update prices
  useEffect(() => {
    updatePrices();
  }, []);

  // effect hook to get changes to character list. we will want to run this on page load, but also on submission of forms or  deletion of a character
  useEffect(() => {
    getRoster(user, updateRoster, goldEarners);
  }, [workingChar]);

  const newCharChangeHandler = (e, charPropName, value) => {
    const characterSlice = {};
    characterSlice[charPropName] = value;
    updateNewCharacter({ ...newCharacter, ...characterSlice });
  };

  return (
    <div className={`bg-slate-800 max-h-full flex flex-col grow`}>
      <TotalsDisplay user={user} roster={roster} />
      <CharacterInputDisplay
        handleSubmit={handleNewCharSubmit}
        user={user}
        character={newCharacter}
        handleChange={newCharChangeHandler}
      />
      <Roster
        roster={roster}
        handleDelete={(e) => handleDelete(e, updateWorkingChar)}
        handleLevelUpdate={handleItemLevelUpdate}
        handleGoldUpdate={(e, character) =>
          updateGold(e, character, updateWorkingChar, goldEarners)
        }
        updateCharacter={updateWorkingChar}
        handleRestedUpdate={(e, character) =>
          toggleRestedOnly(e, character, updateWorkingChar)
        }
      />
    </div>
  );
};

export default MainPage;
