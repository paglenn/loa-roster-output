//useCharacters is meant to be an effect hook callback that
import React, { useState } from "react";
export const useCharacter = (user) => {
  const characterTemplate = {
    name: "",
    ilvl: "",
    _class: "",
    isGoldEarner: false,
    restedOnly: false,
    user: user,
  };
  const [character, updateCharacter] = useState({ ...characterTemplate });
  // customizing the setter method to reset to default in the event of no arguments provided.
  const updateNewCharacter = (inputChar) => {
    if (inputChar === undefined) {
      updateCharacter(characterTemplate);
    } else {
      updateCharacter(inputChar);
    }
  };
  return [character, updateNewCharacter];
};
