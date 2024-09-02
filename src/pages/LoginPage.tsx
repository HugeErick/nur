import * as React from "react";
import NurUserform from "@/components/NurUserform";
import { useNavigate } from "react-router-dom";
import { verifySession } from "@/lib/sessionVerify";

export default function LoginPage() {
  const navigate = useNavigate();

  React.useEffect(() => {
    verifySession(navigate);
  }, [navigate]);

  return (
    <>
      <NurUserform />
    </>
  );
}
