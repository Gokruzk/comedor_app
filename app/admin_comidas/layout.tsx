"use client";
import LinkButton from "@/components/LinkButton";
import useStore from "@/store/auth/authStore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { APP_NAME } from "@/constants";
import LogoutButton from "@/components/LogoutButton";
import userStore from "@/store/auth/userStore";
import { logout } from "@/api/userAPI";
import { getUserSession } from "@/utils";

const AdminFoodLayout = ({ children }: { children: React.ReactNode }) => {
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
        router.push("/admin_comidas");
      } else if (user && type === 0) {
        authUser(user);
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
        <p>Loading...</p>
      </main>
    );
  }

  return (
    <main>
      <header>
        <nav className="bg-white border-gray-200 dark:bg-gray-900 dark:border-gray-700">
          <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
            <a
              href="/"
              className="flex items-center space-x-3 rtl:space-x-reverse"
            >
              <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                {APP_NAME}
              </span>
            </a>
            <button
              onClick={toggleMenu} // Toggle menu visibility
              type="button"
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
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
              <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                <li>
                  <LinkButton
                    href="/"
                    style="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500 dark:bg-blue-600 md:dark:bg-transparent"
                    title="Inicio"
                  />
                </li>
                <li>
                  <LogoutButton
                    style="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500 dark:bg-blue-600 md:dark:bg-transparent"
                    title="Cerrar sesión"
                    onClick={handleLogout}
                  />
                </li>
                <li>
                  <LinkButton
                    href="/nosotros"
                    style="alingn-center block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                    title="Acerca de"
                  />
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>
      {children}
    </main>
  );
};

export default AdminFoodLayout;
