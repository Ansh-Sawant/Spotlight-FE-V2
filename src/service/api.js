import axios from "axios";
import bcrypt from "bcryptjs";
import { URL } from "../utils/constants";

const salt = bcrypt.genSaltSync(10);

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
  // const hashedPassword = bcrypt.hashSync(password, salt);
  if (name && email && password && password === confirmPassword) {
    try {
      const response = await axios.post(`${URL}/register`, { name: user.name, email: user.email, password: password });
      alert("User Regestered Succussfully");
    } catch (error) {
      console.error(`Error while calling Register API`, error);
      alert("Registration failed. Please try again.");
    }
  } else {
    alert("Invalid Input. Make sure all fields are filled and passwords match.");
  }
};

const bookmarks = async (bookmark) => {
  try {
    const response = await axios.post(`${URL}/bookmarks`, bookmark, {
      headers: getAuthHeaders(),
    });
    alert(response.data);
  } catch (error) {
    console.error(`Error while calling Bookmarks API`, error);
    alert("Failed to add bookmark. Please try again.");
  }
};

const getBookmarks = async () => {
  try {
    const response = await axios.get(`${URL}/bookmarkedNews`, {
      headers: getAuthHeaders(),
    });
    return response.data;
  } catch (error) {
    console.error(`Error while calling bookmarkedNews API`, error);
    alert("Failed to fetch bookmarks. Please try again later.");
  }
};

const deleteBookmarks = async (email, title, id) => {
  const deleteBook = { email, title, id };
  try {
    await axios.post(`${URL}/deleteBookmarks`, deleteBook, {
      headers: getAuthHeaders(),
    });
    alert("Bookmark Removed");
  } catch (error) {
    console.error(`Error while calling DeleteBookmarks API`, error);
    alert("Failed to remove bookmarked news. Please try again.");
  }
};

export { getNews, register, bookmarks, getBookmarks, deleteBookmarks };
