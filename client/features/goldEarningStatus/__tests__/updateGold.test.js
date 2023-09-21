import axios from "axios";
import { describe, expect, test, jest, it } from "@jest/globals";
// to avoid actually making the fetch call we will mock axios
jest.mock("axios");
import updateGold from "../utils/updateGold";
