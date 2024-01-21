// getContent.js
// retrieve pertinent/available content to character's item level
import { vercelPrefix } from "./vercel";
import axios from "axios";
const getContent = (ilvl, setContent) => {
  axios
    .get(`${vercelPrefix}/api/character/content/${ilvl}`)
    .then(({ data: content }) => setContent(content));
};
export default getContent;
