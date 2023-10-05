import React, { useState, useEffect, useRef } from "react";
import TotalsDisplay from "./TotalsDisplay.jsx";
import Roster from "./RosterContainer.jsx";
import CharacterInputDisplay from "./CharacterInputDisplay.jsx";
import { handleDelete } from "../features/delete";
import { updateGold } from "../features/goldUpdate";
import { toggleRestedOnly } from "../features/restBonus";
import axios from "axios";
import { vercelPrefix } from "../utils/api/vercel.js";
import { updatePrices } from "../utils/reference";
import { getRoster, createNewCharacter } from "../utils/api";
// this needs to handle state to pass down  the roster.
const MainContainer = ({ user }) => {
  // state for roster array
  const [roster, updateRoster] = useState([]);

  // state for updated character
  const [updatedCharacter, updateCharacter] = useState({});
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
      createNewCharacter(user, copyCharacter, updateCharacter);
    }
    
  };

  const handleItemLevelUpdate = (event, character) => {
    event.preventDefault();
    const ilvl = event.target[0].value;
    axios
      .patch(`${vercelPrefix}/api/character`, {
        ...character,
        ilvl,
      })
      .then(({ data }) => updateCharacter(data))
      .catch((err) => console.log(err));
    event.target[0].value = "";
  };

  // effect hook to update prices
  useEffect(() => {
    updatePrices();
  }, []);

  // effect hook to get changes to character list. we will want to run this on page load, but also on submission of forms or  deletion of a character
  useEffect(() => {
    getRoster(user, updateRoster, goldEarners);
  }, [updatedCharacter]);

  return (
    <div className={`bg-slate-800 max-h-full flex flex-col grow`}>
      <TotalsDisplay user={user} roster={roster} />
      <CharacterInputDisplay
        handleSubmit={handleNewCharSubmit}
        user={user}
        character={updatedCharacter}
      />
      <Roster
        roster={roster}
        handleDelete={(e) => handleDelete(e, updateCharacter)}
        handleLevelUpdate={handleItemLevelUpdate}
        handleGoldUpdate={(e, character) =>
          updateGold(e, character, updateCharacter, goldEarners)
        }
        updateCharacter={updateCharacter}
        handleRestedUpdate={(e, character) =>
          toggleRestedOnly(e, character, updateCharacter)
        }
      />
    </div>
  );
};

export default MainContainer;
