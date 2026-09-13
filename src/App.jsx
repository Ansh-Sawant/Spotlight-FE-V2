import { BrowserRouter as Router } from "react-router-dom";
import { useState } from "react";

import Header from "./component/Header";
import AppRouter from "./app/Router";
import "./App.css";

function App() {
  const [loginUser, setLoginUser] = useState(() => {
    const storedUser = localStorage.getItem("loginUser");
    return storedUser ? JSON.parse(storedUser) : {};
  });

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("loginUser");
    setLoginUser({});
  };

  return (
    <Router>
      <div className="App">
        <Header loginUser={loginUser} handleLogout={handleLogout} />
        <div style={{ margin: "10px" }}>&nbsp;</div>
        <AppRouter loginUser={loginUser} setLoginUser={setLoginUser} />
      </div>
    </Router>
  );
}

export default App;
