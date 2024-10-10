"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getUser } from "@/firebase/functions";
import Loader from "../Loader";
import Image from "next/image";
import useUserStore from "@/stores/userStore";

interface AuthRouterComponentProps {
  children: React.ReactNode;
  role?: string;
}

export default function AuthRouterComponent({
  children,
  role,
}: AuthRouterComponentProps) {
  const [userRole, setUserRole] = useState<string | null>(null);
  const { setUser } = useUserStore();
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const handleAuth = async () => {
      try {
        const storedUser = localStorage.getItem("user");
        if (!storedUser) {
          router.push("/auth/login");
          return;
        }

        const user = JSON.parse(storedUser);
        const roleFromDB: any = await getUser(user.uid);
        setUser(roleFromDB);

        if (roleFromDB) {
          setUserRole(roleFromDB.roles);
        } else {
          setUserRole("user");
        }
      } catch (error: any) {
        console.log(error.message);
        router.push("/auth/login");
      } finally {
        setLoading(false);
      }
    };

    handleAuth();
  }, [router, setUser]);

  if (loading) {
    return (
      <>
        <div className="w-full min-h-screen flex justify-center items-center">
          <Loader className="animate-spin -ml-1 mr-3 h-8 w-8 text-primary" />
        </div>
      </>
    );
  }

  const isAuthorized = () => {
    if (!role || !userRole) return false;
    const allowedRoles = role.split(",");
    const allUserRoles = userRole.split(",");

    return allowedRoles.some((allowedRole) =>
      allUserRoles.includes(allowedRole)
    );
  };

  return (
    <div>
      {isAuthorized() ? (
        React.cloneElement(children as React.ReactElement, { role: userRole })
      ) : (
        <div className="w-full min-h-screen space-y-3 flex flex-col justify-center items-center">
          <Image
            src="/img/icon.png"
            alt="Evolix Logo"
            className="w-28 h-28 border-4 border-primary rounded-2xl"
            width={200}
            height={200}
          />
        </div>
      )}
    </div>
  );
}
