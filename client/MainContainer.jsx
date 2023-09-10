import React, { useState, useEffect } from "react";
import TotalsDisplay from "./components/TotalsDisplay.jsx";
import Roster from "./components/RosterContainer.jsx";
import CharacterInputDisplay from "./components/CharacterInputDisplay.jsx";
import { handleDelete } from "./features/delete";
import { updateGold } from "./features/goldEarningStatus";
import logo from "./assets/lostarkicon.png";

// this needs to handle state to pass down  the roster.
const MainContainer = () => {
  // state for roster array
  const [roster, updateRoster] = useState([]);
  const [characterInfo, updateCharacterInfo] = useState({
    name: "",
    ilvl: "",
    _class: "",
    isGoldEarner: false,
    restedOnly: false,
  });
  // state for character once input field is complete
  const [newCharacter, updateNewCharacter] = useState({});
  // state for deleted character (to trigger effect hook)
  const [deletedCharacter, updateDeletedCharacter] = useState({});

  // state for updated character
  const [updatedCharacter, updateCharacter] = useState({});

  const [goldEarnerCount, updateGoldEarners] = useState(0);

  const handleNewCharChange = (event) => {
    const fieldName = event.target.name;
    const fieldValue = event.target.value;
    const newState = { ...characterInfo };
    newState[fieldName] = fieldValue;
    updateCharacterInfo(newState);
  };

  const handleNewCharSubmit = (event) => {
    event.preventDefault();
    const copyCharacter = { ...characterInfo };
    // convert item level to number
    copyCharacter.ilvl = Number(copyCharacter.ilvl);
    // assert that destructuring of character info produces all necessary properties
    const { name, ilvl, isGoldEarner, _class } = characterInfo;
    if (
      name === "" ||
      Number.isNaN(ilvl) ||
      _class === "" ||
      isGoldEarner === ""
    ) {
      alert("Character info incomplete!");
      return;
    }
    // convert gold-earning status to boolean
    copyCharacter.isGoldEarner =
      characterInfo.isGoldEarner === "yes" ? true : false;
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
      .then((character) => {
        updateNewCharacter(character);
        updateCharacterInfo({});
      })
      .catch((err) => {
        alert("Character could not be created");
        console.log(err);
      });
  };

  const handleItemLevelUpdate = (event) => {
    event.preventDefault();

    const [name, goldString] = event.target.name.split(".");
    const ilvl = event.target[0].value;
    const isGoldEarner = goldString === "true";

    fetch("/character", {
      method: "PATCH",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        name: name,
        ilvl: ilvl,
        isGoldEarner: isGoldEarner,
      }),
    }).then((character) => updateCharacter(character));
    event.target[0].value = "";
  };

  // effect hook to get changes to character list. we will want to run this on page load, but also on submission of forms or  deletion of a character
  useEffect(() => {
    fetch("/character/characters")
      .then((response) => response.json())
      .then((characters) => {
        updateRoster(characters);
        updateGoldEarners(
          characters.reduce(
            (sum, character) => sum + (character.isGoldEarner ? 1 : 0),
            0
          )
        );
      });
  }, [newCharacter, deletedCharacter, updatedCharacter]);

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
      <CharacterInputDisplay
        characterInfo={characterInfo}
        handleChange={handleNewCharChange}
        handleSubmit={handleNewCharSubmit}
      />
      <Roster
        roster={roster}
        handleDelete={(e) => handleDelete(e, updateDeletedCharacter)}
        handleLevelUpdate={handleItemLevelUpdate}
        handleGoldUpdate={(e) =>
          updateGold(e, updateCharacter, updateGoldEarners, goldEarnerCount)
        }
      />
    </div>
  );
};

export default MainContainer;
