import axios from "axios";

const logout = async (token) => {
  try {
    const response = await axios.post(
      "http://localhost:15000/auth/v1/logout",
      "",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.data.statusCode === 200) {
      return true;
    }
    return false;
  } catch (error) {
    return false;
  }
};

export default logout;
