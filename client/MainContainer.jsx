import React, { useState, useEffect } from "react";
import TotalsDisplay from "./components/TotalsDisplay.jsx";
import Roster from "./RosterContainer.jsx";
import CharacterInputDisplay from "./components/CharacterInputDisplay.jsx";
import mainStyles from "./styles/common.module.css";
import logo from "../assets/lostarkicon.png";

// this needs to handle state to pass down  the roster.
const MainContainer = () => {
  // state for roster array
  const [roster, updateRoster] = useState([]);
  const [characterInfo, updateCharacterInfo] = useState({});
  // state for character once input field is complete
  const [newCharacter, updateNewCharacter] = useState({});
  // state for deleted character (to trigger effect hook)
  const [deletedCharacter, updateDeletedCharacter] = useState({});

  // state for updated character
  const [updatedCharacter, updateCharacter] = useState({});

  const [goldEarnerCount, updateGoldEarners] = useState(0);

  const handleNewCharChange = (event) => {
    // console.log(event.target);
    // console.log(event.target.name)
    // console.log(event.target.value);
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
        alert("Invalid input!");
        console.log(err);
      });
  };
  const handleDelete = (event) => {
    // send a fetch request to delete the character
    // then use updateDeletedCharacter to update state
    // will updateDeletedCharacter to trigger useEffect hook
    fetch("/character", {
      method: "DELETE",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ name: event.target.id }),
    }).then((character) => {
      updateDeletedCharacter(character);
      console.log(deletedCharacter);
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

  const handleGoldEarnerUpdate = (event) => {
    let [name, ilvl] = event.target.name.split(".");
    ilvl = Number(ilvl);
    let isGoldEarner = event.target.checked;
    /* If we already have six gold earners, can't add another one  */
    if (isGoldEarner && goldEarnerCount === 6) {
      event.target.checked = !event.target.checked;
      console.log("No more gold earners!");
      alert("Nice try - but you can only have up to six gold earners!");
      return;
    }

    fetch("/character", {
      method: "PATCH",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        name: name,
        ilvl: ilvl,
        isGoldEarner: isGoldEarner,
      }),
    }).then((character) => {
      updateCharacter(character);
      updateGoldEarners(goldEarnerCount + (isGoldEarner ? 1 : -1));
    });
  };
  // effect hook to get changes to character list. we will want to run this on page load, but also on submission of forms or  deletion of a character
  useEffect(() => {
    fetch("/characters")
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
    <div className={`MainContainer ${mainStyles.app}`}>
      <h1>
        <div className="underline uppercase text-center">
          Lost Ark Roster Production{" "}
        </div>
        <img className={mainStyles.mainLogo} src={logo} alt="Lost Ark Logo" />
      </h1>
      <TotalsDisplay roster={roster} />
      <CharacterInputDisplay
        characterInfo={characterInfo}
        handleChange={handleNewCharChange}
        handleSubmit={handleNewCharSubmit}
      />
      <Roster
        roster={roster}
        handleDelete={handleDelete}
        handleLevelUpdate={handleItemLevelUpdate}
        handleGoldUpdate={handleGoldEarnerUpdate}
      />
    </div>
  );
};

export default MainContainer;
