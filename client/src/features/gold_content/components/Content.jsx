import React from "react";
import { update_roster } from "../../../state/rosterSlice";
import { getRoster } from "../../../utils/api";
import { useDispatch, useSelector } from "react-redux";
import handleContentChange from "../handlers/changeGoldContent";
import handleChestChange from "../handlers/handleChestChange";
import { selectUser } from "../../../state/userSlice";

export default ({ content, checked, character, isBuyingChest }) => {
  const dispatch = useDispatch();

  const user = useSelector(selectUser);

  const updateState = async () => {
    getRoster(user).then((characters) => dispatch(update_roster(characters)));
  };

  return (
    <li role="content" className="text-sm py-2">
      <ul className="flex flex-row list-none justify-around">
        <li className="capitalize basis-1/4 grow">
          {content.display_name ?? `${content.name} ${content.level ?? ""}`}
        </li>

        <li className="basis-1/4 grow"> {content.gold.toLocaleString()} </li>
        {/* Doing Content */}
        <li className="basis-1/4">
          <input
            type="checkbox"
            checked={checked}
            onChange={(e) =>
              handleContentChange(e, content, character, updateState)
            }
          />
        </li>
        {/* Taking Chest ?  */}
        <li className="basis-1/4">
          <input
            type="checkbox"
            checked={isBuyingChest}
            onChange={(e) =>
              handleChestChange(e, content, character, updateState)
            }
          />
        </li>
      </ul>
    </li>
  );
};
