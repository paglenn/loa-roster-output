import React from "react";
import { charPropLabels, classes } from "../utils/reference";
const CharacterInputDisplay = ({
  handleSubmit,
  character,
  handleChange: handleChange,
}) => {
  const charProps = Object.keys(character)
    .filter((prop) => prop !== "user")
    .map((prop) => {
      return (
        <InputLabel
          key={prop}
          charPropName={prop}
          charPropVal={character[prop]}
          character={character}
          handleChange={handleChange}
        />
      );
    });

  return (
    <div className="text-xl bg-slate-300 p-5">
      <h2 className="text-center text-2xl underline pb-2">
        {" "}
        Add New Character{" "}
      </h2>
      <form
        onSubmit={(e) => handleSubmit(e, character)}
        className="flex justify-around"
      >
        {charProps}

        <input
          className="border-black border-2 rounded-sm bg-green-400 p-1"
          type="submit"
          value="Submit"
        />
      </form>
    </div>
  );
};

const InputLabel = ({ charPropVal, charPropName, character, handleChange }) => {
  const nameComponentMap = {
    checkbox: CheckboxInput,
    text: TextInput,
    select: SelectInput,
  };
  const Component = nameComponentMap[charPropLabels[charPropName].type];
  return (
    <Component
      charPropVal={charPropVal}
      charPropName={charPropName}
      character={character}
      handleChange={handleChange}
    />
  );
};

const TextInput = ({ charPropVal, charPropName, handleChange }) => {
  return (
    <label className="inline-flex flex-col align-middle">
      <span className="text-xl"> {charPropLabels[charPropName].label}: </span>
      <input
        value={charPropVal}
        type="text"
        name={charPropName}
        className="rounded-md"
        onChange={(e) => {
          handleChange(e, charPropName, e.target.value);
        }}
      />
    </label>
  );
};

const CheckboxInput = ({ charPropVal, charPropName, handleChange }) => {
  return (
    <label className="inline-flex flex-col items-center">
      <span className="text-xl"> {charPropLabels[charPropName].label}? </span>
      <input
        type="checkbox"
        className="w-4 h-4"
        checked={charPropVal}
        name={charPropName}
        onChange={(e) => {
          handleChange(e, charPropName, e.target.checked);
        }}
      />
    </label>
  );
};

const ClassOption = ({ className }) => {
  return <option value={className}> {className} </option>;
};

const SelectInput = ({ charPropVal, charPropName, handleChange }) => {
  const classOptions = classes.map((className) => (
    <ClassOption className={className} />
  ));
  return (
    <label className="inline-flex flex-col">
      <span>{charPropLabels[charPropName].label}:</span>
      <select
        name={charPropName}
        onChange={(e) => handleChange(e, charPropName, e.target.value)}
      >
        {classOptions}
      </select>
    </label>
  );
};
export default CharacterInputDisplay;
