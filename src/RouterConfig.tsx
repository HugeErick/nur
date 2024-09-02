// RouterConfig.tsx
import {
  Navigate,
  Outlet,
  useNavigate,
  useOutletContext,
} from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";
import { createBrowserRouter } from "react-router-dom";
import React, { useEffect, useState } from "react";
import LoginPage from "./pages/LoginPage";
import AdminPage from "./pages/AdminPage";
import HomePage from "./pages/HomePage";
import NurNavbar from "./components/NurNavbar";
import Signup from "./pages/Signup";
import { verifySession } from "./lib/sessionVerify";

export const MainLayout = () => {
  const [userRole, setUserRole] = useState<string | null>(null);
  const [, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    verifySession(navigate, setUserRole, setLoading);
  }, [navigate]);

  return (
    <>
      <NurNavbar />
      <Outlet context={{ userRole }} />
    </>
  );
};

const ProtectedRoute = ({
  role,
  children,
}: {
  role: string;
  children: React.ReactNode;
}) => {
  const { userRole } = useOutletContext<{ userRole: string | null }>();

  if (userRole == null) {
    return <Navigate to="/login" />;
  }

  if (!userRole) {
    <div className="flex flex-col space-y-3">
      <Skeleton className="h-[125px] w-[250px] rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>;
  }

  if (userRole !== role) {
    return <Navigate to="/home" />;
  }

  return <>{children}</>;
};

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "home",
        element: <HomePage />,
      },
      {
        path: "admin",
        element: (
          <ProtectedRoute role="admin">
            <AdminPage />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);
