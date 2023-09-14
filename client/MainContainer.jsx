import React, { useState, useEffect, useRef } from "react";
import TotalsDisplay from "./components/TotalsDisplay.jsx";
import Roster from "./components/RosterContainer.jsx";
import CharacterInputDisplay from "./components/CharacterInputDisplay.jsx";
import { handleDelete } from "./features/delete";
import { updateGold } from "./features/goldEarningStatus";
import { toggleRestedOnly } from "./features/restBonus/index.js";
import logo from "./assets/lostarkicon.png";
import axios from "axios";
// this needs to handle state to pass down  the roster.
const MainContainer = () => {
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
    // console.log('request body: ', JSON.stringify(copyCharacter));
    fetch("/character", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(copyCharacter),
    })
      .then((char) => {
        updateCharacter(char);
        //updateCharacterInfo({});
      })
      .catch((err) => {
        alert("Character could not be created");
        console.log(err);
      });
  };

  const handleItemLevelUpdate = (event, character) => {
    event.preventDefault();

    const [name, goldString] = event.target.name.split(".");
    const ilvl = event.target[0].value;
    const isGoldEarner = goldString === "true";

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
      .get("/character/characters")
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
    <div className={`MainContainer bg-slate-800 h-100%`}>
      <h1 className="pb-2">
        <div className="uppercase text-center text-white text-3xl">
          <img
            className="float-left h-fit w-8 align-top"
            src={logo}
            alt="Lost Ark Logo Left"
          />
          Lost Ark Roster Production{" "}
          <img
            className="float-right h-fit w-8 align-top"
            src={logo}
            alt="Lost Ark Logo Right"
          />
        </div>
      </h1>
      <TotalsDisplay roster={roster} />
      <CharacterInputDisplay handleSubmit={handleNewCharSubmit} />
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
