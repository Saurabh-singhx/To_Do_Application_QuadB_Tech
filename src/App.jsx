import React, { useState } from "react";
import "./App.css";
import { useRoutes } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Home from "./Components/Home";
import AllToDoList from "./Components/AllToDoList";
import ViewToDo from "./Components/ViewToDo";
import Login from "./Components/Login";

const App = () => {
  const [user, setUser] = useState(false);

  const handleLogin = (email, password) => {
    if (email === "admin@mail.com" && password === "123") {
      setUser(true);
    }
  };

  const routes = useRoutes([
    {
      path: "/",
      element: (
        <div>
          <Navbar />
          <Home />
          <AllToDoList />
        </div>
      ),
    },
    {
      path: "/Notes",
      element: (
        <div>
          <Navbar /> <AllToDoList />
        </div>
      ),
    },
    {
      path: "/Notes/:id",
      element: (
        <div>
          <Navbar /> <ViewToDo />
        </div>
      ),
    },
  ]);

  return <>{!user ? <Login handlelogin={handleLogin} /> : routes}</>;
};

export default App;
