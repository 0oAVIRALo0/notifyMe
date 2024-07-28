import React, { useEffect, useState } from "react";
import "./App.css";
import { requestForToken } from "../utils/firebase";

function App() {
  const [notification, setNotification] = useState({ title: "", body: "" });

  const handleClick = () => {
    setNotification(requestForToken());
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>React Firebase Push Notification</h1>
        <button onClick={handleClick}>Notification Access</button>
      </header>
    </div>
  );
}

export default App;
