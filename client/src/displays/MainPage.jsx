import React, { useState, useEffect, useRef } from "react";
import TotalsDisplay from "../components/TotalsDisplay.jsx";
import Roster from "../components/RosterContainer.jsx";
import CharacterInputDisplay from "../components/CharacterInputDisplay.jsx";
import { handleDelete } from "../features/delete/index.js";
import { updateGoldEarners } from "../features/gold_earners";
import { toggleRestedOnly } from "../features/rest_bonus";
import { useDispatch, useSelector } from "react-redux";
import {
  getRoster,
  createNewCharacter,
  updateCharacter,
} from "../utils/api/index.js";
import { useCharacter } from "../hooks/useCharacters.js";
import { useNavigate } from "react-router-dom";

import { handleContentChange } from "../features/gold_content/index.js";
import { region_change } from "../features/region_change/regionSlice.js";

import { selectUser } from "../state/userSlice";
import { selectRoster, update_roster } from "../state/rosterSlice.js";
import { selectCharacter } from "../state/characterSlice.js";
import { selectGoldEarners, setGoldEarners } from "../state/goldEarnerSlice.js";
// this needs to handle state to pass down  the roster.

const MainPage = () => {
  // protection: if no user , navigate to root
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  useEffect(() => {
    //protect route
    if (!user) navigate("/");
    else {
      // if there is a user stored region then change the region to that one
      if (user.region) dispatch(region_change(user.region));
    }
  }, [user]);

  // state for roster array-  a change in this does need to cause a re-render of the roster container

  const roster = useSelector(selectRoster);

  const updateRoster = (characters) => dispatch(update_roster(characters));
  // custom hook for new character. we are going to retool new character inputs to use this hook so the form properly clears after submission
  const [newCharacter, updateNewCharacter] = useCharacter(user);
  // state for updated character
  const [workingChar, updateWorkingChar] = useState({});
  // ref hook for gold earner count - it does not need to trigger re-render
  const goldEarners = useSelector(selectGoldEarners);
  const countGoldEarners = (n) => dispatch(setGoldEarners(n));
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

    if (copyCharacter.isGoldEarner && goldEarners >= 6) {
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
    updateCharacter({ ...characterInfo, itemLevelDidUpdate: true }).then(
      (updatedChar) => updateWorkingChar(updatedChar)
    );
    event.target[0].value = ""; // clear the form field
  };

  // effect hook to get changes to character list. we will want to run this on page load, but also on submission of forms or  deletion of a character
  useEffect(() => {
    getRoster(user).then((characters) => {
      updateRoster(characters);
      countGoldEarners(
        characters.reduce(
          (sum, character) => sum + (character.isGoldEarner ? 1 : 0),
          0
        )
      );
    });
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
        roster={roster}
        priceRedirect={() => navigate("/prices")}
      />
      <CharacterInputDisplay
        handleSubmit={handleNewCharSubmit}
        character={newCharacter}
        handleChange={handleNewCharChange}
      />
      <Roster
        handleDelete={(e) => handleDelete(e, updateWorkingChar)}
        handleLevelUpdate={handleItemLevelUpdate}
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
