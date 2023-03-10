import React, { useEffect, useState } from "react";
import AppRouter from "./Router";
import { authService } from "../fbase"

function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userObj, setUserObj] = useState(null);
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true);
        setUserObj(user);
      } else {
        setUserObj(null);
      }
      setInit(true)
    })
  }, [])
  return (
    <>{init ? <AppRouter isLoggedIn={Boolean(userObj)} userObj={userObj} /> : "로딩중.."}
      <footer className="footer" >&copy; {new Date().getFullYear()}Nwitter</footer>
    </>);
}

export default App;
