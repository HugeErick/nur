import axios from "axios";

export async function renewSession() {
  try {
    const response = await axios.get("http://localhost:4000/api/renewsession", {
      withCredentials: true,
    });
    console.log("session renewed successfully");
    return response.data;
  } catch (err) {
    console.log("Something went wrong");
    return null;
  }
}
