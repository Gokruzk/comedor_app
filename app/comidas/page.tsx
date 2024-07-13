"use client";
import { getUserMenus } from "@/api/foodAPI";
import Loading from "@/components/Loading";
import MenuCard from "@/components/MenuCard";
import NavBar from "@/components/NavBar";
import { MenuItem } from "@/types";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useCallback, useEffect, useState } from "react";

const queryClient = new QueryClient();

export default function FoodPage() {
  return (
    <QueryClientProvider client={queryClient}>
      <Comidas />
    </QueryClientProvider>
  );
}

function Comidas() {
  const [menus, setMenus] = useState<MenuItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);
  const [detail_, setDetail] = useState<string>("[]");
  const [status, setStatus] = useState(0);

  const fetchMenus = useCallback(async () => {
    try {
      const { status, data, error, detail } = await getUserMenus();

      if (status === 200) {
        setIsLoading(false);
        setMenus(data); // Actualiza el estado con los datos del menú
        setDetail("");
      } else if (status === 404) {
        setStatus(status);
        setIsLoading(false);
        setDetail(detail);
        setMenus([]);
      } else {
        setIsLoading(false);
        setIsError(true);
        setError(error);
      }
    } catch (error) {
      setIsLoading(false);
      setIsError(true);
      setError(error);
    }
  }, [setIsLoading, setMenus, setDetail, setIsError, setError]);

  useEffect(() => {
    fetchMenus();
  }, [fetchMenus]);

  const availables_menus: MenuItem[] = [];

  const linkbuttons = [
    { href: "/mis_compras", title: "Mis compras" },
    // { href: "/otro_menu", title: "Otro menú" },
    // Agrega más botones según sea necesario
  ];

  console.log(status);

  if (detail_ === "[]") {
    return (
      <main className="bg-gray-50 dark:bg-white flex min-h-screen">
        <NavBar
          title="<- Volver"
          href="/perfil"
          nbuttons={2}
          // linkbuttons={linkbuttons}
        />
        <div className="flex-grow flex items-center justify-center">
          <div className="text-center text-gray-600">No hay menús</div>
        </div>
      </main>
    );
  } else {
    menus.map((menu: MenuItem) => {
      if (menu.menu.status === true) {
        availables_menus.push(menu);
      }
    });
  }

  if (isLoading) {
    return (
      <main>
        <Loading />
      </main>
    );
  } else if (isError) {
    return (
      <main className="bg-white dark:bg-white flex min-h-screen">
        <NavBar
          title="<- Volver"
          href="/perfil"
          nbuttons={2}
          linkbuttons={linkbuttons}
        />
        <div className="flex-grow flex items-center justify-center">
          <div className="text-center">Error {error.message}</div>
        </div>
      </main>
    );
  }
  return (
    <main className="bg-white dark:bg-white flex min-h-screen">
      <NavBar title="<- Volver" href="/perfil" nbuttons={2} />
      <div className="flex-grow flex-col items-center justify-center px-6 py-8 mx-auto lg:p-10">
        <div className="w-full max-w-6xl mx-20">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-600 mb-4">
              Menús disponibles
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {availables_menus.map((menu: MenuItem) => (
                <MenuCard key={menu.menu.id_menu} menu={menu} />
              ))}
            </div>
          </div>
          <div></div>
        </div>
      </div>
    </main>
  );
}
