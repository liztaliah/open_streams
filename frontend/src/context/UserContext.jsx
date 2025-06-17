// Set up a context to access usernames from anywhere in the app
import { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

export function UserProvider({ children }) {
  // Initilaze username from localStorage
  const [username, setUsername] = useState(() =>
    localStorage.getItem("username")
  );

  // Sync local storage with state
  useEffect(() => {
    if (username) {
      localStorage.setItem("username", username);
    } else {
      localStorage.removeItem("username");
    }
  }, [username]);

  return (
    <UserContext.Provider value={{ username, setUsername }}>
      {children}
    </UserContext.Provider>
  );
}
