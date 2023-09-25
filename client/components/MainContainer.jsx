import React, { useState, useEffect, useRef } from "react";
import TotalsDisplay from "./TotalsDisplay.jsx";
import Roster from "./RosterContainer.jsx";
import CharacterInputDisplay from "./CharacterInputDisplay.jsx";
import { handleDelete } from "../features/delete/index.js";
import { updateGold } from "../features/goldEarningStatus/index.js";
import { toggleRestedOnly } from "../features/restBonus/index.js";
import axios from "axios";
// this needs to handle state to pass down  the roster.
const MainContainer = ({ user }) => {
  // state for roster array

  const [roster, updateRoster] = useState([]);

  // state for deleted character (to trigger effect hook)
  //const [deletedCharacter, updateDeletedCharacter] = useState({});

  // state for updated character
  const [updatedCharacter, updateCharacter] = useState({});

  const [goldEarnerCount, updateGoldEarners] = useState(0);

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

    if (copyCharacter.isGoldEarner && goldEarnerCount === 6) {
      alert("Nice try - but you can only have up to six gold earners!");
      return;
    }
    axios
      .post(`/character?user=${user}`, { ...copyCharacter })
      .then(({ data }) => updateCharacter(data))
      .catch((err) => {
        alert("Character could not be created");
        console.log(err);
      });
  };

  const handleItemLevelUpdate = (event, character) => {
    event.preventDefault();
    const ilvl = event.target[0].value;
    axios
      .patch("/character", {
        ...character,
        ilvl,
      })
      .then(({ data }) => updateCharacter(data));
    event.target[0].value = "";
  };

  // effect hook to get changes to character list. we will want to run this on page load, but also on submission of forms or  deletion of a character
  useEffect(() => {
    // axios conversion
    axios
      .get(`/character/characters?user=${user}`)
      .then((response) => response.data)
      .then((characters) => {
        updateRoster(characters);
        updateGoldEarners(
          characters.reduce(
            (sum, character) => sum + (character.isGoldEarner ? 1 : 0),
            0
          )
        );
      });
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
          updateGold(
            e,
            character,
            updateCharacter,
            updateGoldEarners,
            goldEarnerCount
          )
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
