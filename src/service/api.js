import axios from "axios";
import bcrypt from "bcryptjs";
import { URL } from "../utils/constants";

const salt = bcrypt.genSaltSync(10);

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

// const login = async (user, setLoginUser) => {
//   try {
//     const response = await axios.post(`${URL}/login`, user);
//     alert(response.data.message);
//     if (response.data.user) {
//       setLoginUser(response.data.user);
//       window.history.pushState("pg", "title", "/");
//     }
//   } catch (error) {
//     console.error(`Error while calling Login API`, error);
//     alert("Login failed. Please try again.");
//   }
// };

const bookmarks = async (bookmark) => {
  try {
    const response = await axios.post(`${URL}/bookmarks`, bookmark);
    alert(response.data);
  } catch (error) {
    console.error(`Error while calling Bookmarks API`, error);
    alert("Failed to add bookmark. Please try again.");
  }
};

const getBookmarks = async () => {
  try {
    const response = await axios.get(`${URL}/bookmarkedNews`);
    return response.data;
  } catch (error) {
    console.error(`Error while calling bookmarkedNews API`, error);
    alert("Failed to fetch bookmarks. Please try again later.");
  }
};

const deleteBookmarks = async (email, title) => {
  const deleteBook = { email, title };
  try {
    const response = await axios.post(`${URL}/deleteBookmarks`, deleteBook);
    alert("Bookmark Removed");
  } catch (error) {
    console.error(`Error while calling DeleteBookmarks API`, error);
    alert("Failed to remove bookmark. Please try again.");
  }
};

export { getNews, register, bookmarks, getBookmarks, deleteBookmarks };
