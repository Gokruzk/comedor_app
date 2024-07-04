"use client";
import useStore from "@/store/auth/authStore";
import { getUserSession } from "@/utils";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const ProfileLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const authUser = useStore((state) => state.authUser);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      const { user, error, type } = await getUserSession();
      if (error) {
      } else if (user) {
        authUser(user);
        router.push("/perfil");
      }
      //If the user is logged
      setIsSuccess(true);
    })();
  }, [router, authUser]);

  if (!isSuccess) {
    return (
      <main>
        <p>Loading...</p>
      </main>
    );
  }
  return (
    <main>
      {children}
    </main>
  );
};

export default ProfileLayout;
