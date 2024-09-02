import axios from "axios";
import { NavigateFunction } from "react-router-dom";

export async function checkUserSession(navigate: NavigateFunction) {
  try {
    const response = await axios.get("http://localhost:4000/api/obtainrole", {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.log("Something went wrong");
    navigate("/login");
    return null;
  }
}
