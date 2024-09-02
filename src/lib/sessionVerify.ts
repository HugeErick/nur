import { checkUserSession } from "./sessionUtils";
import { renewSession } from "./renewSession";
import { NavigateFunction } from "react-router-dom";

export async function verifySession(
  navigate: NavigateFunction,
  setUserRole?: React.Dispatch<React.SetStateAction<string | null>>,
  setLoading?: React.Dispatch<React.SetStateAction<boolean>>
) {
  const sessionData = await checkUserSession(navigate);
  if (sessionData) {
    if (setUserRole) {
      setUserRole(sessionData.role);
    }
    if (sessionData.role === "admin") {
      navigate("/admin");
      renewSession();
    } else {
      navigate("/home");
      renewSession();
    }
  } else {
    if (setLoading) {
      setLoading(false);
    }
  }
}
