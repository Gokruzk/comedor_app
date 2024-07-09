"use client";
import LogoutButton from "@/components/LogoutButton";
import LinkButton from "@/components/LinkButton";
import Loading from "@/components/Loading";
import useStore from "@/store/auth/authStore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { APP_NAME } from "@/constants";
import userStore from "@/store/auth/userStore";
import { logout } from "@/api/userAPI";
import { getUserSession } from "@/utils";

const ProfileLayout = ({ children }: { children: React.ReactNode }) => {
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
      } else if (user && type === 0) {
        router.push("/admin_perfil");
        authUser(user);
      } else if (user) {
        authUser(user);
        router.push("/perfil");
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
        <Loading/>
      </main>
    );
  }

  return (
    <main>
      <header>
        <nav className="bg-white border-gray-200 dark:bg-gray-500 dark:border-gray-700">
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
                    style="alingn-center block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                    title="Inicio"
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


      {/*===============================================================================================================================================================*/}
      {/*=========================================================codigo para la barra de navegacion====================================================================*/}
      {/*===============================================================================================================================================================*/}
          <nav className="bg-white border-gray-200 dark:bg-white dark:border-white my-4">
            <div className="max-w-screen-xl mx-auto">
              <div className="max-w-6xl w-full mx-auto bg-red-600 rounded-2xl p-4">
                <div className="flex flex-wrap items-center justify-between">
                  <a href="#" className="flex items-center space-x-3 rtl:space-x-reverse">
                      <LinkButton href="/perfil" style="self-center text-3xl font-bold whitespace-nowrap dark:text-white" title="Comedor Politécnico"/>
                  </a>


                  {/*script para el boton en pantallas pequenias*/}
                  <button
                      onClick={toggleMenu} // Toggle menu visibility
                      type="button"
                      className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-white rounded-lg md:hidden hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-700 dark:text-white dark:hover:bg-red-700 dark:focus:ring-red-600"
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


                  <div className="hidden w-full md:block md:w-auto" id="navbar-dropdown">
                    <ul className="flex flex-col font-medium py-0 px-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-red-600 md:dark:bg-red-600 dark:border-red-700">

                      <li>
                          <button id="dropdownNavbarLink" data-dropdown-toggle="dropdownNavbar" className="flex items-center justify-between w-full py-2 px-4 text-gray-900 rounded hover:bg-red-700 md:hover:bg-red-700 md:border-0  md:w-auto dark:text-white  dark:focus:text-white dark:border-gray-700 dark:hover:bg-gray-700 md:dark:hover:bg-red-700">Menú</button>

                          {/*dropdown*/}
                          <div id="dropdownNavbar" className="z-10 hidden font-normal bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-red-700 dark:divide-gray-600">
                              <ul className="py-2 text-sm text-gray-700 dark:text-gray-400" aria-labelledby="dropdownLargeButton">
                                <li>
                                  <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Dashboard</a>
                                </li>
                                <li>
                                  <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Settings</a>
                                </li>
                                <li>
                                  <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Earnings</a>
                                </li>
                              </ul>
                              <div className="py-1">
                                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Sign out</a>
                              </div>
                          </div>
                      </li>

                      <li>
                        <a href="#" className="align-center block py-2 px-4 text-white rounded bg-red-600 hover:bg-red-700 md:border-0 dark:text-white">Acerca de</a>
                      </li>

                      <li>
                        <LogoutButton
                          style="align-center block py-2 px-4 text-white rounded bg-red-600 hover:bg-red-700 md:border-0 dark:text-white"
                          title="Mi cuenta"
                          onClick={handleLogout}
                        />
                      </li>

                      <li>
                        <LogoutButton
                          style="align-center block py-2 px-4 text-white rounded bg-red-600 hover:bg-red-700 md:border-0 dark:text-white"
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




      {children}
    </main>
  );
};

export default ProfileLayout;
