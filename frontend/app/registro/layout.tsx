"use client";
import Loading from "@/components/Loading";
import useStore from "@/store/auth/authStore";
import { getUserSession } from "@/utils";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const RegisterLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const authUser = useStore((state) => state.authUser);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      const { user, error } = await getUserSession();
      if (error) {
        router.push("/registro");
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
        <Loading />
      </main>
    );
  }
  return children;
};

export default RegisterLayout;
