import { submitRequest } from "../../utils/submitRequest";
import { useState } from "react";

export default function RoomIndex() {
  const [error, setError] = useState(null);
  const [showError, setShowError] = useState(false);

  submitRequest("get", "/api/rooms", null, setError, setShowError);
}
