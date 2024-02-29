import axios from "axios";

const register = async (
  username,
  email,
  password,
  confirmPassword,
  redirect,
  setError,
  setErrorMessage
) => {
  try {
    const response = await axios.post(
      "http://localhost:15000/auth/v1/register",
      { username, email, password, password2: confirmPassword },
      { headers: { "Content-Type": "application/json" } }
    );
    if (response.data.statusCode === 201) {
      redirect("/login");
    }
  } catch (error) {
    if (
      error.response &&
      (error.response.status === 400 || error.response.status === 500)
    ) {
      setError(true);
      setErrorMessage(error.response.data.message);
    }
  }
};

export default register;
