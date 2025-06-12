import React, { useEffect, useState } from "react";

function UserList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("/api/users")
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => console.error("Could not fetch users:", err));
  }, []);

  return (
    <div>
      <h2>
        <ul>
          {users.map((user, idx) => (
            <li>
              <strong>{user.username}</strong> - Created at:{" "}
              {new Date(user.creation_time).toLocaleString()}
            </li>
          ))}
        </ul>
      </h2>
    </div>
  );
}

export default UserList;
