import React, { useState, useEffect, useRef } from "react";
import TotalsDisplay from "../components/TotalsDisplay.jsx";
import Roster from "../components/RosterContainer.jsx";
import CharacterInputDisplay from "../components/CharacterInputDisplay.jsx";
import { CharacterService, PricesService } from "../services";
import { toggleRestedOnly } from "../features/rest_bonus";
import { useDispatch, useSelector } from "react-redux";

import { useCharacter } from "../hooks/useCharacters.js";
import { useNavigate } from "react-router-dom";

import { handleContentChange } from "../features/gold_content/index.js";

import { selectUser } from "../state/userSlice";
import { selectRoster, update_roster } from "../state/rosterSlice.js";

import { selectGoldEarners, setGoldEarners } from "../state/goldEarnerSlice.js";
import { update_prices } from "../state/pricesSlice.js";

// this needs to handle state to pass down  the roster.

const MainPage = ({ pricesService }) => {
  // protection: if no user , navigate to root
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const characterService = new CharacterService();

  const user = useSelector(selectUser);
  useEffect(() => {
    //protect route
    if (!user) navigate("/");
  }, [user]);

  // state for roster array-  a change in this does need to cause a re-render of the roster container

  const roster = useSelector(selectRoster);

  const updateRosterState = (characters) => dispatch(update_roster(characters));
  // custom hook for new character. we are going to retool new character inputs to use this hook so the form properly clears after submission
  const [newCharacter, updateNewCharacter] = useCharacter(user);
  // state for updated character
  const [workingChar, updateWorkingChar] = useState({});
  // ref hook for gold earner count - it does not need to trigger re-render
  const numGoldEarners = useSelector(selectGoldEarners);
  const countGoldEarners = (n) => dispatch(setGoldEarners(n));
  const handleNewCharSubmit = async (event, characterInfo) => {
    event.preventDefault();
    const copyCharacter = { ...characterInfo };
    // convert item level to number
    copyCharacter.ilvl = Number(copyCharacter.ilvl);
    // assert that destructuring of character info produces all necessary properties
    //const { name, ilvl, isGoldEarner, _class, restedOnly } = characterInfo;
    const newCharacter = await characterService.create(
      copyCharacter,
      numGoldEarners
    );

    if (newCharacter) {
      UpdateRoster();
      updateNewCharacter();
      // reset input fields!
    }
  };

  const handleItemLevelUpdate = async (event, character) => {
    event.preventDefault();
    const ilvl = event.target[0].value;
    let characterInfo = { ...character, ilvl };
    characterService
      .update({ ...characterInfo, itemLevelDidUpdate: true })
      .then((updatedChar) => updateWorkingChar(updatedChar));
    event.target[0].value = ""; // clear the form field
  };

  // effect hook to get changes to character list. we will want to run this on page load, but also on submission of forms or  deletion of a character
  async function UpdateRoster() {
    const characters = await characterService.GetAll(user);
    updateRosterState(characters);
    countGoldEarners(
      characters.reduce(
        (sum, character) => sum + (character.isGoldEarner ? 1 : 0),
        0
      )
    );
  }
  useEffect(() => {
    UpdateRoster();
    // get prices from api/database if saved for user
    // if prices are not saved for user, getPrices will return null
    pricesService.GetAll(user).then((prices) => {
      if (prices) dispatch(update_prices(prices));
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
        handleLevelUpdate={handleItemLevelUpdate}
        handleRestedUpdate={(e, character) =>
          toggleRestedOnly(e, character, updateWorkingChar)
        }
        handleContentChange={handleContent}
        characterService={characterService}
      />
    </main>
  );
};

export default MainPage;
