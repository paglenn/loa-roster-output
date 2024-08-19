import React from "react";
import {
  selectGoldEarners,
  setGoldEarners,
} from "../../../state/goldEarnerSlice";
import { update_roster } from "../../../state/rosterSlice";
import { getRoster } from "../../../utils/api";
import { selectUser } from "../../../state/userSlice";
import updateGoldEarner from "../events/updateGoldEarner";
import { useDispatch, useSelector } from "react-redux";
const GoldStatusBox = ({ isGoldEarner, character }) => {
  const dispatch = useDispatch();
  const goldEarners = useSelector(selectGoldEarners);
  const user = useSelector(selectUser);
  const updateGoldEarners = (earnerCount) =>
    dispatch(setGoldEarners(earnerCount));
  const updateRoster = (characters) => dispatch(update_roster(characters));
  const handleClick = (e) => {
    // call updateGoldEarner
    updateGoldEarner(e, character, goldEarners, updateGoldEarners)
      .then(() => getRoster(user))
      .then((roster) => updateRoster(roster));
  };
  return (
    <div className="flex flex-col">
      <span className="text-sm"> Gold? </span>
      <input type="checkbox" checked={isGoldEarner} onChange={handleClick} />
    </div>
  );
};

export default GoldStatusBox;
