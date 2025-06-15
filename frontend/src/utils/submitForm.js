import axios from "axios";

export async function submitForm(
  endpoint,
  form,
  setError,
  setShowError,
  onSuccess,
  options = {}
) {
  setError(null);
  try {
    const response = await axios.post(endpoint, form, options);
    if (onSuccess) onSuccess(response);
  } catch (err) {
    if (err.response && err.response.data) {
      setError(err.response.data.error);
    } else {
      setError("An unknown error occurred.");
    }
    setShowError(true);
  }
}
