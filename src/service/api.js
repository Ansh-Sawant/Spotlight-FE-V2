import axios from "axios";
import { URL } from "../utils/constants";

const getAuthHeaders = () => ({
  Authorization: `Bearer ${localStorage.getItem("token")}`,
});

const getNews = async () => {
  try {
    const response = await axios.get(`${URL}/news`);
    return response.data;
  } catch (error) {
    console.error(`Error while calling getNews API`, error);
  }
};

const register = async (user) => {
  const { name, email, password, confirmPassword } = user;

  if (name && email && password && password === confirmPassword) {
    try {
      const response = await axios.post(`${URL}/register`, {
        name: user.name,
        email: user.email,
        password: password,
      });
      return { success: true, message: response.data };
    } catch (error) {
      console.error(`Error while calling Register API`, error);
      return {
        success: false,
        message: "Registration failed. Please try again.",
      };
    }
  }

  return {
    success: false,
    message: "Invalid Input. Make sure all fields are filled and passwords match.",
  };
};

const bookmarks = async (bookmark) => {
  try {
    const response = await axios.post(`${URL}/bookmarks`, bookmark, {
      headers: getAuthHeaders(),
    });
    return { success: true, message: response.data };
  } catch (error) {
    console.error(`Error while calling Bookmarks API`, error);
    return {
      success: false,
      message: "Failed to add bookmark. Please try again.",
    };
  }
};

const getBookmarks = async () => {
  try {
    const response = await axios.get(`${URL}/bookmarkedNews`, {
      headers: getAuthHeaders(),
    });
    return { success: true, message: response.data };
  } catch (error) {
    console.error(`Error while calling bookmarkedNews API`, error);
    if (error.status === 403) {
      return {
        success: false,
        message: `Error while getting your Bookmarks. Please Sign-in again`,
      };
    }
    return {
      success: false,
      message: `Error while getting your Bookmarks: ${error.message}`,
    };
  }
};

const deleteBookmarks = async (email, title, id) => {
  const deleteBook = { email, title, id };
  try {
    await axios.post(`${URL}/deleteBookmarks`, deleteBook, {
      headers: getAuthHeaders(),
    });
    return { success: true, message: "Bookmark Removed" };
  } catch (error) {
    console.error(`Error while calling DeleteBookmarks API`, error);
    return {
      success: false,
      message: "Failed to remove bookmarked news. Please try again.",
    };
  }
};

const askSpotlight = async (question, articleContent) => {
  try {
    const response = await axios.post(`${URL}/ai/ask`, {
      question,
      articleContent,
    }, {
      headers: getAuthHeaders(),
    });
    return { success: true, data: response.data };
  } catch (error) {
    console.error(`Error while calling Ask Spotlight API`, error);
    return {
      success: false,
      message: "Failed to get AI response. Please try again.",
    };
  }
};

export { getNews, register, bookmarks, getBookmarks, deleteBookmarks, askSpotlight };