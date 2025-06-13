import axios from "axios";

export async function submitAuthForm(
  endpoint,
  form,
  setError,
  setShowError,
  onSuccess
) {
  setError(null);
  try {
    await axios.post(endpoint, form);
    if (onSuccess) onSuccess();
  } catch (err) {
    if (err.response && err.response.data) {
      setError(err.response.data.error);
    } else {
      setError("An unknown error occurred.");
    }
    setShowError(true);
  }
}
