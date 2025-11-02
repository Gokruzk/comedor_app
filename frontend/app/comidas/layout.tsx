"use client";
import LinkButton from "@/components/LinkButton";
import useStore from "@/store/auth/authStore";
import Loading from "@/components/Loading";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { APP_NAME } from "@/constants";
import LogoutButton from "@/components/LogoutButton";
import userStore from "@/store/auth/userStore";
import { logout } from "@/api/userAPI";
import { getUserSession } from "@/utils";

const FoodLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const authUser = useStore((state) => state.authUser);
  const { removeSession } = userStore();
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [menuOpen, setMenuOpen] = useState(false); // State to manage menu open/close

  useEffect(() => {
    (async () => {
      const { user, error, type } = await getUserSession();
      if (error) {
        router.push("/login");
      } else if (user && type !== 0) {
        authUser(user);
      } else if (user && type === 0) {
        router.push("/admin_comidas");
      }
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

  return (
    <main>
      <header>
        <nav className="bg-white  my-4">
          <div className="max-w-screen-xl mx-auto">
            <div className="max-w-6xl w-full mx-auto bg-red-600 rounded-2xl p-4">
              <div className="flex flex-wrap items-center justify-between">
                <LinkButton
                  href="/admin_perfil"
                  style=" flex items-center space-x-3 rtl:space-x-reverse self-center text-3xl font-bold whitespace-nowrap text-white"
                  title={APP_NAME}
                />
                {/*script para el boton en pantallas pequenias*/}
                <button
                  onClick={toggleMenu} // Toggle menu visibility
                  type="button"
                  className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-white rounded-lg md:hidden hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-white"
                  aria-controls="navbar-dropdown"
                  aria-expanded={menuOpen ? "true" : "false"} // Toggle aria-expanded attribute
                >
                  <span className="sr-only">Open main menu</span>
                  <svg
                    className="w-5 h-5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 17 14"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M1 1h15M1 7h15M1 13h15"
                    />
                  </svg>
                </button>
                <div
                  className={`md:flex ${
                    menuOpen ? "block" : "hidden"
                  } w-full md:w-auto`}
                  id="navbar-dropdown"
                >
                  <ul className="flex flex-col font-medium p-4 px-4 md:p-0 mt-4 rounded-lg bg-red-600 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-red-600  md:dark:bg-red-600 dark:border-red-700">
                    <li>
                      <LinkButton
                        href="/nosotros2"
                        style="w-40 align-center bg-red-900 block py-2 text-white rounded-xl bg-red-600 hover:bg-red-700 md:border-0 dark:text-white md:bg-red-600"
                        title="Acerca de"
                      />
                    </li>

                    <li>
                      <LogoutButton
                        style="w-40 align-center bg-red-900 block py-2 text-white rounded-xl bg-red-600 hover:bg-red-700 md:border-0 dark:text-white md:bg-red-600"
                        title="Cerrar sesión"
                        onClick={handleLogout}
                      />
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>
      {children}
    </main>
  );
};

export default FoodLayout;
