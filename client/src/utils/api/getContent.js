// getContent.js
// retrieve pertinent/available content to character's item level
import { vercelPrefix } from "./vercel";
import axios from "axios";
const getContent = async (ilvl) => {
  const { data: content } = await axios
    .get(`${vercelPrefix}/api/character/content/${ilvl}`);
  return content;
};
export default getContent;
