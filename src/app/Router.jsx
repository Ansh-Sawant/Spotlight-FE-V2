import { Routes, Route } from "react-router-dom";

import Articles from "../component/Articles";
import Login from "../component/Login";
import Bookmarks from "../component/Bookmarks";
import Signup from "../component/Signup";

const AppRouter = ({ loginUser, setLoginUser }) => {
  return (
    <Routes>
      <Route path="/login" element={<Login setLoginUser={setLoginUser} />} />

      <Route path="/bookmarks" element={<Bookmarks loginUser={loginUser} />} />

      <Route path="/signup" element={<Signup />} />

      <Route path="/" element={<Articles loginUser={loginUser} />} />
    </Routes>
  );
};

export default AppRouter;
