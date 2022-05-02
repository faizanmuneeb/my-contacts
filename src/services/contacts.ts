import axios from "axios";
import { Contact } from "../models/contact.model";
import { Tag } from "../models/tag.model";

const API_ENDPOINT = "https://api-im.chatdaddy.tech";
const TEAM_ENDPOINT = "https://api-teams.chatdaddy.tech";
const REFRESH_TOKEN = "059c420e-7424-431f-b23b-af0ecabfe7b8";
const TEAM_ID = "a001994b-918b-4939-8518-3377732e4e88";

export const getContacts = async (): Promise<Contact[]> => {
  try {
    const configs = await getAuthConfigs();
    const response = await axios.get(`${API_ENDPOINT}/contacts`, configs);
    return response.data.contacts.splice(0, 5);
  } catch (error) {
    throw new Error("fetching contacts failed");
  }
};

export const getTags = async (): Promise<Tag[]> => {
  try {
    const configs = await getAuthConfigs();
    const response = await axios.get(`${API_ENDPOINT}/tags`, configs);
    return response.data.tags;
  } catch (error) {
    throw new Error("fetching tags failed");
  }
};

export const getAuthConfigs = async () => {
  try {
    const response = await axios.post(`${TEAM_ENDPOINT}/token`, {
      refreshToken: REFRESH_TOKEN,
      teamId: TEAM_ID,
    });
    const token = response.data.access_token;
    return {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };
  } catch (error) {
    throw new Error("fetching token failed");
  }
};
