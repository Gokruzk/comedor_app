"use client";
import Loading from "@/components/Loading";
import useStore from "@/store/auth/authStore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getUserSession } from "@/utils";

const ProfileLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const authUser = useStore((state) => state.authUser);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      const { user, error, type } = await getUserSession();
      if (error) {
        router.push("/login");
      } else if (user) {
        authUser(user);
      }
      setIsSuccess(true);
    })();
  }, [router, authUser]);

  if (!isSuccess) {
    return (
      <main>
        <Loading />
      </main>
    );
  }

  return children;
};

export default ProfileLayout;
