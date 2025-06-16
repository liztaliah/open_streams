import axios from "axios";

export async function submitRequest(
  method,
  endpoint,
  data,
  setError,
  setShowError,
  onSuccess,
  options = {}
) {
  setError(null);
  try {
    const response = await axios({
      method,
      url: endpoint,
      data,
      ...options,
    });
    if (onSuccess) onSuccess(response);
  } catch (err) {
    setError(err.response?.data?.error || "An unknown error occurred.");
    setShowError(true);
  }
}
