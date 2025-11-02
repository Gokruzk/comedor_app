"use client";

import useStore from "@/store/auth/authStore";
import Loading from "@/components/Loading";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getUserSession } from "@/utils";
import { logout } from "@/api/userAPI";
import userStore from "@/store/auth/userStore";

const AdminAgLayout = ({ children }: { children: React.ReactNode }) => {
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const authUser = useStore((state) => state.authUser);
  const [menuOpen, setMenuOpen] = useState(false);
  const { removeSession } = userStore();
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const { user, error, type } = await getUserSession();
      if (error) {
        router.push("/login");
      } else if (user && type === 0) {
        authUser(user);
      } else {
        router.push("/comidas");
      }
      //If the user is logged
      setIsSuccess(true);
    })();
  }, [router, authUser]);

  const handleLogout = async () => {
    const result = await logout();
    if (result.status === 200) {
      router.push("/login");
      removeSession();
    } else {
      console.error(result.error);
    }
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  if (!isSuccess) {
    return (
      <main>
        <Loading />
      </main>
    );
  }
  return children;
};

export default AdminAgLayout;
