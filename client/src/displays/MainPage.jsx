import React, { useState, useEffect, useRef } from "react";
import TotalsDisplay from "../components/TotalsDisplay.jsx";
import Roster from "../components/RosterContainer.jsx";
import CharacterInputDisplay from "../components/CharacterInputDisplay.jsx";
import { handleDelete } from "../features/delete/index.js";
import { updateGoldEarners } from "../features/gold_earners/index.js";
import { toggleRestedOnly } from "../features/restBonus/index.js";
import { updatePrices } from "../utils/reference/index.js";
import {
  getRoster,
  createNewCharacter,
  updateCharacter,
} from "../utils/api/index.js";
import { useCharacter } from "../hooks/useCharacters.js";
import { useNavigate } from "react-router-dom";
import { handleLogout } from "../features/auth/index.js";
import { handleContentChange } from "../features/gold_content/index.js";
// this needs to handle state to pass down  the roster.

const MainPage = ({ user, setUser, prices }) => {
  // protection: if no user , navigate to root
  const navigate = useNavigate();
  useEffect(() => {
    //protect route
    if (user === "") navigate("/");
  }, []);

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

  // effect hook to get changes to character list. we will want to run this on page load, but also on submission of forms or  deletion of a character
  useEffect(() => {
    getRoster(user, updateRoster, goldEarners);
  }, [workingChar]);

  const handleNewCharChange = (e, charPropName, value) => {
    const characterSlice = {};
    characterSlice[charPropName] = value;
    updateNewCharacter({ ...newCharacter, ...characterSlice });
  };

  const handleContent = (e, character, content) => {
    handleContentChange(e, content, character, updateWorkingChar);
  };
  return (
    <main className={`bg-slate-800 max-h-full flex flex-col grow`}>
      <TotalsDisplay
        user={user}
        roster={roster}
        handleLogout={() => {
          handleLogout(navigate, setUser);
        }}
        priceRedirect={() => navigate("/prices")}
        prices={prices}
      />
      <CharacterInputDisplay
        handleSubmit={handleNewCharSubmit}
        user={user}
        character={newCharacter}
        handleChange={handleNewCharChange}
      />
      <Roster
        roster={roster}
        handleDelete={(e) => handleDelete(e, updateWorkingChar)}
        handleLevelUpdate={handleItemLevelUpdate}
        handleGoldEarnerUpdate={(e, character) =>
          updateGoldEarners(e, character, updateWorkingChar, goldEarners)
        }
        updateCharacter={updateWorkingChar}
        handleRestedUpdate={(e, character) =>
          toggleRestedOnly(e, character, updateWorkingChar)
        }
        handleContentChange={handleContent}
      />
    </main>
  );
};

export default MainPage;
