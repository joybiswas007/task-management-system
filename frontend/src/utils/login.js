import axios from "axios";

const login = async (
  email,
  password,
  setUserData,
  setToken,
  setError,
  setErrorMessage
) => {
  try {
    const response = await axios.post(
      "http://localhost:15000/auth/v1/login",
      { email, password },
      { headers: { "Content-Type": "application/json" } }
    );
    if (response.data.statusCode === 200) {
      setUserData(response.data.user);
      setToken(response.data.token);
    }
  } catch (error) {
    if (
      error.response &&
      (error.response.status === 401 || error.response.status === 404)
    ) {
      setError(true);
      setErrorMessage("Invalid email or password");
    } else {
      setError(true);
      setErrorMessage("An error occurred. Please try again later.");
    }
  }
};

export default login;
